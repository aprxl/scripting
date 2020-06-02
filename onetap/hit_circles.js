/*
 *
 * Title: Hit circles
 * Author: april#0001
 * Description: Draws a circle indicator on top of the hitbox of a recently shot player.
 *
 */

//region dependencies
function safe_concat(a, b)
{
  var arr = [];

  for (var k in a)
      arr.push(a[k]);

  if (b instanceof Array)
  {
      for (var k in b)
          arr.push(b[k]);

      return arr;
  }

  arr.push(b);
  return arr;
}

function call(func, name, props)
{
  func.apply(null, safe_concat([name], props));
  return name;
}

function get(path, is_color)
{
  is_color = is_color || false;
  const func = is_color ? UI.GetColor : UI.GetValue;

  if (path instanceof Array)
      return func.apply(null, path);

  return func.apply(null, ["Script items", path]);
}

function set(path, value)
{
  const func = (value instanceof Array) ? UI.SetColor : UI.SetValue;

  if (path instanceof Array)
     return func.apply(null, safe_concat(path, value));

 func.apply(null, safe_concat(path, value));
}

function visible(path, value)
{
  if (path instanceof Array)
     return UI.SetEnabled.apply(null, safe_concat(path, value));

 UI.SetEnabled.apply(null, safe_concat(["Script items", path], value));
}
//endregion

//region api
// Localize the functions I'm using throughout the script.
const callback = Cheat.RegisterCallback;
const get_int = Event.GetInt, get_float = Event.GetFloat;
const entity_from_userid = Entity.GetEntityFromUserID, local_player = Entity.GetLocalPlayer, hitbox_position = Entity.GetHitboxPosition, alive = Entity.IsAlive;
const render_circle = Render.FilledCircle, to_screen = Render.WorldToScreen;
const frametime = Globals.Frametime, tickcount = Globals.Tickcount;
const max = Math.max, sqrt = Math.sqrt;
//endregion

//region menu
// Create my menu elements
const enable = call(UI.AddCheckbox, "| Hit circles", []);
const color = call(UI.AddColorPicker, "| Hit circle color", []);
//endregion

//region locals
// Map for converting hitgroups to hitboxes.
const hitgroup_to_hitbox = {
    1: [0, 1],
    2: [4, 5, 6],
    3: [2, 3],
    4: [13, 15, 16],
    5: [14, 17, 18],
    6: [7, 9, 11],
    7: [8, 10, 12]
}

// Localize our data array where our bullet impacts will be stored.
var data = {};
//endregion

//region functions
function render_faded_circle(x, y, radius, color) {
    // Calculate how much should be decremented from our alpha on each radius.
    // This is responsible for the fade effect.
    const step = color[3] / radius;

    // Renders multiple circles, each one with a lower alpha.
    for (var i = 0; i <= radius; i++) {
        render_circle(x, y, i, [color[0], color[1], color[2], color[3] - step * i]);
    }
}

function on_bullet_impact() {
    // If the script isn't enabled, return.
    if (!get(enable))
        return;

    // Get our entities
    const userid = entity_from_userid(get_int("userid"));
    const me = local_player();

    // Check if we're the one who fired a bullet
    if (userid === me) {
        // Get more event stuff.
        const pos = [get_float("x"), get_float("y"), get_float("z")];
        const tick = tickcount();

        // Insert our bullet impact data into the data array.
        data[tick] = {
            pos: pos,
            alpha: get(color, true)[3],
            hit: false
        };
    }
}

function on_player_hurt() {
    // If the script isn't enabled, return.
    if (!get(enable))
        return;

    // Get our entities.
    const userid = entity_from_userid(get_int("userid")), attacker = entity_from_userid(get_int("attacker"));
    const me = local_player();

    // Check if this player_hurt event has anything to do with us.
    if (attacker !== me || userid === me)
        return;

    // Get the current tick count.
    const tick = tickcount();

    // If there's no data in this tick, it means that our bullet_impact wasn't registered and, thus, there's nothing we should do.
    if (data[tick] == undefined || data[tick][me] == undefined)
        return;

    // Get the hitgroup our bullet hit.
    const hitgroup = get_int("hitgroup");

    // Get some more data and convert our hitgroup into an array of hitboxes.
    const current = data[tick][me];
    const hitboxes = hitgroup_to_hitbox[hitgroup];

    // Setup a variable to do distance-based calculations
    // 8192 is the maximum distance a bullet can travel in CS:GO.
    var min_distance = 8192;

    // Loop through all of the converted hitboxes.
    for (var i in hitboxes) {
        // Get the current hitbox and it's position.
        const hitbox = hitboxes[i];
        const hitbox_position = Entity.GetHitboxPosition(userid, hitbox);

        // Calculate the distance between our bullet_impact position and this hitbox's position.
        const distance = sqrt((current.pos[0] - hitbox_position[0]) ** 2 + (current.pos[1] - hitbox_position[1]) ** 2 + (current.pos[2] - hitbox_position[2]) ** 2);

        // If the distance is lower than the previous one, this means that this hitbox has a
        // higher chance of being the hitbox our bullet hit.
        if (distance < min_distance)
        {
            // If so, update our data array to use this hitbox's position instead.
            current.hit = true;
            current.pos = hitbox_position;

            // Update our 'min_distance' variable to do further calculations
            min_distance = distance;
        }
    }
}

function draw() {
    // If the script isn't enabled, return.
    if (!get(enable))
        return;

    // Get some of our drawing info.
    const selected_color = get(color, true);
    const inc = 0.25 * frametime() * selected_color[3];

    // Loop for every element inside our data array.
    for (var tick in data)
    {
        // Transform 'tick' into an integer because JS doesn't do that apparently.
        tick = parseInt(tick);

        // Get our current tick's data.
        const draw_info = data[tick];

        // Transform our impact's position into screen coordinates.
        const wts = to_screen(draw_info.pos);

        // Update our alpha to create a smooth fade out effect.
        draw_info.alpha = max(draw_info.alpha - inc, 0);

        // If our alpha is 0, then it means our animations is over.
        // Thus, there's no need to render this impact.
        if (draw_info.alpha === 0)
            continue;

        // Render our sexy impact indicator.
        render_faded_circle(wts[0], wts[1], draw_info.hit ? 20 : 15, [selected_color[0], selected_color[1], selected_color[2], draw_info.alpha]);
    }
}

function reset_data() {
    // Reset our data array every round or server switch.
    data = [];
}

callback("bullet_impact", "on_bullet_impact");
callback("player_hurt", "on_player_hurt");
callback("round_prestart", "reset_data");
callback("player_connect_full", "reset_data");
callback("Draw", "draw");
//endregion
