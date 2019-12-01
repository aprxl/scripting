/**
 *
 * Title: Performance graph
 * Author: april#0001
 * Description: Draws a graph showcasing your performance
 *
*/

//region main

// Creates our main variables
var fps_info = [];
var ping_info = [];

var last_time = Global.Curtime();

//endregion

//region menu

// Backups our window position
const window_x = UI.AddSliderInt("performance_window_x", 0, Global.GetScreenSize()[0]);
const window_y = UI.AddSliderInt("performance_window_y", 0, Global.GetScreenSize()[1]);

//endregion

//region functions

/**
 * Converts a hexadecimal value into ASCII
 *
 * @param str1
 * @returns {string}
 */
function hex_to_ascii(str1)
{
    var hex  = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

/**
 * Handles the visibility of our menu elements
 */
function handle_visibility()
{
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "performance_window_x", false);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "performance_window_y", false);
}

// Updates the visibility whenever the script is loaded
handle_visibility();

/**
 * Gets the value of a script menu element
 *
 * @param element
 * @returns {*}
 */
function get(element)
{
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", element);
}

/**
 * Sets the value of a script menu element
 *
 * @param element
 * @param value
 * @returns {*}
 */
function set(element, value)
{
    return UI.SetValue("Misc", "JAVASCRIPT", "Script items", element, value);
}

/**
 * Handles the dragging feature of our window
 */
function handle_dragging()
{
    var in_bounds = function(vec, x1, y1, x2, y2){
        return (vec[0] > x1) && (vec[1] > y1) && (vec[0] < x2) && (vec[1] < y2);
    };

    if (Global.IsKeyPressed(1))
    {
        const x = get("performance_window_x"), y = get("performance_window_y");
        const mouse_pos = Global.GetCursorPosition();

        if (in_bounds(mouse_pos, x, y, x + 300, y + 130))
        {
            set("performance_window_x", mouse_pos[0] - 150);
            set("performance_window_y", mouse_pos[1] - 30);
        }
    }
}

/**
 * Draws the performance window (you're welcome duk ♥)
 */
function draw_container()
{
    // Creating our variables
    const x = get("performance_window_x"), y = get("performance_window_y");
    var avg = {'fps': 0, 'ping': 0};

    // Draw outline
    Render.Rect(x - 1, y - 1, 302, 142, [2, 2, 2, 125]);

    // Draw container
    Render.FilledRect(x, y, 300, 20, [10, 10, 10, 255]);
    Render.FilledRect(x, y + 20, 300, 115, [15, 15, 15, 255]);
    Render.FilledRect(x + 149, y + 26, 1, 100, [25, 25, 25, 125]);
    Render.FilledRect(x, y + 130, 300, 15, [8, 8, 8, 255]);

    // Draw texts
    Render.String(x + 5, y + 4, 0, hex_to_ascii(0xE6), [200, 200, 200, 200], 6);
    Render.String(x + 20, y + 3, 0, "Performance", [200, 200, 200, 200], 10);
    Render.String(x + 75, y + 30, 1, "FPS", [200, 200, 200, 125], 3);
    Render.String(x + 225, y + 30, 1, "PING", [200, 200, 200, 125], 3);
    Render.String(x + 75, y + 45, 1, Math.floor(1 / Global.Frametime() + 0.5).toString(), [100, 100, 100, 125], 2);
    Render.String(x + 225, y + 45, 1, Math.floor(Global.GetLatency() + 0.5).toString(), [100, 100, 100, 125], 2);

    // Updates our fps/ping info every half a second
    if (Global.Curtime() - last_time > 0.5) {
        // Reset our timer
        last_time = Global.Curtime();

        // Update values
        fps_info.unshift(1 / Global.Frametime());
        ping_info.unshift(Global.GetLatency() + 5);
    }

    // If our arrays reached their limit, then remove the last value
    if (fps_info.length > 30)
        fps_info.pop();

    if (ping_info.length > 30)
        ping_info.pop();

    // Draw fps graph
    for (i = 0; i < fps_info.length; i++)
    {
        avg.fps += fps_info[i]
        Render.GradientRect(
            x + 150 - i * 5 - 5,
            y + 130 - fps_info[i] / Convar.GetInt("fps_max") * 70,
            5,
            fps_info[i] / Convar.GetInt("fps_max") * 70,
            0,
            [35, 35, 95, 0],
            [35, 35, 95, 255]
        );
    }

    // Draw latency graph
    for (i = 0; i < ping_info.length; i++)
    {
        avg.ping += ping_info[i]
        Render.GradientRect(
            x + 300 - i * 5 - 5,
            y + 130 - ping_info[i] / 100 * 70,
            5,
            ping_info[i] / 100 * 70,
            0,
            [95, 35, 35, 0],
            [95, 35, 35, 255]
        );
    }

    // Calculate averages
    avg.fps /= (fps_info.length === 0) ? 1 : fps_info.length;
    avg.ping /= (ping_info.length === 0) ? 1 : ping_info.length;

    // Draw averages
    Render.String(x + 5, y + 45, 0, "AVG: " + Math.floor(avg.fps + 0.5).toString(), [125, 100, 100, 55], 2);
    Render.String(x + 155, y + 45, 0, "AVG: " + Math.floor(avg.ping - 4.5).toString(), [125, 100, 100, 55], 2);

    // Draw additional info
    Render.String(x + 5, y + 60, 0, "VAR: " + Math.floor((fps_info[1] / fps_info[0] - 1) * 100).toString(), [200, 200, 200, 55], 2);
    Render.String(x + 155, y + 60, 0, "VAR: " + Math.floor((ping_info[1] / ping_info[0] - 1) * 100).toString(), [200, 200, 200, 55], 2);

}

/**
 * Where the magic happens (haha re-used meme)
 */
function main()
{
    // Callback functions
    draw_container();
    handle_dragging();
}

function reset()
{
    last_time = Global.Curtime();
    fps_info = [];
    ping_info = [];
}

//endregion

//region callbacks

// Register our callbacks
Global.RegisterCallback("Draw", "main");
Global.RegisterCallback("player_connect_full", "reset");

//endregion
