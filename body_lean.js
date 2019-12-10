/**
 *
 * Title: Old body lean
 * Author: april#0001
 * Description: Recreates the body lean from V2
 *
*/

//region main

var main = {
    condition: 0,
    last_condition: -1
};

//endregion

//region menu

const current_condition = UI.AddDropdown("Condition", ["Standing", "Moving", "Slow-walking", "Jumping"]);

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

const conditions = {
    0: "Standing",
    1: "Moving",
    2: "Slow-walking",
    3: "Jumping"
}

//endregion

//region functions

//region utilities

const velocity = function(player) {
    const vel = Entity.GetProp(player, "CBasePlayer", "m_vecVelocity[0]")
    return (
        Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1])
    )
}

const is_jumping = function(player) {
    return (
        // s/o @leed
        Entity.GetProp(player, "CBasePlayer", "m_hGroundEntity")
    )
}

//endregion

function update_visibility()
{
    const _cond = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Condition");

    if (_cond === main.last_condition)
        return;

    main.last_condition = _cond;

    for (i = 0; i < 4; i++)
    {
        const normal_label = conditions[i] + " body lean";
        const inverted_label = conditions[i] + " inverted body lean";
        const enabled = i === _cond;

        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", normal_label, enabled);
        UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", inverted_label, enabled);
    }
}

update_visibility();

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



function do_anti_aim()
{
    update_condition();
    update_visibility();

    Render.String(960, 540, 0, main.condition.toString(), [255, 255, 255, 255], 3)

    const leans = {
        normal: UI.GetValue("Misc", "JAVASCRIPT", "Script items", conditions[main.condition] + " body lean"),
        inv: UI.GetValue("Misc", "JAVASCRIPT", "Script items", conditions[main.condition] + " inverted body lean")
    };

    const yaw = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter") ? leans.inv : leans.normal;

    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset",
        59 - (yaw * 0.59)
    );
}

//endregion

//region callbacks

Cheat.RegisterCallback("Draw", "do_anti_aim");

//endregion
