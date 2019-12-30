/**
*
* Title: Quick stop
* Author: april#0001
* Description: A custom quick stop system for Onetap.
*
*/

//region dependencies

/**
 * @title BetterUI
 * @version 1.0.0
 * @description A better UI system for Onetap
 */

var menu_elements_t = [];
var menu_c = [];
const menu_spacer = "                                                                                  ";

/**
 * Creates a new menu label
 *
 * @param label {string}
 */
menu_c.label = function(label)
{
    // Creates the label
    UI.AddLabel(label);
}

/**
 * Creates a new menu element
 *
 * @param func {function}
 * @param name {string}
 * @param label {string},
 * @param properties {array}
 */
menu_c.call = function(func, name, label, properties)
{
    // If the label isn't unique
    if (label in menu_elements_t)
        throw new Error("[Menu] The label must be unique!");

    // Get properties
    const final_name = name + menu_spacer + label;
    var final_props = [final_name];
    const element_info_t = {
        name: name,
        label: label,
        properties: properties
    };

    // If our properties aren't null, then pack them together.
    if (properties !== null)
    {
        for (var i = 0; i < properties.length; i++)
        {
            final_props.push(properties[i]);
        }
    }

    // Create our menu element and return properties
    func.apply(null, final_props);
    menu_elements_t[label] = element_info_t;
    return label;
}

/**
 * Gets the value of a menu element
 *
 * @param label {string}
 * @return {any}
 */
menu_c.get = function(label)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Returns the element's value
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", final_name);
}

/**
 * Gets the value of a menu element
 *
 * @param label {string}
 * @return {any}
 */
menu_c.get_hotkey = function(label)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Returns the element's value
    return UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", final_name);
}

/**
 * Sets the value of a menu element
 *
 * @param label {string}
 * @param value {any}
 */
menu_c.set = function(label, value)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Set the element's value
    UI.SetValue("Misc", "JAVASCRIPT", "Script items", final_name, value);
}

/**
 * Changes the visibility of a menu elements
 *
 * @param label {string}
 * @param visible {boolean}
 */
menu_c.visibility = function(label, visible)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Change the element's visibility
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", final_name, visible);
}

/**
* @title Vector3D
* @version 1.0.0
* @description A simple 3D vector library
*/

var vec3 = {__index: "vec3"};

vec3.new = function(x, y, z)
{
    if (x instanceof Array)
        return {
            x: x[0],
            y: x[1],
            z: x[2]
        };

    return {
        x: x,
        y: y,
        z: z
    }
}

vec3.unpack = function(self)
{
    return [self.x, self.y, self.z];
}

vec3.add = function(vec, vec2)
{
    if (vec2 instanceof Number)
        return {
            x: vec.x + vec2,
            y: vec.y + vec2,
            z: vec.z + vec2
    }

    return {
        x: vec.x + vec2.x,
        y: vec.y + vec2.y,
        z: vec.z + vec2.z
    }
}

vec3.sub = function(vec, vec2)
{
    if (vec2 instanceof Number)
        return {
            x: vec.x - vec2,
            y: vec.y - vec2,
            z: vec.z - vec2
    }

    return {
        x: vec.x - vec2.x,
        y: vec.y - vec2.y,
        z: vec.z - vec2.z
    }
}

vec3.multiply = function(vec, vec2)
{
    if (vec2 instanceof Number)
        return {
            x: vec.x * vec2,
            y: vec.y * vec2,
            z: vec.z * vec2
    }

    return {
        x: vec.x * vec2.x,
        y: vec.y * vec2.y,
        z: vec.z * vec2.z
    }
}

vec3.divide = function(vec, vec2)
{
    if (vec2 instanceof Number)
        return {
            x: vec.x / vec2,
            y: vec.y / vec2,
            z: vec.z / vec2
    }

    return {
        x: vec.x / vec2.x,
        y: vec.y / vec2.y,
        z: vec.z / vec2.z
    }
}

vec3.length = function(self)
{
    return Math.sqrt((self.x * self.x) + (self.y * self.y) + (self.z * self.z));
}

vec3.distance = function(self, destination)
{
    return vec3.length(vec3.sub(destination, self));
}

const clamp = function(v, min, max)
{
    return Math.min(Math.max(v, min), max);
}

//endregion

//region main

// Create our main variables
// Regarding the tracing system
const max_radius = Math.PI * 2;
const step = max_radius / 24;

// Regarding functions status
var unduck = false;
var is_lj = false;

// Regarding the chart
var last_log = 0;
var last_delta = 0;
var last_color = null;
var velocity_data = [];

//endregion

//region menu

// Create our menu elements
const jb = menu_c.call(UI.AddHotkey, "Automatic jumpbug", "mv_jumpbug", null);
const cb = menu_c.call(UI.AddHotkey, "Automatic crouchbug", "mv_crouchbug", null);
const lj = menu_c.call(UI.AddHotkey, "Automatic longjump", "mv_longjump", null);
const info = menu_c.call(UI.AddCheckbox, "Draw movement info", "mv_showinfo", null);
const info_offset = menu_c.call(UI.AddSliderInt, "Info chart offset", "mv_showinfo_offset", [0, 500]);

//endregion

//region function


/**
 * Handles the jumpbug and crouchbug feature
 *
 * @param  {boolean} should_jump Specifies if we should crouchbug or jumpbug
 * @return {void}
 */
function do_jump_bug(should_jump)
{
    // Gets our local player
    const player = Entity.GetLocalPlayer();

    // If our player isn't valid or if we're not alive, return
    if (!player || !Entity.IsAlive(player))
        return;

    // If we're not using any of the crouchbug related features, return
    if (!menu_c.get_hotkey(jb) && !menu_c.get_hotkey(cb))
    {
        // Check if we we're ine middle of a crouchbug when we stopped pressing the crouchbug/jumpbug hotkey
        // This will prevent you to duck infinitely and having to reset it manually
        if (unduck)
        {
            // Resets the duck state
            unduck = false;
            Cheat.ExecuteCommand("-duck");
        }

        return;
    }

    // If we performed a crouchbug/jumpbug and we need to disable the crouch...
    if (unduck)
    {
        // Then disable it!
        unduck = false;
        Cheat.ExecuteCommand("-duck");
    }

    // Get our properties
    const flags = Entity.GetProp(player, "CBasePlayer", "m_fFlags");
    const origin = vec3.new(Entity.GetProp(player, "CBaseEntity", "m_vecOrigin"));
    const vel = vec3.new(Entity.GetProp(player, "CBasePlayer", "m_vecVelocity[0]"));

    // Fix our origin vector
    vel = vec3.multiply(vel, vec3.new(Globals.TickInterval(), Globals.TickInterval(), 0));
    origin = vec3.add(origin, vel);

    // If we're on the ground...
    if (flags & 1)
    {
        // And we're pressing the jumpbug hotkey...
        if (should_jump)
        {
            // Then jump!
            UserCMD.ForceJump();
        }

        // Otherwise, just return, since our crouchbug was already performed.
        return;
    }

    // Cycles through a circle, creating 24 traces around you.
    for (var i = 0; i < max_radius; i+=step)
    {
        // Gets the vectors the trace will be based upon.
        const start = vec3.add(origin, vec3.new(Math.cos(i) * 17, Math.sin(i) * 17, 0));
        const end = vec3.add(origin, vec3.new(Math.cos(i) * 17, Math.sin(i) * 17, -9));

        // Do the tracing
        const trace_t = Trace.Line(player, vec3.unpack(start), vec3.unpack(end));

        // If we're in the middle of the air then...
        if (trace_t[1] !== 0 && trace_t[1] !== 1)
        {
            // Duck and update ducking status
            Cheat.ExecuteCommand("+duck");
            unduck = true;
            return;
        }
    }
}


/**
 * Handles the long jump feature
 *
 * @return {void}
 */
function do_long_jump()
{
    // Get our local player
    const player = Entity.GetLocalPlayer();

    // If our local player isn't valid or if we're not alive, return
    if (!player || !Entity.IsAlive(player))
        return;

    // Get our flags
    const flags = Entity.GetProp(player, "CBasePlayer", "m_fFlags");

    // If we're not pressing the longjump hotkey...
    if (!menu_c.get_hotkey(lj))
    {
        // And we're in the middle of a longjump...
        if (is_lj)
        {
            // Reset the longjump status and disable features.
            is_lj = false;
            Cheat.ExecuteCommand("-jump");
            UI.SetValue("Misc", "Movement", "Auto strafe", 0);
        }

        // Return since we're not using the feature.
        return;
    }

    // If we're on the ground...
    if (flags & 1)
    {

        // And we were in the middle of a longjump...
        if (is_lj)
        {
            // Reset the longjump status and disable features.
            is_lj = false;
            Cheat.ExecuteCommand("-jump");
            UI.SetValue("Misc", "Movement", "Auto strafe", 0);
            return;
        }

        // Otherwise, if we're on the air...
    } else {

        // And we're not on the longjump status...
        if (!is_lj)
        {
            // Enable the longjump status and the features.
            is_lj = true;
            UI.SetValue("Misc", "Movement", "Auto strafe", 3);
            return;
        }

        // Keep IN_JUMP to ensure that the auto-strafer will work.
        Cheat.ExecuteCommand("+jump");
    }

}


/**
 * Gets the color of our velocity indicator based on the latest velocity delta
 *
 * @param {number} delta
 */
const get_delta_color = function(delta)
{
    // Rounds our delta to get more consistent results
    delta = Math.round(delta);

        // Who the f*ck made this code?!
        // If the delta is positive, then set the color to red (confusing, right? I thought that too).
        if (delta > 0)
        {
            delta = [255, 200, 205, 200];
    } else
        // If the delta is negative, then set the color to green.
        if (delta < 0)
        {
            delta = [220, 255, 200, 200];
    } else
        // If there's no delta, then set the color to yellow.
        if (delta > -1 && delta < 1)
        {
            delta = [255, 255, 200, 200];
        }

    // Return the final color
    return delta;
}


/**
 * Draws the velocity chart
 *
 * @return {void}
 */
function do_velocity_info()
{
    // Get the local player
    const player = Entity.GetLocalPlayer();

    // If our local player ins't valid or we're not alive, return
    if (!player || !Entity.IsAlive(player))
        return;

    // If our velocity chart isn't enabled, return
    if (!menu_c.get(info))
        return;

    // Get drawing properties
    const x = Render.GetScreenSize()[0], y = Render.GetScreenSize()[1] + menu_c.get(info_offset);

    const vec = Entity.GetProp(player, "CBasePlayer", "m_vecVelocity[0]");
    const velocity = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
    const in_air = Entity.GetProp(player, "CBasePlayer", "m_fFlags") & 1 || Entity.GetProp(player, "CBasePlayer", "m_fFlags") & 17;

    // Draw the outter part of the chart
    Render.String(x / 2, y / 2 + 150, 1, Math.round(velocity).toString(), get_delta_color(last_delta), 4);
    Render.String(x / 2 + 1, y / 2 + 185, 1, "u/s", [225, 225, 225, 225], 2);

    Render.Line(x / 2 - 100, y / 2 + 25, x / 2 - 100, y / 2 + 145, [100, 100, 100, 125]);
    Render.Line(x / 2 - 115, y / 2 + 130, x / 2 + 95, y / 2 + 130, [100, 100, 100, 125]);

    // Update our velocity data every tick
    if (Globals.Curtime() - last_log > Globals.TickInterval())
    {
        // Cache our current time to do the next timer calculations..
        last_log = Globals.Curtime();

        // And return data.
        velocity_data.unshift([velocity, in_air]);
    }

    // If we didn't gather enough data to draw a chart, draw an indicator and return
    if (velocity_data.length < 2)
    {
        Render.String(x / 2, 120, 1, "CREATING CHART...", [200, 200, 200, Math.sin((Globals.Realtime() % 3) * 4) * (255 / 2 - 1) + 255 / 2], 12);
        return;
    }

    // If we reached our data's array limit, then remove the last value.
    if (velocity_data.length > 40)
        velocity_data.pop();

    // Loops for each value inside our velocity data's array.
    for (var i = 0; i < velocity_data.length - 1; i++)
    {
        // Get the info necessary to draw the chart
        const cur = velocity_data[i][0];
        const next = velocity_data[i + 1][0];
        const landed = velocity_data[i][1] && !velocity_data[i + 1][1];

        // We only need to update the velocity delta once, so do it only if the index is equal 0
        if (i === 0)
            last_delta = next - cur;

        // Render each line of the chart
        Render.Line(x / 2 + 90 - (i - 1) * 5, y / 2 + 130 - (clamp(cur, 0, 450) * 75 / 320), x / 2 + 90 - i * 5, y / 2 + 130 - (clamp(next, 0, 450) * 75 / 320), [200, 200, 200, 255]);

        // If we landed in our current tick then...
        if (landed)
        {
            // Draw the velocity on the chart for that extra info which will make you feel unique and cool when making your mediocre ass shadowplay videos!
            Render.String(x / 2 + 100 - (i + 1) * 5, y / 2 + 115 - (clamp(next, 0, 450) * 75 / 320), 0, Math.round(next).toString(), [255, 200, 200, 255], 3);
        }
    }
}


/**
 * Where our CreateMove functions are called
 *
 * @return {void}
 */
function on_create_move()
{
    // Check if we should jumpbug or crouchbug
    const should_jump = menu_c.get_hotkey(jb);

    // Do CreateMove features
    do_jump_bug(should_jump);
    do_long_jump();
}


/**
 * Resets the chart data whenever we changed between servers/maps
 *
 * @return {void}
 */
function reset()
{
    // Reset all data in order to not glitch out.
    last_log = Globals.Curtime();
    velocity_data = [];
}

//endregion

//region callbacks

// Callback our functions!
Cheat.RegisterCallback("CreateMove", "on_create_move");
Cheat.RegisterCallback("Draw", "do_velocity_info");
Cheat.RegisterCallback("player_connect_full", "reset");

//endregion
