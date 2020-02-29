/*
*
* Title: Aimbot log
* Author: april#0001
* Description: A aimbot logging chart for advanced Onetap users.
*
*/

//region api

const global_print = Global.Print, global_print_chat = Global.PrintChat, global_print_color = Global.PrintColor, global_register_callback = Global.RegisterCallback, global_execute_command = Global.ExecuteCommand, global_frame_stage = Global.FrameStage, global_tickcount = Global.Tickcount, global_tickrate = Global.Tickrate, global_tick_interval = Global.TickInterval, global_curtime = Global.Curtime, global_realtime = Global.Realtime, global_frametime = Global.Frametime, global_latency = Global.Latency, global_get_view_angles = Global.GetViewAngles, global_set_view_angles = Global.SetViewAngles, global_get_map_name = Global.GetMapName, global_is_key_pressed = Global.IsKeyPressed, global_get_screen_size = Global.GetScreenSize, global_get_cursor_position = Global.GetCursorPosition, global_play_sound = Global.PlaySound, global_play_microphone = Global.PlayMicrophone, global_stop_microphone = Global.StopMicrophone, global_get_username = Global.GetUsername, global_set_clan_tag = Global.SetClanTag, globals_tickcount = Globals.Tickcount, globals_tickrate = Globals.Tickrate, globals_tick_interval = Globals.TickInterval, globals_curtime = Globals.Curtime, globals_realtime = Globals.Realtime, globals_frametime = Globals.Frametime, sound_play = Sound.Play, sound_play_microphone = Sound.PlayMicrophone, sound_stop_microphone = Sound.StopMicrophone, cheat_get_username = Cheat.GetUsername, cheat_register_callback = cheat_register_callback = new Proxy(Cheat.RegisterCallback, { apply: function(_, _, args) { switch(args[0]) { case 'paint': Cheat.RegisterCallback('Draw', args[1]); break; case 'create_move': Cheat.RegisterCallback('CreateMove', args[1]); break; case 'fsn': Cheat.RegisterCallback('FrameStageNotify', args[1]); break; default: Cheat.RegisterCallback(args[0], args[1]); break; } } }), cheat_execute_command = Cheat.ExecuteCommand, cheat_frame_stage = Cheat.FrameStage, cheat_print = Cheat.Print, cheat_print_chat = Cheat.PrintChat, cheat_print_color = Cheat.PrintColor, local_latency = Local.Latency, local_get_view_angles = Local.GetViewAngles, local_set_view_angles = Local.SetViewAngles, local_set_clan_tag = Local.SetClanTag, local_get_real_yaw = Local.GetRealYaw, local_get_fake_yaw = Local.GetFakeYaw, local_get_spread = Local.GetSpread, local_get_inaccuracy = Local.GetInaccuracy, world_get_map_name = World.GetMapName, world_get_server_string = World.GetServerString, input_get_cursor_position = Input.GetCursorPosition, input_is_key_pressed = Input.IsKeyPressed, render_string = Render.String, render_text_size = Render.TextSize, render_line = Render.Line, render_rect = Render.Rect, render_filled_rect = Render.FilledRect, render_gradient_rect = Render.GradientRect, render_circle = Render.Circle, render_filled_circle = Render.FilledCircle, render_polygon = Render.Polygon, render_world_to_screen = Render.WorldToScreen, render_add_font = Render.AddFont, render_find_font = Render.FindFont, render_string_custom = Render.StringCustom, render_textured_rect = Render.TexturedRect, render_add_texture = Render.AddTexture, render_text_size_custom = Render.TextSizeCustom, render_get_screen_size = Render.GetScreenSize, ui_get_value = UI.GetValue, ui_set_value = UI.SetValue, ui_add_checkbox = UI.AddCheckbox, ui_add_slider_int = UI.AddSliderInt, ui_add_slider_float = UI.AddSliderFloat, ui_add_hotkey = UI.AddHotkey, ui_add_label = UI.AddLabel, ui_add_dropdown = UI.AddDropdown, ui_add_multi_dropdown = UI.AddMultiDropdown, ui_add_color_picker = UI.AddColorPicker, ui_add_textbox = UI.AddTextbox, ui_set_enabled = UI.SetEnabled, ui_get_string = UI.GetString, ui_get_color = UI.GetColor, ui_set_color = UI.SetColor, ui_is_hotkey_active = UI.IsHotkeyActive, ui_toggle_hotkey = UI.ToggleHotkey, ui_is_menu_open = UI.IsMenuOpen, convar_get_int = Convar.GetInt, convar_set_int = Convar.SetInt, convar_get_float = Convar.GetFloat, convar_set_float = Convar.SetFloat, convar_get_string = Convar.GetString, convar_set_string = Convar.SetString, event_get_int = Event.GetInt, event_get_float = Event.GetFloat, event_get_string = Event.GetString, entity_get_entities = Entity.GetEntities, entity_get_entities_by_class_i_d = Entity.GetEntitiesByClassID, entity_get_players = Entity.GetPlayers, entity_get_enemies = Entity.GetEnemies, entity_get_teammates = Entity.GetTeammates, entity_get_local_player = Entity.GetLocalPlayer, entity_get_game_rules_proxy = Entity.GetGameRulesProxy, entity_get_entity_from_user_i_d = Entity.GetEntityFromUserID, entity_is_teammate = Entity.IsTeammate, entity_is_enemy = Entity.IsEnemy, entity_is_bot = Entity.IsBot, entity_is_local_player = Entity.IsLocalPlayer, entity_is_valid = Entity.IsValid, entity_is_alive = Entity.IsAlive, entity_is_dormant = Entity.IsDormant, entity_get_class_i_d = Entity.GetClassID, entity_get_class_name = Entity.GetClassName, entity_get_name = Entity.GetName, entity_get_weapon = Entity.GetWeapon, entity_get_weapons = Entity.GetWeapons, entity_get_render_origin = Entity.GetRenderOrigin, entity_get_prop = Entity.GetProp, entity_set_prop = Entity.SetProp, entity_get_hitbox_position = Entity.GetHitboxPosition, entity_get_eye_position = Entity.GetEyePosition, trace_line = Trace.Line, trace_bullet = Trace.Bullet, usercmd_set_movement = UserCMD.SetMovement, usercmd_get_movement = UserCMD.GetMovement, usercmd_set_angles = UserCMD.SetAngles, usercmd_force_jump = UserCMD.ForceJump, usercmd_force_crouch = UserCMD.ForceCrouch, antiaim_get_override = AntiAim.GetOverride, antiaim_set_override = AntiAim.SetOverride, antiaim_set_real_offset = AntiAim.SetRealOffset, antiaim_set_fake_offset = AntiAim.SetFakeOffset, antiaim_set_l_b_y_offset = AntiAim.SetLBYOffset, exploit_get_charge = Exploit.GetCharge, exploit_recharge = Exploit.Recharge, exploit_disable_recharge = Exploit.DisableRecharge, exploit_enable_recharge = Exploit.EnableRecharge, ragebot_override_minimum_damage = Ragebot.OverrideMinimumDamage, ragebot_override_hitchance = Ragebot.OverrideHitchance, ragebot_override_accuracy_boost = Ragebot.OverrideAccuracyBoost, ragebot_override_multipoint_scale = Ragebot.OverrideMultipointScale, ragebot_force_safety = Ragebot.ForceSafety;

//endregion

//region dependencies

/**
 * @title BetterUI
 * @version 1.0.2
 * @description A better UI system for Onetap
 */

var menu_elements_t = [];
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
}

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
menu.get = function(label)
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
menu.get_hotkey = function(label)
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
 * Gets the value of a menu element
 *
 * @param label {string}
 * @return {any}
 */
menu.get_color = function(label)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Returns the element's value
    return UI.GetColor("Misc", "JAVASCRIPT", "Script items", final_name);
}

/**
 * Sets the value of a menu element
 *
 * @param label {string}
 * @param value {any}
 */
menu.set = function(label, value)
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
menu.visibility = function(label, visible)
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
 * Returns the hitbox's name based on its ID.
 *
 * @param  {number} index
 * @return {string}
 */
function hitbox_name(index)
{
    // Create our string
    var hitboxName = "";

    // Switch between the hitboxes and find the corresponding name
    switch (index)
    {
        case 0:
            hitboxName = "head";
            break;
        case 1:
            hitboxName = "neck";
            break;
        case 2:
            hitboxName = "pelvis";
            break;
        case 3:
            hitboxName = "body";
            break;
        case 4:
            hitboxName = "thorax";
            break;
        case 5:
            hitboxName = "chest";
            break;
        case 6:
            hitboxName = "upper chest";
            break;
        case 7:
            hitboxName = "legs";
            break;
        case 8:
            hitboxName = "legs";
            break;
        case 9:
            hitboxName = "legs";
            break;
        case 10:
            hitboxName = "legs";
            break;
        case 11:
            hitboxName = "feet";
            break;
        case 12:
            hitboxName = "feet";
            break;
        case 13:
            hitboxName = "arms";
            break;
        case 14:
            hitboxName = "arms";
            break;
        case 15:
            hitboxName = "arms";
            break;
        case 16:
            hitboxName = "arms";
            break;
        case 17:
            hitboxName = "arms";
            break;
        case 18:
            hitboxName = "arms";
            break;
        default:
            hitboxName = "generic";
    }

    // Return the found name
    return hitboxName;
}


/**
 * Converts time into ticks.
 *
 * @param  {number} time
 * @return {number}
 */
function time_to_tick(time) {
    return Math.round(time / globals_tick_interval());
}

//endregion

//region main

// Our shot data
var shot_id = -1;
var hits = 0;
var acc = 100;

// Our aimbot data
var data = [ ];

// And, our choke data
var sim_time = [ ];
var choke = [ ];

//endregion

//region menu

// Create our main switch
const enabled = menu.call(ui_add_checkbox, "| Aimbot log chart", "log_enable", null);

// Add some optional elements
const accent = menu.call(ui_add_color_picker, "| Chart accent", "log_accent_clr", null);

// Add elements that handle the dragging
const pos_x = menu.call(ui_add_slider_int, "pos_x", "pos_x", [0, render_get_screen_size()[0]]);
const pos_y = menu.call(ui_add_slider_int, "pos_y", "pos_y", [0, render_get_screen_size()[1]]);

//endregion

//region functions


/**
 * Handles the window dragging.
 *
 * @return {void}
 */
function handle_dragging() {
    // Get properties
    const x = menu.get(pos_x), y = menu.get(pos_y);
    const w = 540, h = 200;

    // Get our cursor position
    const mouse_pos = input_get_cursor_position();

    // If we're not cliking MOUSE1, then we're not dragging.
    if (!input_is_key_pressed(1))
        return;

    // Checks whether or not our mouse is inside the window's perimeter.
    if (mouse_pos[0] >= x &&
        mouse_pos[0] <= x + w &&
        mouse_pos[1] >= y &&
        mouse_pos[1] <= y + h)
    {
        // Update window's position
        menu.set(pos_x, mouse_pos[0] - w / 2);
        menu.set(pos_y, mouse_pos[1] - 20);
    }
}


/**
 * Handles the menu visibility.
 *
 * @return {void}
 */
function handle_menu_visibility() {
    // Always hide the window position
    menu.visibility(pos_x, false);
    menu.visibility(pos_y, false);

    // Get properties
    const enable = menu.get(enabled);

    // Update the element's visibilty
    menu.visibility(accent, enable);
}

// Call this function whenever the script is loaded.
handle_menu_visibility();


/**
 * Renders our window
 *
 * @param  {number} x
 * @param  {number} y
 * @return {void}
 */
function render_container(x, y) {

    // Create our fonts
    const fonts = {
        title: render_add_font("Segoe UI", 12, 600),
        subtitle: render_add_font("Segoe UI", 10, 200),

        tab: render_add_font("Segoe UI", 6, 600),
        subtab: render_add_font("Segoe UI", 6, 600),
        default: render_add_font("Segoe UI", 8, 200)
    };

    // Get some properties
    const color = menu.get_color(accent);
    const alpha = 125 + Math.sin(Math.abs(-Math.PI + (globals_curtime()) % (Math.PI * 2))) * 50;

    // Handles the window dragging
    handle_dragging();

    // Render the box
    render_filled_rect(x, y, 540, 200, [250, 250, 250, 50]);
    render_filled_rect(x + 132, y + 10, 2, 180, color);

    // Render the title and welcome message
    render_string_custom(x + 10, y + 10, 0, "Aimbot log", color, fonts.title);
    render_string_custom(x + 10, y + 28, 0, "Welcome, " + cheat_get_username(), [250, 250, 250, 125], fonts.subtitle);

    // If we don't have any data to display, then render a warning.
    if (!data || data.length === 0) {
        render_string_custom(x + 160, y + 80, 0, "There's no info to display...", [250, 250, 250, alpha], fonts.title);
        render_string_custom(x + 160, y + 98, 0, "Let's play some games!", [250, 250, 250, 125], fonts.subtitle);
        return;
    }

    // Render our aimbot's accuracy
    render_string(x + 7, y + 143, 0, acc.toString(), [250, 250, 250, 250], 4);
    render_string_custom(x + 10, y + 175, 0, "ACCURACY", color, fonts.subtab);

    // Render our columns
    render_string_custom(x + 150, y + 10, 1, "ID", [250, 250, 250, 200], fonts.tab);
    render_string_custom(x + 175, y + 10, 1, "NAME", [250, 250, 250, 200], fonts.tab);
    render_string_custom(x + 345, y + 10, 1, "HITBOX", [250, 250, 250, 200], fonts.tab);
    render_string_custom(x + 390, y + 10, 1, "CHANCE", [250, 250, 250, 200], fonts.tab);
    render_string_custom(x + 435, y + 10, 1, "DAMAGE", [250, 250, 250, 200], fonts.tab);
    render_string_custom(x + 475, y + 10, 1, "CHOKE", [250, 250, 250, 200], fonts.tab);
    render_string_custom(x + 515, y + 10, 1, "EXPLOIT", [250, 250, 250, 200], fonts.tab);

    // Loops for each shot element
    for (var i = 0; i < data.length; i++) {
        // Get our propeties
        const aimbot_data = data[i];

        // Update where the data should be drawn
        if (aimbot_data.offset < 20)
            data[i].offset += 0.5;

        // And the alpha too so we get a nice fade in.
        if (aimbot_data.alpha < 255)
            data[i].alpha += 1.5;

        // Checks and changes the text's color if we're rendering old data.
        if (shot_id % 8 < i)
            color = [122, 122, 122, 200];

        // Render the data
        render_string_custom(x + 149, y + 25 + i * aimbot_data.offset, 1, aimbot_data.id.toString(), [238, 238, 238, aimbot_data.alpha], fonts.default);
        render_string_custom(x + 163, y + 25 + i * aimbot_data.offset, 0, aimbot_data.name, color, fonts.default);
        render_string_custom(x + 344, y + 25 + i * aimbot_data.offset, 1, aimbot_data.hitbox, [238, 238, 238, aimbot_data.alpha], fonts.default);
        render_string_custom(x + 389, y + 25 + i * aimbot_data.offset, 1, aimbot_data.chance.toString(), [238, 238, 238, aimbot_data.alpha], fonts.default);
        render_string_custom(x + 434, y + 25 + i * aimbot_data.offset, 1, aimbot_data.damage.toString(), [238, 238, 238, aimbot_data.alpha], fonts.default);
        render_string_custom(x + 474, y + 25 + i * aimbot_data.offset, 1, aimbot_data.choke.toString(), [238, 238, 238, aimbot_data.alpha], fonts.default);
        render_string_custom(x + 514, y + 25 + i * aimbot_data.offset, 1, aimbot_data.exploit > 0 ? "YES" : "NO", [238, 238, 238, aimbot_data.alpha], fonts.default);
    }
}


/**
 * Gathers our aimbot data whenever it fires at someone
 *
 * @return {void}
 */
function on_aimbot_fire() {

    // Checks if the script isn't enabled
    if (!menu.get(enabled))
        return;

    // Get our properties
    const target = event_get_int("target_index");
    const hitbox = hitbox_name(event_get_int("hitbox"));
    const chance = Math.floor(event_get_int("hitchance") + 0.5);
    const safety = event_get_int("safepoint");
    const exploit = event_get_int("exploit");

    // Increment a value to our shot_id since we fired a bullet.
    shot_id++;

    // Create our aimbot data element
    const aimbot_data_t = {
        id: shot_id,
        name: entity_get_name(target),
        hitbox: hitbox,
        chance: chance,
        damage: "MISS",
        exploit: exploit,
        choke: choke[target] || 0,

        offset: 0,
        alpha: 0
    };

    // Update the accuracy percentage
    acc = Math.round(hits / (shot_id + 1) * 100);

    // Return data
    data[shot_id % 8] = aimbot_data_t;
}


/**
 * Updates our hits whenever we hurt a player
 *
 * @return {void}
 */
function on_player_hurt() {

    // Checks if the script ins't enabled.
    if (!menu.get(enabled))
        return;

    // Get our properties
    const userid = entity_get_entity_from_user_i_d(event_get_int("userid"));
    const attacker = entity_get_entity_from_user_i_d(event_get_int("attacker"));
    const dmg = event_get_int("dmg_health");

    const local = entity_get_local_player();

    // If we're not the one who got hurt and we're the one that hurt, increment a value to our hit counter.
    if (userid !== local && attacker === local) {
        hits++;
        data[shot_id % 8].damage = dmg;
    }
}


/**
 * Gathers and updates our choke/fakelag data.
 *
 * @return {void}
 */
function on_net_update() {

    // Checks if the script ins't enabled.
    if (!menu.get(enabled))
        return;

    // Only do it on the 4th frame stage.
    if (cheat_frame_stage() !== 4)
        return;

    // Get our enemies
    const enemies = entity_get_enemies();

    // Loops for each enemy
    for (var i = 0; i < enemies.length; i++) {
        // Get our current entity
        const ent = enemies[i];

        // Get it's simulation properties
        const current_tick = time_to_tick(entity_get_prop(ent, "CBaseEntity", "m_flSimulationTime"));
        const last_tick = sim_time[ent];

        // Get the delta between the new and old simulation times.
        const delta = current_tick - last_tick;

        // If the delta is not huge and valid, then update this entity's choke data.
        if (delta > 0 && delta <= 64) {
            choke[ent] = delta - 1;
        }

        // Caches our current data for further calculations.
        sim_time[ent] = current_tick;
    };
}


/**
 * Where the magic happens.
 *
 * @return {void}
 */
function on_frame_render() {

    // Handles the menu visibility even if the script is disabled.
    handle_menu_visibility();

    // Don't render the window if the script isn't enabled.
    if (!menu.get(enabled))
        return;

    // Get our drawing position.
    const x = menu.get(pos_x), y = menu.get(pos_y);

    // Draw the window.
    render_container(x, y);
}

//endregion

//region callbacks

// Register our callbacks
cheat_register_callback('paint', 'on_frame_render');
cheat_register_callback('ragebot_fire', 'on_aimbot_fire');
cheat_register_callback('player_hurt', 'on_player_hurt');
cheat_register_callback('fsn', 'on_net_update');

//endregion
