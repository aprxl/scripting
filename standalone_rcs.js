/**
*
* Title: Standalone RCS
* Author: april#0001
* Description: Automatically controls your recoil even while your aimbot isn't enabled.
*
*/

//region main

// Caches our old punch angles
var old_angles = [0, 0, 0];

//endregion

//region menu

// Creates our menu elements
const title = UI.AddLabel("Standalone RCS");
const rcs_x = UI.AddSliderInt("Pitch control", 0, 100, 50);
const rcs_y = UI.AddSliderInt("Yaw control", 0, 100, 65);
const shots = UI.AddSliderInt("Start after x shots", 0, 5);

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

/**
 * Normalizes a vector of angles
 *
 * @param  {array} angle
 * @return {array}
 */
function normalize_angles(angle)
{
    angle[0] = clamp(angle[0], -89, 89);
    angle[1] = clamp(angle[1], -180, 180);
    angle[2] = 0;

    return angle;
}

/**
 * Where the magic happens.
 *
 * @return {void}
 */
function main()
{
    // Gets the properties needed
    const player = Entity.GetLocalPlayer()

    const amounts = [
        UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Pitch control") / 50,
        UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Yaw control") / 50
    ];

    const shots = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Start after x shots");

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
