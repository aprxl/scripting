/*
*
* Title: Better rain
* Author: april#0001, kessie#0001
* Description: A small visual and audio complement to the new weather feature.
*
*/

//region api
const global = [], globals = [], sound = [], cheat = [], local = [], world = [], input = [], render = [], ui = [], convar = [], event = [], entity = [], trace = [], usercmd = [], antiaim = [], exploit = [], ragebot = [], material = []; global.print = Global.Print, global.print_chat = Global.PrintChat, global.print_color = Global.PrintColor, global.register_callback = Global.RegisterCallback, global.execute_command = Global.ExecuteCommand, global.frame_stage = Global.FrameStage, global.tickcount = Global.Tickcount, global.tickrate = Global.Tickrate, global.tick_interval = Global.TickInterval, global.curtime = Global.Curtime, global.realtime = Global.Realtime, global.frametime = Global.Frametime, global.latency = Global.Latency, global.get_view_angles = Global.GetViewAngles, global.set_view_angles = Global.SetViewAngles, global.get_map_name = Global.GetMapName, global.is_key_pressed = Global.IsKeyPressed, global.get_screen_size = Global.GetScreenSize, global.get_cursor_position = Global.GetCursorPosition, global.play_sound = Global.PlaySound, global.play_microphone = Global.PlayMicrophone, global.stop_microphone = Global.StopMicrophone, global.get_username = Global.GetUsername, global.set_clan_tag = Global.SetClanTag, globals.tickcount = Globals.Tickcount, globals.tickrate = Globals.Tickrate, globals.tick_interval = Globals.TickInterval, globals.curtime = Globals.Curtime, globals.realtime = Globals.Realtime, globals.frametime = Globals.Frametime, sound.play = Sound.Play, sound.play_microphone = Sound.PlayMicrophone, sound.stop_microphone = Sound.StopMicrophone, cheat.get_username = Cheat.GetUsername, cheat.register_callback = function(c, f) { switch (c) { case 'create_move': Cheat.RegisterCallback("CreateMove", f); break; case 'paint': Cheat.RegisterCallback("Draw", f); break; case 'fsn': Cheat.RegisterCallback("FrameStageNotify", f); break; case 'shutdown': Cheat.RegisterCallback("Unload", f); break; default: Cheat.RegisterCallback(c, f); break; } }, cheat.execute_command = Cheat.ExecuteCommand, cheat.frame_stage = Cheat.FrameStage, cheat.print = Cheat.Print, cheat.print_chat = Cheat.PrintChat, cheat.print_color = Cheat.PrintColor, local.latency = Local.Latency, local.get_view_angles = Local.GetViewAngles, local.set_view_angles = Local.SetViewAngles, local.set_clan_tag = Local.SetClanTag, local.get_real_yaw = Local.GetRealYaw, local.get_fake_yaw = Local.GetFakeYaw, local.get_spread = Local.GetSpread, local.get_inaccuracy = Local.GetInaccuracy, world.get_map_name = World.GetMapName, world.get_server_string = World.GetServerString, input.get_cursor_position = Input.GetCursorPosition, input.is_key_pressed = Input.IsKeyPressed, render.string = Render.String, render.text_size = Render.TextSize, render.line = Render.Line, render.rect = Render.Rect, render.filled_rect = Render.FilledRect, render.gradient_rect = Render.GradientRect, render.circle = Render.Circle, render.filled_circle = Render.FilledCircle, render.polygon = Render.Polygon, render.world_to_screen = Render.WorldToScreen, render.add_font = Render.AddFont, render.find_font = Render.FindFont, render.string_custom = Render.StringCustom, render.textured_rect = Render.TexturedRect, render.add_texture = Render.AddTexture, render.text_size_custom = Render.TextSizeCustom, render.get_screen_size = Render.GetScreenSize, ui.get_value = UI.GetValue, ui.set_value = UI.SetValue, ui.add_checkbox = UI.AddCheckbox, ui.add_slider_int = UI.AddSliderInt, ui.add_slider_float = UI.AddSliderFloat, ui.add_hotkey = UI.AddHotkey, ui.add_label = UI.AddLabel, ui.add_dropdown = UI.AddDropdown, ui.add_multi_dropdown = UI.AddMultiDropdown, ui.add_color_picker = UI.AddColorPicker, ui.add_textbox = UI.AddTextbox, ui.set_enabled = UI.SetEnabled, ui.get_string = UI.GetString, ui.get_color = UI.GetColor, ui.set_color = UI.SetColor, ui.is_hotkey_active = UI.IsHotkeyActive, ui.toggle_hotkey = UI.ToggleHotkey, ui.is_menu_open = UI.IsMenuOpen, convar.get_int = Convar.GetInt, convar.set_int = Convar.SetInt, convar.get_float = Convar.GetFloat, convar.set_float = Convar.SetFloat, convar.get_string = Convar.GetString, convar.set_string = Convar.SetString, event.get_int = Event.GetInt, event.get_float = Event.GetFloat, event.get_string = Event.GetString, entity.get_entities = Entity.GetEntities, entity.get_entities_by_class_i_d = Entity.GetEntitiesByClassID, entity.get_players = Entity.GetPlayers, entity.get_enemies = Entity.GetEnemies, entity.get_teammates = Entity.GetTeammates, entity.get_local_player = Entity.GetLocalPlayer, entity.get_game_rules_proxy = Entity.GetGameRulesProxy, entity.get_entity_from_user_i_d = Entity.GetEntityFromUserID, entity.is_teammate = Entity.IsTeammate, entity.is_enemy = Entity.IsEnemy, entity.is_bot = Entity.IsBot, entity.is_local_player = Entity.IsLocalPlayer, entity.is_valid = Entity.IsValid, entity.is_alive = Entity.IsAlive, entity.is_dormant = Entity.IsDormant, entity.get_class_i_d = Entity.GetClassID, entity.get_class_name = Entity.GetClassName, entity.get_name = Entity.GetName, entity.get_weapon = Entity.GetWeapon, entity.get_weapons = Entity.GetWeapons, entity.get_render_origin = Entity.GetRenderOrigin, entity.get_render_box = Entity.GetRenderBox, entity.get_prop = Entity.GetProp, entity.set_prop = Entity.SetProp, entity.get_hitbox_position = Entity.GetHitboxPosition, entity.get_eye_position = Entity.GetEyePosition, trace.line = Trace.Line, trace.bullet = Trace.Bullet, usercmd.set_movement = UserCMD.SetMovement, usercmd.get_movement = UserCMD.GetMovement, usercmd.set_angles = UserCMD.SetAngles, usercmd.force_jump = UserCMD.ForceJump, usercmd.force_crouch = UserCMD.ForceCrouch, antiaim.get_override = AntiAim.GetOverride, antiaim.set_override = AntiAim.SetOverride, antiaim.set_real_offset = AntiAim.SetRealOffset, antiaim.set_fake_offset = AntiAim.SetFakeOffset, antiaim.set_l_b_y_offset = AntiAim.SetLBYOffset, exploit.get_charge = Exploit.GetCharge, exploit.recharge = Exploit.Recharge, exploit.disable_recharge = Exploit.DisableRecharge, exploit.enable_recharge = Exploit.EnableRecharge, ragebot.get_target = Ragebot.GetTarget, ragebot.ignore_target = Ragebot.IgnoreTarget, ragebot.force_target = Ragebot.ForceTarget, ragebot.force_target_safety = Ragebot.ForceTargetSafety, ragebot.force_target_hitchance = Ragebot.ForceTargetHitchance, ragebot.force_target_minimum_damage = Ragebot.ForceTargetMinimumDamage, ragebot.force_hitbox_safety = Ragebot.ForceHitboxSafety, material.create = Material.Create, material.destroy = Material.Destroy, material.get = Material.Get, material.set_key_value = Material.SetKeyValue, material.refresh = Material.Refresh
//endregion

//region dependencies

/**
 * @title BetterUI
 * @version 2.1.0
 * @description A better UI system for Onetap
 */

var menu = {};
const menu_spacer = "                                                                                  ";

/**
 * Concats two elements into an array without increasing the array length.
 * Prevents the memory leak in 2.0.0 from happening
 *
 * @param a {array}
 * @param b {any}
 */
menu.concat = function(a, b)
{
    // Creates a new array.
    var arr = [];

    // Push all items from the array 'a' into our array.
    for (var c in a)
    {
        arr.push(a[c]);
    }

    // Push the value 'b' into our array.
    arr.push(b);

    // Return the new array.
    return arr;
}

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
menu.new = function(func, name, label, properties)
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
    return {
        path: path
    };
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
 * @param value {*}
 */
menu.set = function(elem, value)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Get properties
    const properties = elem;

    // Set the element's value
    UI.SetValue.apply(null, this.concat(properties.path, value));
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

    // Set the element's value
    UI.SetColor.apply(null, this.concat(properties.path, color));
};

/**
 * Toggles a hotkey
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

    // Change the element's visibility
    UI.SetEnabled.apply(null, this.concat(properties.path, visible));
};

//endregion

//region locals

// Create our locals variables
var cache = {
    time: 0,
    outside: false,
};

const paths = {
    sound_out: "rain_outdoors",
    sound_in: "rain_indoors"
};

// Chat colours
// by @csmit195
const CHAT_COLOR = {
	WHITE: '\x01',
    RED: '\x02',
    LIGHT_PURPLE: '\x03',
    GREEN: '\x04',
    LIGHT_GREEN: '\x05',
    LIME: '\x06',
    GRAY: '\x08',
    YELLOW: '\x09',
    LIGHT_BLUE: '\x0A',
    CYAN: '\x0B',
    BLUE: '\x0C',
    MAGENTA: '\x0D',
    PINK: '\x0E',
    LIGHT_RED: '\x0F',
    GOLD: '\x10',
};

//endregion

//region menu

// Create our menu elements
const override = menu.new(ui.add_checkbox, "| Override world settings", "br_ovr", []);

// And reference the already existing ones.
const ref_skybox = menu.reference(["Visual", "WORLD", "Map", "Skybox"]);
const ref_weather = menu.reference(["Visual", "WORLD", "Map", "Weather"]);
const ref_nightmode_amount = menu.reference(["Visual", "WORLD", "Map", "Nightmode"]);

//endregion

//region functions

/**
 * This will play the rain sounds according to whether or not we're outside.
 * 
 * @param {number} frac 
 */
function play_soundscape(frac)
{
    // Get our current time and whether or not we're outside.
    const now = globals.curtime();
    const outside = frac > 0.87;

    // If it has been 4 seconds since we last played a sound and if our position hasn't changed in the last frame, return.
    if (now - cache.time < 4 && outside === cache.outside)
        return;

    // Otherwise, something changed and we need to update our soundspace.
    // So, we cache our current time so we can do further checks.
    cache.time = now;

    // Check if we are currently outside
    if (outside)
    {
        // If so, set our current state to outside and play the outdoors soundscape.
        cache.outside = true;
        cheat.execute_command("playvol " + paths.sound_out + " 1");

        // Return after that so we don't execute the other stuff.
        // This is just a silly way of simulating an 'else' statement.
        return;
    }

    // If we didn't return, it means we're indoors. So let's play the indoors soundscape and update our current state.
    cache.outside = false;
    cheat.execute_command("playvol " + paths.sound_in + " 1");
}
/**
 * Just applies the fog effect.
 */
function apply_fog()
{
    // Enable the fog and override its settings to allow us to change it.
    cheat.execute_command("fog_enable 1");
    cheat.execute_command("fog_override 1");
    
    // Change the fog's radius.
    cheat.execute_command("fog_start 1");
    cheat.execute_command("fog_end 100");

    // Change the fog's color.
    cheat.execute_command("fog_color 12 10 15");
    cheat.execute_command("fog_maxdensity 0.8");
}

// Apply the fog whenever we first execute the script.
apply_fog();

/**
 * Where the magic happens.
 * 
 * @callback Draw
 */
function on_paint()
{
    // Check if we're overriding the world settings.
    if (menu.get(override))
    {
        // If so, set our override switch to false since we only want to execute this once.
        menu.set(override, false);

        // Update the world settings.
        menu.set(ref_weather, 2);
        menu.set(ref_nightmode_amount, 0.15);
        menu.set(ref_skybox, 6);

        // And print something to chat just to indicate we did something.
        cheat.print_chat("[" + CHAT_COLOR.CYAN + "Weather" + CHAT_COLOR.WHITE + "] " + CHAT_COLOR.GRAY + "Your world settings have been successfully overwritten!");
    }

    // Get our local player.
    const me = entity.get_local_player();

    // If our local player isn't valid, then we're not in-game.
    // So, there's no need to do anything.
    if (!me)
        return;

    // Check if we're not alive.
    if (!entity.is_alive(me))
    {
        // If so, check if we're spectating someone.
        if (entity.get_prop(me, "CBasePlayer", "m_iObserverMode") < 3)
            return;
        
        // And, if so, override our local player to the player we're spectating.
        // This way, the soundscapes should work correctly even when we're spectating someone.
        me = entity.get_prop(me, "CBasePlayer", "m_hObserverTarget");
    }

    // Get some vectors..
    const origin = entity.get_render_origin(me);
    const destination = [origin[0], origin[1], origin[2] + 1028];

    // And use them to check if there's anything above us.
    const frac = trace.line(me, origin, destination)[1];

    // Play the soundscape.
    play_soundscape(frac);
}

/**
 * Disables the fog whenever the script is unloaded.
 * 
 * @callback Unload
 */
function on_shutdown()
{
    // Stop overriding the fog.
    cheat.execute_command("fog_override 0");
}

//endregion

//region callbacks

// Create our callbacks.
cheat.register_callback("shutdown", "on_shutdown");
cheat.register_callback("paint", "on_paint");

//endregion
