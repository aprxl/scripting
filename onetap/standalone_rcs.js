/**
*
* Title: Standalone RCS
* Author: april#0001
* Description: Automatically controls your recoil even while your aimbot isn't enabled.
*
*/

//region main

// Caches our old values
var old_condition = -1;
var old_angles = [0, 0, 0];
var old_index = -1;

// Caches our current weapon category
var condition = 0;

// Holds the IDs for each weapon in each category
const weapons = [
    [1, 2, 3, 4, 30, 32, 36, 61, 63, 64],
    [7, 8, 10, 13, 14, 16, 28, 39, 60],
    [9, 11, 38, 40],
    [17, 19, 23, 24, 26, 33, 34]
]

//endregion

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

//endregion

//region menu

// Creates our menu elements
const title = menu_c.label("Standalone RCS");
const current_condition = menu_c.call(UI.AddDropdown, "Current configuration", "rcs_cond", [["Default", "Pistol", "Rifle", "Sniper", "SMG"]]);
const rcs_x = [
    menu_c.call(UI.AddSliderInt, "Pitch control", "rcs_pitch_value[0]", [0, 100]),
    menu_c.call(UI.AddSliderInt, "Pitch control", "rcs_pitch_value[1]", [0, 100]),
    menu_c.call(UI.AddSliderInt, "Pitch control", "rcs_pitch_value[2]", [0, 100]),
    menu_c.call(UI.AddSliderInt, "Pitch control", "rcs_pitch_value[3]", [0, 100]),
    menu_c.call(UI.AddSliderInt, "Pitch control", "rcs_pitch_value[4]", [0, 100])
];
const rcs_y = [
    menu_c.call(UI.AddSliderInt, "Yaw control", "rcs_yaw_value[0]", [0, 100]),
    menu_c.call(UI.AddSliderInt, "Yaw control", "rcs_yaw_value[1]", [0, 100]),
    menu_c.call(UI.AddSliderInt, "Yaw control", "rcs_yaw_value[2]", [0, 100]),
    menu_c.call(UI.AddSliderInt, "Yaw control", "rcs_yaw_value[3]", [0, 100]),
    menu_c.call(UI.AddSliderInt, "Yaw control", "rcs_yaw_value[4]", [0, 100])
];
const shots = menu_c.call(UI.AddSliderInt, "After x shots fired", "rcs_aftershots", [0, 5]);

//endregion

//region function

/**
 * Clamps a value between two extremes
 *
 * @param v {number}
 * @param min {number}
 * @param max {number}
 * @return {number}
 */
const clamp = function(v, min, max)
{
    return Math.min(Math.max(v, min), max);
}

const table_contains = function(table, value)
{
    // Loops for each value inside the array
    for (var i in table) {
        // If the table's value matches our value, then return true
        if (value === table[i])
            return true;
    }

    // Otherwise, we didn't find anything so, return false
    return false;
}

/**
 * Normalizes a vector of angles
 *
 * @param  {array} angle
 * @return {array}
 */
function normalize_angles(angle)
{
    // Clamps our angles
    angle[0] = clamp(angle[0], -89, 89);
    angle[1] = clamp(angle[1], -180, 180);
    angle[2] = 0;

    // Return clamped angles
    return angle;
}


/**
 * Disables Onetap's RCS system to not cause any glitches
 */
function disable_rcs()
{
    // Disable Onetap's RCS
    UI.SetValue("Legit", "GENERAL", "Default config", "Recoil control", 0);
    UI.SetValue("Legit", "PISTOL", "Pistol config", "Recoil control", 0);
    UI.SetValue("Legit", "RIFLE", "Rifle config", "Recoil control", 0);
    UI.SetValue("Legit", "SNIPER", "Sniper config", "Recoil control", 0);
    UI.SetValue("Legit", "SMG", "SMG config", "Recoil control", 0);
}


/**
 * Updates the visibility of our menu elements
 */
function update_visibility()
{
    // Gets the current configuration
    const _cond = menu_c.get("rcs_cond");

    // If the configuration hasn't been switched then no need to update the visibility
    if (_cond === old_condition)
        return;

    // Otherwise, cache the current condition
    old_condition = _cond;

    // Loops between every condition
    for (var i = 0; i < 5; i++)
    {
        // Check if we should enable it or not
        const enabled = _cond === i;

        // Update the element's visibility
        menu_c.visibility("rcs_pitch_value[" + i + "]", enabled);
        menu_c.visibility("rcs_yaw_value[" + i + "]", enabled);
    }
}


/**
 * Updates the current condition
 */
function get_weapon()
{
    // Get our local player
    const player = Entity.GetLocalPlayer();

    // If our player ins't valid or if we're dead, return
    if (!player || !Entity.IsAlive(player))
        return;

    // Get the weapon's ID
    const weapon_id = Entity.GetProp(Entity.GetWeapon(player), "CBaseAttributableItem", "m_iItemDefinitionIndex") & 0xFFFF;

    // If we didn't switch between weapons, then no need to update
    if (weapon_id === old_index)
        return;

    // Otherwise, cache our current condition
    old_index = weapon_id;

    // Loops between our unique conditions
    for (var i = 0; i < weapons.length; i++)
    {
        // Checks if our weapon ID matches with any of the other IDs
        if (table_contains(weapons[i], weapon_id))
        {
            // If it does, then update our condition
            condition = i + 1;
            return;
        }
    }

    // Otherwise, return default condition
    condition = 0;

}

// Run these whenever the script is first loaded
update_visibility();
disable_rcs();

/**
 * Where the magic happens.
 *
 * @return {void}
 */
function main()
{
    // Execute functions
    get_weapon();
    update_visibility();

    // Gets the properties needed
    const player = Entity.GetLocalPlayer()

    const amounts = [
        menu_c.get("rcs_pitch_value[" + condition + "]") / 50,
        menu_c.get("rcs_yaw_value[" + condition + "]") / 50
    ];

    const shots = menu_c.get("rcs_aftershots");

    // If our player isn't valid or if we're dead
    if (!player || !Entity.IsAlive(player))
        return;

    // If both RCS values are off
    if (amounts[0] === 0 && amounts[1] === 0)
        return;

    // Get more properties
    var angles = Local.GetViewAngles();
    var punch = Entity.GetProp(player, "CBasePlayer", "m_aimPunchAngle");
    var fired = Entity.GetProp(player, "CCSPlayer", "m_iShotsFired");

    // If we haven't shot the minimum amount of bullets
    if (fired <= shots)
    {
        // Cache our angles anyways so our aim doesn't flick
        old_angles = punch;
        return;
    }

    // If there's no recoil to compensate
    if (punch[0] === 0 && punch[1] === 0)
        return;

    // Compensate angles
    angles[0] -= (punch[0] - old_angles[0]) * amounts[0];
    angles[1] -= (punch[1] - old_angles[1]) * amounts[1];

    // And then, normalize them
    angles = normalize_angles(angles);

    // Cache our final angle so we can do our next calculations based on it
    old_angles = punch;

    // Do recoil compensation
    UserCMD.SetAngles(angles);
}

//endregion

//region callbacks

// Callback our main function
Cheat.RegisterCallback("CreateMove", "main");

//endregion
