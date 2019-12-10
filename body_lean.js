/**
 *
 * Title: Old body lean
 * Author: april#0001
 * Description: Recreates the body lean from V2
 *
*/

//region main

// Our main variables
var main = {
    condition: 0,
    last_condition: -1
};

//endregion

//region menu

// Creates our condition selector
const current_condition = UI.AddDropdown("Condition", ["Standing", "Moving", "Slow-walking", "Jumping"]);

// Create the rest of the elements
const normal = {
    0: UI.AddSliderInt("Standing body lean", 0, 100),
    1: UI.AddSliderInt("Moving body lean", 0, 100),
    2: UI.AddSliderInt("Slow-walking body lean", 0, 100),
    3: UI.AddSliderInt("Jumping body lean", 0, 100)
}

const inverted = {
    0: UI.AddSliderInt("Standing inverted body lean", 0, 100),
    1: UI.AddSliderInt("Moving inverted body lean", 0, 100),
    2: UI.AddSliderInt("Slow-walking inverted body lean", 0, 100),
    3: UI.AddSliderInt("Jumping inverted body lean", 0, 100)
}

// Group our condition's names to make our lives easier
const conditions = {
    0: "Standing",
    1: "Moving",
    2: "Slow-walking",
    3: "Jumping"
}

//endregion

//region functions

//region utilities

/**
 * Gets the horizontal velocity of a player entity
 *
 * @param player
 * @returns {number}
 */
const velocity = function(player) {
    const vel = Entity.GetProp(player, "CBasePlayer", "m_vecVelocity[0]")
    return (
        Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1])
    )
}

/**
 * Checks if a player entity is jumping
 *
 * @param player
 * @returns {*}
 */
const is_jumping = function(player) {
    return (
        // s/o @leed
        Entity.GetProp(player, "CBasePlayer", "m_hGroundEntity")
    )
}

//endregion

/**
 * Updates the visibility of our menu elements
 */
function update_visibility()
{
    // Get our selected condition
    const _cond = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Condition");

    // If we didn't change between conditions, then no need to update our menu
    if (_cond === main.last_condition)
        return;

    // Otherwise, cache our current condition to do the check later on
    main.last_condition = _cond;

    // Loop between every condition
    for (i = 0; i < 4; i++)
    {
        // Get our properties
        const normal_label = conditions[i] + " body lean";
        const inverted_label = conditions[i] + " inverted body lean";
        const enabled = i === _cond;

        // Update menu elements
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", normal_label, enabled);
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", inverted_label, enabled);
    }
}

// Update the visibility whenever the script is first loaded.
update_visibility();

/**
 * Updates the condition of our player
 */
function update_condition()
{
    const player = Entity.GetLocalPlayer();

    if (!player || !Entity.IsAlive(player))
    {
        main.condition = 0;
        return
    }

    const slowwalk = UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk");

    if (is_jumping(player)) {
        main.condition = 3;
        return;
    }

    if (slowwalk) {
        main.condition = 2;
        return;
    }

    if (velocity(player) > 2) {
        main.condition = 1;
        return;
    }

    main.condition = 0;
}

/**
 * Do the anti-aim calculations and updates
 */
function do_anti_aim()
{
    // Callback our functions
    update_condition();
    update_visibility();

    // Get our current lean values
    const leans = {
        normal: UI.GetValue("Misc", "JAVASCRIPT", "Script items", conditions[main.condition] + " body lean"),
        inv: UI.GetValue("Misc", "JAVASCRIPT", "Script items", conditions[main.condition] + " inverted body lean")
    };

    // Switch between inverted and normal lean
    const yaw = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") ? leans.inv : leans.normal;

    // Update our anti-aim
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset",
        59 - (yaw * 0.59)
    );
}

//endregion

//region callbacks

// Callback our main function
Cheat.RegisterCallback("CreateMove", "do_anti_aim");

//endregion
