// shit for italian

//region api
const global = [], globals = [], sound = [], cheat = [], local = [], world = [], input = [], render = [], ui = [], convar = [], event = [], entity = [], trace = [], usercmd = [], antiaim = [], exploit = [], ragebot = [], material = [], __filename = [], f = [], f2 = [], already_parsed = [], format = [], g = [], keys = [], k = []; global.print = Global.Print, global.print_chat = Global.PrintChat, global.print_color = Global.PrintColor, global.register_callback = Global.RegisterCallback, global.execute_command = Global.ExecuteCommand, global.frame_stage = Global.FrameStage, global.tickcount = Global.Tickcount, global.tickrate = Global.Tickrate, global.tick_interval = Global.TickInterval, global.curtime = Global.Curtime, global.realtime = Global.Realtime, global.frametime = Global.Frametime, global.latency = Global.Latency, global.get_view_angles = Global.GetViewAngles, global.set_view_angles = Global.SetViewAngles, global.get_map_name = Global.GetMapName, global.is_key_pressed = Global.IsKeyPressed, global.get_screen_size = Global.GetScreenSize, global.get_cursor_position = Global.GetCursorPosition, global.play_sound = Global.PlaySound, global.play_microphone = Global.PlayMicrophone, global.stop_microphone = Global.StopMicrophone, global.get_username = Global.GetUsername, global.set_clan_tag = Global.SetClanTag, globals.tickcount = Globals.Tickcount, globals.tickrate = Globals.Tickrate, globals.tick_interval = Globals.TickInterval, globals.curtime = Globals.Curtime, globals.realtime = Globals.Realtime, globals.frametime = Globals.Frametime, sound.play = Sound.Play, sound.play_microphone = Sound.PlayMicrophone, sound.stop_microphone = Sound.StopMicrophone, cheat.get_username = Cheat.GetUsername, cheat.register_callback = function(c, f) { switch (c) { case 'create_move': Cheat.RegisterCallback("CreateMove", f); break; case 'paint': Cheat.RegisterCallback("Draw", f); break; case 'fsn': Cheat.RegisterCallback("FrameStageNotify", f); break; case 'shutdown': Cheat.RegisterCallback("Unload", f); break; default: Cheat.RegisterCallback(c, f); break; } }, cheat.execute_command = Cheat.ExecuteCommand, cheat.frame_stage = Cheat.FrameStage, cheat.print = Cheat.Print, cheat.print_chat = Cheat.PrintChat, cheat.print_color = Cheat.PrintColor, local.latency = Local.Latency, local.get_view_angles = Local.GetViewAngles, local.set_view_angles = Local.SetViewAngles, local.set_clan_tag = Local.SetClanTag, local.get_real_yaw = Local.GetRealYaw, local.get_fake_yaw = Local.GetFakeYaw, local.get_spread = Local.GetSpread, local.get_inaccuracy = Local.GetInaccuracy, world.get_map_name = World.GetMapName, world.get_server_string = World.GetServerString, input.get_cursor_position = Input.GetCursorPosition, input.is_key_pressed = Input.IsKeyPressed, render.string = Render.String, render.text_size = Render.TextSize, render.line = Render.Line, render.rect = Render.Rect, render.filled_rect = Render.FilledRect, render.gradient_rect = Render.GradientRect, render.circle = Render.Circle, render.filled_circle = Render.FilledCircle, render.polygon = Render.Polygon, render.world_to_screen = Render.WorldToScreen, render.add_font = Render.AddFont, render.find_font = Render.FindFont, render.string_custom = Render.StringCustom, render.textured_rect = Render.TexturedRect, render.add_texture = Render.AddTexture, render.text_size_custom = Render.TextSizeCustom, render.get_screen_size = Render.GetScreenSize, ui.get_value = UI.GetValue, ui.set_value = UI.SetValue, ui.add_checkbox = UI.AddCheckbox, ui.add_slider_int = UI.AddSliderInt, ui.add_slider_float = UI.AddSliderFloat, ui.add_hotkey = UI.AddHotkey, ui.add_label = UI.AddLabel, ui.add_dropdown = UI.AddDropdown, ui.add_multi_dropdown = UI.AddMultiDropdown, ui.add_color_picker = UI.AddColorPicker, ui.add_textbox = UI.AddTextbox, ui.set_enabled = UI.SetEnabled, ui.get_string = UI.GetString, ui.get_color = UI.GetColor, ui.set_color = UI.SetColor, ui.is_hotkey_active = UI.IsHotkeyActive, ui.toggle_hotkey = UI.ToggleHotkey, ui.is_menu_open = UI.IsMenuOpen, convar.get_int = Convar.GetInt, convar.set_int = Convar.SetInt, convar.get_float = Convar.GetFloat, convar.set_float = Convar.SetFloat, convar.get_string = Convar.GetString, convar.set_string = Convar.SetString, event.get_int = Event.GetInt, event.get_float = Event.GetFloat, event.get_string = Event.GetString, entity.get_entities = Entity.GetEntities, entity.get_entities_by_class_i_d = Entity.GetEntitiesByClassID, entity.get_players = Entity.GetPlayers, entity.get_enemies = Entity.GetEnemies, entity.get_teammates = Entity.GetTeammates, entity.get_local_player = Entity.GetLocalPlayer, entity.get_game_rules_proxy = Entity.GetGameRulesProxy, entity.get_entity_from_user_i_d = Entity.GetEntityFromUserID, entity.is_teammate = Entity.IsTeammate, entity.is_enemy = Entity.IsEnemy, entity.is_bot = Entity.IsBot, entity.is_local_player = Entity.IsLocalPlayer, entity.is_valid = Entity.IsValid, entity.is_alive = Entity.IsAlive, entity.is_dormant = Entity.IsDormant, entity.get_class_i_d = Entity.GetClassID, entity.get_class_name = Entity.GetClassName, entity.get_name = Entity.GetName, entity.get_weapon = Entity.GetWeapon, entity.get_weapons = Entity.GetWeapons, entity.get_render_origin = Entity.GetRenderOrigin, entity.get_render_box = Entity.GetRenderBox, entity.get_prop = Entity.GetProp, entity.set_prop = Entity.SetProp, entity.get_hitbox_position = Entity.GetHitboxPosition, entity.get_eye_position = Entity.GetEyePosition, trace.line = Trace.Line, trace.bullet = Trace.Bullet, usercmd.set_movement = UserCMD.SetMovement, usercmd.get_movement = UserCMD.GetMovement, usercmd.set_angles = UserCMD.SetAngles, usercmd.force_jump = UserCMD.ForceJump, usercmd.force_crouch = UserCMD.ForceCrouch, antiaim.get_override = AntiAim.GetOverride, antiaim.set_override = AntiAim.SetOverride, antiaim.set_real_offset = AntiAim.SetRealOffset, antiaim.set_fake_offset = AntiAim.SetFakeOffset, antiaim.set_l_b_y_offset = AntiAim.SetLBYOffset, exploit.get_charge = Exploit.GetCharge, exploit.recharge = Exploit.Recharge, exploit.disable_recharge = Exploit.DisableRecharge, exploit.enable_recharge = Exploit.EnableRecharge, ragebot.get_target = Ragebot.GetTarget, ragebot.ignore_target = Ragebot.IgnoreTarget, ragebot.force_target = Ragebot.ForceTarget, ragebot.force_target_safety = Ragebot.ForceTargetSafety, ragebot.force_target_hitchance = Ragebot.ForceTargetHitchance, ragebot.force_target_minimum_damage = Ragebot.ForceTargetMinimumDamage, ragebot.force_hitbox_safety = Ragebot.ForceHitboxSafety, material.create = Material.Create, material.destroy = Material.Destroy, material.get = Material.Get, material.set_key_value = Material.SetKeyValue, material.refresh = Material.Refresh
//endregion



//region dependencies

/**
 * @title BetterUI
 * @version 2.0.1
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

/**
 * @title Vector
 * @description Simple 3d vector system
 *
 * @typedef Vector {x: number, y: number, z: number}
 */
var vector = {};

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
 * Checks whether or not a value is contained inside an array
 * 
 * @param {Array} array 
 * @param {any} value 
 * @returns {Boolean}
 */
function contains(array, value)
{
    for (var k in array)
    {
        var v = array[k];
        if (k === value || v === value)
            return true;
    }

    return false;
}

//endregion

//region locals

// Maps our weapon IDs into each configuration
const ids = [
    [2, 3, 4, 30, 32, 36, 61, 63],
    [1, 64],
    [40],
    [9],
    [11, 38]
];

// Maps our configuration names
const weapons = [
    "General",
    "Pistol",
    "Heavy Pistol",
    "Scout",
    "AWP",
    "Autosniper"
];

//endregion

//region menu

// Create our menu
const config = menu.call(ui.add_dropdown, "Current configuration", "italy_config", [weapons]);
const options = [

    // General configuration
    {
        dmg: menu.call(ui.add_slider_int, "Minimum damage (visible)", "italy_general_dmg", [0, 130]),
        dmg_override: menu.call(ui.add_slider_int, "Minimum damage (on key)", "italy_general_dmg_override", [0, 130]),
        dmg_autowall: menu.call(ui.add_slider_int, "Minimum damage (auto wall)", "italy_general_dmg_autowall", [0, 130])
    },

    // Pistol configuration
    {
        dmg: menu.call(ui.add_slider_int, "Minimum damage (visible)", "italy_pistol_dmg", [0, 130]),
        dmg_override: menu.call(ui.add_slider_int, "Minimum damage (on key)", "italy_pistol_dmg_override", [0, 130]),
        dmg_autowall: menu.call(ui.add_slider_int, "Minimum damage (auto wall)", "italy_pistol_dmg_autowall", [0, 130])
    },

    // Heavy pistol configuration
    {
        dmg: menu.call(ui.add_slider_int, "Minimum damage (visible)", "italy_hpistol_dmg", [0, 130]),
        dmg_override: menu.call(ui.add_slider_int, "Minimum damage (on key)", "italy_hpistol_dmg_override", [0, 130]),
        dmg_autowall: menu.call(ui.add_slider_int, "Minimum damage (auto wall)", "italy_hpistol_dmg_autowall", [0, 130])
    },

    // Scout configuration
    {
        dmg: menu.call(ui.add_slider_int, "Minimum damage (visible)", "italy_scout_dmg", [0, 130]),
        dmg_override: menu.call(ui.add_slider_int, "Minimum damage (on key)", "italy_scout_dmg_override", [0, 130]),
        dmg_autowall: menu.call(ui.add_slider_int, "Minimum damage (auto wall)", "italy_scout_dmg_autowall", [0, 130])
    },

    // AWP configuration
    {
        dmg: menu.call(ui.add_slider_int, "Minimum damage (visible)", "italy_awp_dmg", [0, 130]),
        dmg_override: menu.call(ui.add_slider_int, "Minimum damage (on key)", "italy_awp_dmg_override", [0, 130]),
        dmg_autowall: menu.call(ui.add_slider_int, "Minimum damage (auto wall)", "italy_awp_dmg_autowall", [0, 130])
    },

    // Autosniper configuration
    {
        dmg: menu.call(ui.add_slider_int, "Minimum damage (visible)", "italy_auto_dmg", [0, 130]),
        dmg_override: menu.call(ui.add_slider_int, "Minimum damage (on key)", "italy_auto_dmg_override", [0, 130]),
        dmg_autowall: menu.call(ui.add_slider_int, "Minimum damage (auto wall)", "italy_auto_dmg_autowall", [0, 130])
    }
];

const override_key = menu.call(ui.add_hotkey, "Damage override", "italy_override", []);
const show_dmg = menu.call(ui.add_checkbox, "Show minimum damage", "italy_indicator", []);

//endregion

//region function

/**
 * @class target
 * @brief Handles the targeting system
 */
var target = {};

/**
 * Returns the entity ID of the closest player to your crosshair.
 * 
 * @returns {Number|null}
 */
target.get_closest = function( ) 
{
    // Get our entities.
    const players = entity.get_enemies();
    const me = entity.get_local_player();

    // Initialize our data struct.
    const data = {id: null, fov: 180};

    // Get our player's eye position and view angles to make the FOV calculations
    const origin = vector.new(entity.get_eye_position(me));
    const angles = vector.new(local.get_view_angles( ));

    // Loop for each enemy.
    for (var i = 0; i < players.length; i++) {
        // Get our current enemy
        const e = players[i];

        // Get the target's position
        const destination = vector.new(entity.get_hitbox_position(e, 0));
        
        // Calculate the FOV.
        const fov = vector.fov_to(origin, destination, angles);

        // If our FOV is lower than the cached one, then this player is closer to our crosshair than the last one.
        if (fov < data.fov) {
            // Cache its data.
            data.id = e;
            data.fov = fov;
        }
    }

    // Return the best target.
    return data.id;
}

/**
 * @class config_system
 * @brief Handles the configuration updates and the menu visibility.
 */
var config_system = {
    current_config_id: 0,
    last_weapon: 0,

    override: false
};

/**
 * Handles the menu visibility.
 */
config_system.handle_visibility = function()
{
    // Loop for each configuration we have.
    for (var i = 0; i < options.length; i++)
    {
        // Check if this configuration is the selected one.
        // Doing this because we only want to display the selected configuration's elements.
        const draw = i === menu.get(config);

        // Loop for each menu element our current configuration has.
        for (var j in options[i])
        {
            // Update the visibility.
            menu.visibility(options[i][j], draw);
        }
    }
}

// Update the menu visibility every time the script is loaded.
config_system.handle_visibility( );

/**
 * Updates the current configuration
 */
config_system.update = function( )
{
    // Get our local player.
    const me = entity.get_local_player( );

    // If our local player isn't valid or if we're dead then there's no need to update anything.
    if (!me || !entity.is_alive(me))
        return;

    // Get our active weapon entity handle and then get its item ID.
    // More about item IDs here: https://tf2b.com/itemlist.php?gid=730.
    const weapon_hndl = entity.get_prop(me, "CBasePlayer", "m_hActiveWeapon");
    const weapon_id = entity.get_prop(weapon_hndl, "CBaseAttributableItem", "m_iItemDefinitionIndex") & 0xFFFF;

    // If our active weapon item ID is the same as the cached one then we didn't switch weapons.
    // So there's no need to update the current configuration.
    if (weapon_id === this.last_weapon)
        return;

    // Cache our active weapon item ID for further checks.
    this.last_weapon = weapon_id;

    // Loop through every item ID array inside our IDs map.
    for (var i = 0; i < ids.length; i++)
    {
        // Check if the current item ID array contains our active weapon ID.
        if (contains(ids[i], weapon_id))
        {
            // If so, then our active weapon is part of this configuration group, so update our current configuration index.
            // Doing the '+ 1' because the "GENERAL" configuration isn't mapped.
            this.current_config_id = i + 1;
            return;
        }
    }

    // If our IDs map doesn't contain our current item ID then it means that this weapon does not belong to any configuration.
    // So this weapon belongs to the GENERAL configuration.
    this.current_config_id = 0;
}

/**
 * @class damage_system
 * @brief Handles the updates of the minimum damage.
 */
var damage_system = {};

/**
 * Updates the cheat's minimum damage.
 * 
 * @param {Number} target
 */
damage_system.update = function(target)
{
    // Get our local player.
    const me = entity.get_local_player( );

    // If our local player doesn't exist or if we're not alive then there's no need to update the minimum damage.
    if (!me || !entity.is_alive(me))
        return;

    // Get our current configuration and minimum damage reference.
    const current_config = options[config_system.current_config_id];
    const ref = menu.reference(["Rage", weapons[config_system.current_config_id].toUpperCase( ), "Targeting", "Minimum damage"])
    
    // Check if we were overriding our minimum damage.
    if (config_system.override)
    {
        // If so, revert our minimum damage.
        menu.set(ref, menu.get(current_config.dmg));
        config_system.override = false;
    }
        
    // If our target doesn't exist or if the target isn't alive then there's no need to update the minimum damage.
    if (!target || !entity.is_alive(target))
        return;

    // Check if we are pressing the override key.
    if (menu.get_hotkey(override_key))
    {
        // If so, update our minimum damage.
        config_system.override = true;
        menu.set(ref, menu.get(current_config.dmg_override))
        return;
    }

    // Get our local player's eye position so we can do the tracings later.
    const origin = entity.get_eye_position(me);
    
    // Loops for every hitbox except limbs.
    for (var i = 0; i < 7; i++)
    {
        // Get our current hitbox's position.
        const hitbox = entity.get_hitbox_position(target, 0);

        // Trace a line from our eye position to the hitbox position in order to see if it is visible.
        const trace = Trace.Line(me, origin, hitbox);

        // Check if the trace didn't hit an entity or if the trace's length is lower than 0.87
        if (!trace[0] || trace[1] < 0.87)
        {
            // If so, our target is not visible so update the minimum damage.
            // Returning after because we don't need to further check for visibility.
            config_system.override = true;
            menu.set(ref, menu.get(current_config.dmg_autowall))
            return;
        }
    }
}

/**
 * @callback Draw
 * @brief Callbacks the configuration system updates and the indicator rendering.
 */
function on_paint( )
{
    // Handle the menu visibility.
    config_system.handle_visibility( );
    
    // Return if our indicator is not enabled.
    if (!menu.get(show_dmg))
        return;
    
    // Get our drawing properties.
    const ref = menu.reference(["Rage", weapons[config_system.current_config_id].toUpperCase( ), "Targeting", "Minimum damage"])
    const y = render.get_screen_size( )[1];

    // Render the minimum damage indicator.
    Render.String(15, y - 125, 0, (menu.get(ref)).toString(), [255, 255, 255, 200], 4);
}

/**
 * @callback CreateMove
 * @brief Handles the menu visibility and the damage system updates.
 */
function on_create_move( )
{
    // Update our configuration.
    config_system.update( );
    
    // Update our minimum damage settings.
    damage_system.update(target.get_closest( ));
}

//endregion

//region callbacks

// Register our callbacks
cheat.register_callback("Draw", "on_paint");
cheat.register_callback("CreateMove", "on_create_move");

//endregion
