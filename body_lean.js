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
    last_condition: -1,

    jittering: false
};

//endregion

//region menu

// :eyes:
//const indicator = UI.AddCheckbox("Desync length indicator");

// Creates our condition selector
const current_condition = UI.AddDropdown("Condition", ["Standing", "Moving", "Slow-walking", "Jumping"]);

// Create the rest of the elements
const normal = {
    0: UI.AddSliderInt("Standing body lean", 0, 150),
    1: UI.AddSliderInt("Moving body lean", 0, 150),
    2: UI.AddSliderInt("Slow-walking body lean", 0, 150),
    3: UI.AddSliderInt("Jumping body lean", 0, 150)
};

const inverted = {
    0: UI.AddSliderInt("Standing inverted body lean", 0, 150),
    1: UI.AddSliderInt("Moving inverted body lean", 0, 150),
    2: UI.AddSliderInt("Slow-walking inverted body lean", 0, 150),
    3: UI.AddSliderInt("Jumping inverted body lean", 0, 150)
};

const jitter_type = {
    0: UI.AddDropdown("Standing jitter mode", ["Offset", "Circular", "Random"]),
    1: UI.AddDropdown("Moving jitter mode", ["Offset", "Circular", "Random"]),
    2: UI.AddDropdown("Slow-walking jitter mode", ["Offset", "Circular", "Random"]),
    3: UI.AddDropdown("Jumping jitter mode", ["Offset", "Circular", "Random"])
};

const jitter_ranges = {
    0: UI.AddSliderInt("Standing jitter range", 0, 58),
    1: UI.AddSliderInt("Moving jitter range", 0, 58),
    2: UI.AddSliderInt("Slow-walking jitter range", 0, 58),
    3: UI.AddSliderInt("Jumping jitter range", 0, 58)
};

// Group our condition's names to make our lives easier
const conditions = {
    0: "Standing",
    1: "Moving",
    2: "Slow-walking",
    3: "Jumping"
};

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
    const vel = Entity.GetProp(player, "CBasePlayer", "m_vecVelocity[0]");
    return (
        Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1])
    )
};

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
};

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
        const jitter_cond_label = conditions[i] + " jitter mode";
        const jitter_val_label = conditions[i] + " jitter range";
        const enabled = i === _cond;

        // Update menu elements
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", normal_label, enabled);
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", inverted_label, enabled);
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", jitter_cond_label, enabled);
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", jitter_val_label, enabled);
    }
}

// Update the visibility whenever the script is first loaded.
update_visibility();

/**
 * Updates the condition of our player
 */
function update_condition()
{
    // Gets the local player
    const player = Entity.GetLocalPlayer();

    // If our local player is invalid or isn't alive, then reset.
    if (!player || !Entity.IsAlive(player))
    {
        main.condition = 0;
        return;
    }

    // Get slow-walk state
    const slowwalk = UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk");

    // If it's jumping, then return "Jumping"
    if (is_jumping(player)) {main.condition = 3; return;} else {

        // Otherwise, check for player's velocity
        if (velocity(player) > 2) {
            // If we're moving and pressing the slow-walk key, then return "Slow-walking"
            if (slowwalk) {
                main.condition = 2;
                return;
            }

            //Otherwise, return "Moving"
            main.condition = 1;
            return;
        }

    }

    // If we're on the ground and not moving, then return "Standing"
    main.condition = 0;
}

function get_jitter_values()
{
    // Gets the local player
    const player = Entity.GetLocalPlayer();

    // If our local player is invalid or isn't alive, then return 0.
    if (!player || !Entity.IsAlive(player))
    {
        return 0;
    }

    // Get our current jitter info
    const _mode = UI.GetValue("Misc", "JAVASCRIPT", "Script items", conditions[main.condition] + " jitter mode");
    const _range = UI.GetValue("Misc", "JAVASCRIPT", "Script items", conditions[main.condition] + " jitter range");

    // If our range is 0, then no need to jitter.
    if (_range === 0) {
        return 0;
    }

    // Offset
    if (_mode === 0) {
        main.jittering = !main.jittering;
        return main.jittering ? _range : 0;
    }

    // Circular
    if (_mode === 1) {
        return (Globals.Tickcount() / 2) % _range;
    }

    // Random
    if (_mode === 2) {
        return Math.random() * _range;
    }
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
    const jitter_offset = get_jitter_values();

    // Update our anti-aim
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset",
        59 - (yaw * 0.59) + jitter_offset
    );
}

//endregion

//region callbacks

// Callback our main function
Cheat.RegisterCallback("CreateMove", "do_anti_aim");

//endregion
