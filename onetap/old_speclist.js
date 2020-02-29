/**
 *
 * Title: Old spectators list
 * Author: april#0001
 * Description: Recreates the V1's spectators list
 *
*/

//region menu

// Backups our positions
const window_x = UI.AddSliderInt("window_x", 0, Global.GetScreenSize()[0])
const window_y = UI.AddSliderInt("window_y", 0, Global.GetScreenSize()[1])

//endregion

//region functions

/**
 * Updates the visibility of our menu elements
 */
function update_menu()
{
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "window_x", false)
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "window_y", false)
}

// Update it whenever the script is activated.
update_menu();

/**
 * Gets the names of the players spectating you
 *
 * @returns {[]}
 */
function get_spectators()
{
    var specs = [];
    const players = Entity.GetPlayers();

    for (i = 0; i < players.length; i++)
    {
        const cur = players[i];

        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")

            if (obs === Entity.GetLocalPlayer())
            {
                const name = Entity.GetName(cur);
                specs.push(name);
            }
        }
    }

    return specs;
}

/**
 * Checks if a point is inside a perimeter
 *
 * @param vec
 * @param x
 * @param y
 * @param x2
 * @param y2
 * @returns {boolean}
 */
function in_bounds(vec, x, y, x2, y2)
{
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

/**
 * Where the magic happens
 */
function main()
{
    // Get our drawing properties
    const names = get_spectators();
    const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "window_x"),
            y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "window_y");

    // Rainbow color for our bar
    const rainbow = [
        Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
        255
    ];

    // Draw the spectators list
    Render.Rect(x - 1, y - 1, 202, 61 + 15 * (names.length - 1), [2, 2, 2, 100]);
    Render.FilledRect(x, y, 200, 60 + 15 * (names.length - 1), [55, 55, 55, 200]);
    Render.Rect(x + 5, y + 5, 190, 50 + 15 * (names.length - 1), [2, 2, 2, 100]);
    Render.FilledRect(x + 5, y + 5, 190, 50 + 15 * (names.length - 1), [25, 25, 25, 200]);
    Render.FilledRect(x + 9, y + 25, 181, 3, rainbow);
    Render.String(x + 100, y + 10, 1, "spectators (" + names.length + ")", [200, 200, 200, 200], 3);

    // For each player who's spectating us, draw their names
    for (i = 0; i < names.length; i++)
    {
        Render.String(x + 100, y + 35 + 15 * i, 1, names[i], [200, 200, 200, 200], 3);
    }

    // Handles the drag function
    if (Global.IsKeyPressed(1)) {
        // Getting our mouse pos
        const mouse_pos = Global.GetCursorPosition();

        // Check if we're clicking and if we're in bounds of the drag area
        if (in_bounds(mouse_pos, x, y, x + 200, y + 30)) {

            // Update values (not the most efficient way to do it but wtvr)
            UI.SetValue("Misc", "JAVASCRIPT", "Script items", "window_x", mouse_pos[0] - 100);
            UI.SetValue("Misc", "JAVASCRIPT", "Script items", "window_y", mouse_pos[1] - 20);
        }
    }

}
//endregion

//region callbacks

// Callback our main function
Global.RegisterCallback("Draw", "main")

//endregion

