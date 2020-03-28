/**
 *
 * Title: Advanced body freestanding
 * Author: april#0001
 * Description: Gives more anti-aim customization for advanced users.
 *
 */

//region api

// Localizing all of the functions in snake_case because why not.
const global_print = Global.Print, global_print_chat = Global.PrintChat, global_print_color = Global.PrintColor, global_register_callback = Global.RegisterCallback, global_execute_command = Global.ExecuteCommand, global_frame_stage = Global.FrameStage, global_tickcount = Global.Tickcount, global_tickrate = Global.Tickrate, global_tick_interval = Global.TickInterval, global_curtime = Global.Curtime, global_realtime = Global.Realtime, global_frametime = Global.Frametime, global_latency = Global.Latency, global_get_view_angles = Global.GetViewAngles, global_set_view_angles = Global.SetViewAngles, global_get_map_name = Global.GetMapName, global_is_key_pressed = Global.IsKeyPressed, global_get_screen_size = Global.GetScreenSize, global_get_cursor_position = Global.GetCursorPosition, global_play_sound = Global.PlaySound, global_play_microphone = Global.PlayMicrophone, global_stop_microphone = Global.StopMicrophone, global_get_username = Global.GetUsername, global_set_clan_tag = Global.SetClanTag, globals_tickcount = Globals.Tickcount, globals_tickrate = Globals.Tickrate, globals_tick_interval = Globals.TickInterval, globals_curtime = Globals.Curtime, globals_realtime = Globals.Realtime, globals_frametime = Globals.Frametime, sound_play = Sound.Play, sound_play_microphone = Sound.PlayMicrophone, sound_stop_microphone = Sound.StopMicrophone, cheat_get_username = Cheat.GetUsername, cheat_register_callback = cheat_register_callback = new Proxy(Cheat.RegisterCallback, { apply: function(_, _, args) { switch(args[0]) { case 'paint': Cheat.RegisterCallback('Draw', args[1]); break; case 'create_move': Cheat.RegisterCallback('CreateMove', args[1]); break; case 'fsn': Cheat.RegisterCallback('FrameStageNotify', args[1]); break; default: Cheat.RegisterCallback(args[0], args[1]); break; } } }), cheat_execute_command = Cheat.ExecuteCommand, cheat_frame_stage = Cheat.FrameStage, cheat_print = Cheat.Print, cheat_print_chat = Cheat.PrintChat, cheat_print_color = Cheat.PrintColor, local_latency = Local.Latency, local_get_view_angles = Local.GetViewAngles, local_set_view_angles = Local.SetViewAngles, local_set_clan_tag = Local.SetClanTag, local_get_real_yaw = Local.GetRealYaw, local_get_fake_yaw = Local.GetFakeYaw, local_get_spread = Local.GetSpread, local_get_inaccuracy = Local.GetInaccuracy, world_get_map_name = World.GetMapName, world_get_server_string = World.GetServerString, input_get_cursor_position = Input.GetCursorPosition, input_is_key_pressed = Input.IsKeyPressed, render_string = Render.String, render_text_size = Render.TextSize, render_line = Render.Line, render_rect = Render.Rect, render_filled_rect = Render.FilledRect, render_gradient_rect = Render.GradientRect, render_circle = Render.Circle, render_filled_circle = Render.FilledCircle, render_polygon = Render.Polygon, render_world_to_screen = Render.WorldToScreen, render_add_font = Render.AddFont, render_find_font = Render.FindFont, render_string_custom = Render.StringCustom, render_textured_rect = Render.TexturedRect, render_add_texture = Render.AddTexture, render_text_size_custom = Render.TextSizeCustom, render_get_screen_size = Render.GetScreenSize, ui_get_value = UI.GetValue, ui_set_value = UI.SetValue, ui_add_checkbox = UI.AddCheckbox, ui_add_slider_int = UI.AddSliderInt, ui_add_slider_float = UI.AddSliderFloat, ui_add_hotkey = UI.AddHotkey, ui_add_label = UI.AddLabel, ui_add_dropdown = UI.AddDropdown, ui_add_multi_dropdown = UI.AddMultiDropdown, ui_add_color_picker = UI.AddColorPicker, ui_add_textbox = UI.AddTextbox, ui_set_enabled = UI.SetEnabled, ui_get_string = UI.GetString, ui_get_color = UI.GetColor, ui_set_color = UI.SetColor, ui_is_hotkey_active = UI.IsHotkeyActive, ui_toggle_hotkey = UI.ToggleHotkey, ui_is_menu_open = UI.IsMenuOpen, convar_get_int = Convar.GetInt, convar_set_int = Convar.SetInt, convar_get_float = Convar.GetFloat, convar_set_float = Convar.SetFloat, convar_get_string = Convar.GetString, convar_set_string = Convar.SetString, event_get_int = Event.GetInt, event_get_float = Event.GetFloat, event_get_string = Event.GetString, entity_get_entities = Entity.GetEntities, entity_get_entities_by_class_i_d = Entity.GetEntitiesByClassID, entity_get_players = Entity.GetPlayers, entity_get_enemies = Entity.GetEnemies, entity_get_teammates = Entity.GetTeammates, entity_get_local_player = Entity.GetLocalPlayer, entity_get_game_rules_proxy = Entity.GetGameRulesProxy, entity_get_entity_from_user_i_d = Entity.GetEntityFromUserID, entity_is_teammate = Entity.IsTeammate, entity_is_enemy = Entity.IsEnemy, entity_is_bot = Entity.IsBot, entity_is_local_player = Entity.IsLocalPlayer, entity_is_valid = Entity.IsValid, entity_is_alive = Entity.IsAlive, entity_is_dormant = Entity.IsDormant, entity_get_class_i_d = Entity.GetClassID, entity_get_class_name = Entity.GetClassName, entity_get_name = Entity.GetName, entity_get_weapon = Entity.GetWeapon, entity_get_weapons = Entity.GetWeapons, entity_get_render_origin = Entity.GetRenderOrigin, entity_get_prop = Entity.GetProp, entity_set_prop = Entity.SetProp, entity_get_hitbox_position = Entity.GetHitboxPosition, entity_get_eye_position = Entity.GetEyePosition, trace_line = Trace.Line, trace_bullet = Trace.Bullet, usercmd_set_movement = UserCMD.SetMovement, usercmd_get_movement = UserCMD.GetMovement, usercmd_set_angles = UserCMD.SetAngles, usercmd_force_jump = UserCMD.ForceJump, usercmd_force_crouch = UserCMD.ForceCrouch, antiaim_get_override = AntiAim.GetOverride, antiaim_set_override = AntiAim.SetOverride, antiaim_set_real_offset = AntiAim.SetRealOffset, antiaim_set_fake_offset = AntiAim.SetFakeOffset, antiaim_set_l_b_y_offset = AntiAim.SetLBYOffset, exploit_get_charge = Exploit.GetCharge, exploit_recharge = Exploit.Recharge, exploit_disable_recharge = Exploit.DisableRecharge, exploit_enable_recharge = Exploit.EnableRecharge, ragebot_override_minimum_damage = Ragebot.OverrideMinimumDamage, ragebot_override_hitchance = Ragebot.OverrideHitchance, ragebot_override_accuracy_boost = Ragebot.OverrideAccuracyBoost, ragebot_override_multipoint_scale = Ragebot.OverrideMultipointScale, ragebot_force_safety = Ragebot.ForceSafety;
//endregion

//region dependencies

/**
 * @title BetterUI
 * @version 2.0.0
 * @description A better UI system for Onetap
 */

var menu = [];
const menu_spacer = "                                                                                  ";

/**
 * Creates a new menu label
 *
 * @param label {string}
 */
menu.label = function(label)
{
    // Creates the label
    UI.AddLabel(label);
};

/**
 * Creates a new menu element
 *
 * @param func {function}
 * @param name {string}
 * @param label {string},
 * @param properties {array}
 */
menu.call = function(func, name, label, properties)
{
    // Get properties
    const final_name = name + menu_spacer + label;
    var final_props = [final_name];
    const element_info_t = {
        path: ["Misc", "JAVASCRIPT", "Script Items", final_name]
    };

    // If our properties aren't null, then pack them together.
    if (properties != null)
    {
        for (var i = 0; i < properties.length; i++)
        {
            final_props.push(properties[i]);
        }
    }

    // Create our menu element and return properties
    func.apply(null, final_props);
    return element_info_t;
};

/**
 * Creates a new menu reference
 *
 * @param path {array}
 */
menu.reference = function(path)
{
    const element_info_t = {
        path: path
    };

    return element_info_t;
};

/**
 * Gets the value of a menu element
 *
 * @param elem {array}
 * @return {*}
 */
menu.get = function(elem)
{
    // If the element doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Returns the element's value
    return UI.GetValue.apply(null, elem.path);
};

/**
 * Gets the value of a menu element
 *
 * @param elem {array}
 * @return {*}
 */
menu.get_hotkey = function(elem)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Returns the element's value
    return UI.IsHotkeyActive.apply(null, elem.path);
};

/**
 * Gets the value of a menu element
 *
 * @param elem {array}
 * @return {*}
 */
menu.get_color = function(elem)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Returns the element's value
    return UI.GetColor.apply(null, elem.path);
};

/**
 * Sets the value of a menu element
 *
 * @param elem {array}
 * @param value {any}
 */
menu.set = function(elem, value)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Get properties
    const properties = elem;
    properties.path.push(value);

    // Set the element's value
    UI.SetValue.apply(null, properties.path);
};

/**
 * Sets the value of a color picker
 *
 * @param elem {array}
 * @param color {array|Color}
 */
menu.set_color = function(elem, color)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Get properties
    const properties = elem;
    properties.path.push(color);

    // Set the element's value
    UI.SetColor.apply(null, properties.path);
};

/**
 * Sets the value of a color picker
 *
 * @param elem {array}
 */
menu.toggle = function(elem)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Set the element's value
    UI.ToggleHotkey.apply(null, elem.path);
};

/**
 * Changes the visibility of a menu elements
 *
 * @param elem {array}
 * @param visible {boolean}
 */
menu.visibility = function(elem, visible)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Get properties
    const properties = elem;
    properties.path.push(visible);

    // Change the element's visibility
    UI.SetEnabled.apply(null, properties.path);
};

/**
 * @title Vector
 * @description Simple 3d vector system
 *
 * @typedef Vector {x: number, y: number, z: number}
 */
var vector = {
    _class: 'vector'
};

/**
 * @brief Creates a new 3d vector instance.
 * @param data {array}
 * @returns {Vector}
 */
vector.new = function(data)
{
    return {
        x: data[0],
        y: data[1],
        z: data[2]
    };
};

/**
 * @brief Realizes a mathematical operation between two vectors.
 * @param vec {Vector}
 * @param vec2 {Vector}
 * @param operation {string}
 * @returns {Vector}
 */
vector.operate = function(vec, vec2, operation)
{
  switch (operation)
  {
      case '+':
          return {
              x: vec.x + vec2.x,
              y: vec.y + vec2.y,
              z: vec.z + vec2.z
          };

      case '-':
          return {
              x: vec.x - vec2.x,
              y: vec.y - vec2.y,
              z: vec.z - vec2.z
          };

      case '*':
          return {
              x: vec.x * vec2.x,
              y: vec.y * vec2.y,
              z: vec.z * vec2.z
          };

      case '/':
          return {
              x: vec.x / vec2.x,
              y: vec.y / vec2.y,
              z: vec.z / vec2.z
          };

      default:
          throw new Error("[Vector] Invalid operation type.");
  }
};

/**
 * @brief Returns the 2d length of a vector.
 * @param vec {Vector}
 * @returns {number}
 */
vector.length2d = function(vec)
{
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
};

/**
 * @brief Converts a vector to angles.
 * @param vec
 * @returns {Vector}
 */
vector.angles = function(vec)
{
    return {
        x: -Math.atan2(vec.z, this.length2d(vec)) * 180 / Math.PI,
        y: Math.atan2(vec.y, vec.x) * 180 / Math.PI,
        z: 0
    };
};

/**
 * @brief Calculates the fov delta between two points based on a specific view angles.
 * @param origin {Vector}
 * @param destination {Vector}
 * @param view {Vector}
 * @returns {number}
 */
vector.fov_to = function(origin, destination, view)
{
    const angles = this.angles(this.operate(destination, origin, '-'));

    const delta = this.new(
        [
            Math.abs(view.x - angles.x),
            Math.abs(view.y % 360 - angles.y % 360) % 360,
            0
        ]
    );

    if (delta.y > 180)
        delta.y = 360 - delta.y;

    return this.length2d(delta);
};

/**
 * @brief Unpacks a vector object into an array.
 * @param vec {Vector}
 * @returns {[number, number, number]}
 */
vector.to_array = function(vec)
{
    return [
        vec.x,
        vec.y,
        vec.z
    ];
};

/**
 * @brief Normalizes an yaw angle.
 * @param angle {number}
 * @returns {number}
 */
function normalize_yaw(angle)
{
    var adjusted_yaw = angle;
    if (adjusted_yaw < -180)
        adjusted_yaw += 360;

    if (adjusted_yaw > 180)
        adjusted_yaw -= 360;

    return adjusted_yaw;
}

//endregion

//region main

// Create our main instance
var plugin = {
    _info: {
        _title: "Advanced body freestanding",
        _version: "1.0.0",
        _author: "april#0001"
    },

    last_hit_lby: []
};

//endregion

//region menu

// Create our menu elements
const enable = menu.call(ui_add_checkbox, "Advanced body freestanding", "lby_enable", []);
const body = menu.call(ui_add_dropdown, "Body freestanding", "lby_body_mode", [["Hide real angle", "Hide fake angle"]]);
const smart = menu.call(ui_add_checkbox, "Smart switch", "lby_smart", []);

// Declare our references
const ref_inverter = menu.reference(["Anti-Aim", "Fake angles", "Inverter"]);
const ref_inverter_legit = menu.reference(["Anti-Aim", "Legit Anti-Aim", "Direction key"]);
const ref_ragebot = menu.reference(["Rage", "GENERAL", "General", "Enabled"]);

//endregion

//region functions

/**
 * @brief Inverts the lower body yaw to the specified value.
 * @param state {number} Whether or not to invert the lower body yaw.
 */
function update_anti_aim_state(state)
{
    // If our rage aimbot is enabled, than we should invert the
    // rage anti-aim.
    if (menu.get(ref_ragebot))
    {
        // Check if our inverter's state is the same as our desired one.
        // If not, then toggle the hotkey to invert it.
        if (menu.get_hotkey(ref_inverter) !== state)
            menu.toggle(ref_inverter);

        // Return because we don't wanna do the same to the legit anti-aim's state.
        return;
    }

    // Invert the state because the legit anti-aim's inverter is different
    // from the rage one.
    state = (state + 1) % 2;

    // Check if our inverter's state is the same as our desired one.
    // If not, then toggle the hotkey to invert it.
    if (menu.get_hotkey(ref_inverter_legit) !== state)
        menu.toggle(ref_inverter_legit);
}

/**
 * @brief Gets the closest (FOV-based) enemy and returns its entity id.
 * @returns {number}
 */
function get_closest_target( )
{
    // Get our entities.
    const players = entity_get_enemies( );
    const me = entity_get_local_player( );

    // Initialize our data array.
    const data = {id: null, fov: 180};

    // Loop for each player in the server.
    for (var i = 0; i < players.length; i++)
    {
        // Get the current player.
        const e = players[i];

        // Get our eye's position, the player's head position and our view angles.
        const destination = vector.new(entity_get_hitbox_position(e, 0)), origin = vector.new(entity_get_eye_position(me));
        const angles = vector.new(local_get_view_angles());

        // Calculate the FOV distance.
        const fov = vector.fov_to(origin, destination, angles);

        // If our FOV distance is lower than the cached one, then it means that
        // there's another player which is even closer to our crosshair.
        if (fov < data.fov)
        {
            // Cache this entity and our current FOV distance for further
            // calculations.
            data.id = e;
            data.fov = fov;
        }
    }

    // Return the closest entity to our crosshair.
    return data.id;
}

/**
 * @brief Gets which anti-aim side matches your settings the best. Or, in other words, does freestanding.
 */
function get_optimal_angle( )
{
    // Get current lower body yaw mode
    const _mode = menu.get(body);

    // Get some properties.
    const me = entity_get_local_player( );

    // And more properties..
    const origin = vector.new(entity_get_render_origin(me));
    var yaw = local_get_view_angles( )[1];
    var data = {left: 0, right: 0};

    // Loops for every angle from the left of your yaw to the right of your yaw
    // in steps of 30, resulting in 3 steps per side.
    for (var r = yaw - 90; r <= yaw + 90; r += 30)
    {
        // If our current angle is the center one then there's no need
        // to do anything with it.
        if (r === yaw)
            continue;

        // Convert our angle to radians
        const rad = r * Math.PI / 180;

        // Create our destination point based on current angle.
        const point = vector.operate(
            origin,
            vector.new([
                256 * Math.cos(rad),
                256 * Math.sin(rad),
                0
            ]),
            "+"
        );

        // Trace a line from our player's origin to the current point.
        // Using this to check the trace's fraction (m_flFraction) until
        // it hits something and then add it to our data array.
        //
        // This is how my 'environmental freestanding' logic is made.
        // The side with lower fractions is the side which is logically
        // closer to the player's head.
        const line = trace_line(me, vector.to_array(origin), vector.to_array(point));

        // Get which side we're iterating on.
        const side = r < yaw ? "left" : "right";

        // Update our data array.
        data[side] += line[1];
    }

    // Calculates an average for both sides.
    data.left /= 3;
    data.right /= 3;

    // If our left avg. fractions are greater than the right ones, then return
    // the number 0 which corresponds to the right side, or, in the Hide fake angle mode,
    // return 1 which corresponds to the left side.
    if (data.left > data.right)
        return _mode === 0 ? 0 : 1;

    // Does the same thing as above, except the right avg. fractions are greater than
    // the left ones.
    return _mode === 0 ? 1 : 0;
}

/**
 * @brief Updates our anti-aim based on the current freestanding mode and input.
 */
function update_anti_aim( )
{
    // Get our local player.
    const me = entity_get_local_player( );

    // Check if our player is valid and alive.
    if (!entity_is_valid(me) || !entity_is_alive(me))
        return;

    // Get if our anti-aim is on smart mode.
    const _smart = menu.get(smart);

    // If our anti-aim is set to 'Smart', then the entire logic is different.
    // The smart mode does not use freestanding as input, it uses data from
    // other users as input.
    if (_smart)
    {
        // Get our FOV-based target.
        const target = get_closest_target( );

        // Check if our target is valid.
        // Otherwise, just return our current freestanding angle.
        if (target == null)
        {
            update_anti_aim_state(get_optimal_angle( ));
            return;
        }

        // Check if our target has already hit us.
        // If not, then just return current freestanding angle.
        if (plugin.last_hit_lby[target] == null)
        {
            update_anti_aim_state(get_optimal_angle( ));
            return;
        }

        // Return the opposite angle to the last hit angle.
        // In this case if the inverter was off, now return on.
        if (plugin.last_hit_lby[target] === 0)
        {
            update_anti_aim_state(1);
            return;
        }

        // Or, if the inverter was on, return off.
        update_anti_aim_state(0);
        return;
    }

    // If our anti-aim is not on smart mode, then we're just using regular
    // freestanding. So, do freestanding.
    update_anti_aim_state(get_optimal_angle( ));
}

function do_indicators( )
{
    // Get our local player.
    const me = entity_get_local_player( );

    // Check if our player is valid and alive.
    if (!entity_is_valid(me) || !entity_is_alive(me))
        return;

    // Get our drawing properties.
    const y = render_get_screen_size( )[1];

    // Get our anti-aim info.
    const yaw = local_get_real_yaw( ), fake = local_get_fake_yaw( );
    var delta = Math.round(normalize_yaw(yaw - fake) / 2), abs = Math.abs(delta);

    // If we're using legit anti-aim, invert the delta.
    // Doing this to fix the indicators because legit
    // anti-aim inverter is different.
    if (menu.get(ref_ragebot))
        delta *= -1;

    // Render the 'FAKE' indicator
    // Totally did not copy it from gamesense.
    render_string(10, y - 99, 0, "FAKE", [10, 10, 10, 125], 4);
    render_string(10, y - 100, 0, "FAKE", [192 - (abs * 71 / 60), 32 + (abs * 146 / 60), 28, 200], 4);

    // Render the bar's background
    render_filled_rect(12, y - 68, 64, 4, [10, 10, 10, 125]);

    // Draw this small tile to fix a small issue that was driving me crazy.
    render_filled_rect(43, y - 67, 1, 2, [232, 232, 232, 200]);

    // Render the desync's length under the bar.
    render_string(41, y - 63, 1, abs.toString( ), [232, 232, 232, 200], 3);
    render_circle(48, y - 61, 1, [232, 232, 232, 200]);

    // If our delta is positive, than our desync is headed to the right.
    if (delta > 0)
    {
        // So, fill the bar from the center to the right, accounting for the desync's length.
        render_filled_rect(44, y - 67, abs * 31 / 60, 2, [232, 232, 232, 200]);
        return;
    }

    // If our delta is not positive, than our desync is headed to the left.
    // So, fill the bar from the center to the left.
    render_filled_rect(44 - abs * 31 / 60, y - 67, abs * 31 / 60, 2, [232, 232, 232, 200]);
}

/**
 * @callback create_move
 * @brief Handles our plugin's logic.
 */
function on_tick( )
{
    // Checks whether or not our script is enabled.
    if (!(menu.get(enable)))
        return;

    // Does the freestanding.
    update_anti_aim( );
}

function on_frame( )
{
    // Checks whether or not our script is enabled.
    if (!(menu.get(enable)))
        return;

    // Draws our indicators
    do_indicators( );
}

/**
 * @callback player_hurt
 * @brief Handles the last hit LBY logic.
 */
function on_player_hurt( )
{
    // Get the event's entities.
    const me = entity_get_local_player( );
    const attacker = entity_get_entity_from_user_i_d(event_get_int("attacker"));
    const userid = entity_get_entity_from_user_i_d(event_get_int("userid"));

    // Checks if our local player was the one getting hurt and not the one attacking.
    // Or, in other words, check if we got hurt.
    if (me !== attacker && me === userid)
    {
        // Update the last hit lower body global.
        plugin.last_hit_lby[attacker] = menu.get_hotkey(ref_inverter);
    }
}

/**
 * @callback round_start, player_connect_full
 * @brief Resets the last hit LBY list whenever the round ends or you switch servers.
 */
function reset( )
{
    // Reset the last lower body state.
    plugin.last_hit_lby = [];
}


//endregion

//region callbacks

// Register our 'create_move' callback.
cheat_register_callback(
    'create_move', 'on_tick'
);

// Register our 'paint' callback.
cheat_register_callback(
    'paint', 'on_frame'
);

// Register our 'player_hurt' callback.
cheat_register_callback(
    'player_hurt', 'on_player_hurt'
);

// Register our 'round_start' callback.
cheat_register_callback(
    'round_start', 'reset'
);

// Register our 'player_connect_full' callback.
cheat_register_callback(
    'player_connect_full', 'reset'
);

//endregion
