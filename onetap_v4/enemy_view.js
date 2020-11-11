/*
*
* Title: Enemy view
* Author: april#0001
* Description: Renders a camera on your screen that represents the 3rd person view of the nearest target.
*
*/

//region Locals
// Create our view and store its index.
const view = View.Create();

// Create a global variable for our current targeted entity.
var target = null;

// Create an object to store our dragging-related info.
var drag = {
    // The window's position.
    x: 100,
    y: 100,

    difference: {
        x: 0,
        y: 0
    },

    dragging: false
};
//endregion

//region Menu
// Create our hotkey.
UI.AddHotkey(["Misc.", "Keys", "General", "Key assignment"], "Enemy view", "Enemy view");

// Also create invisible sliders to store the X and Y positions of our window.
UI.AddSliderInt(["Config", "Cheat", "General"], "pos_x", 100, 2560);
UI.AddSliderInt(["Config", "Cheat", "General"], "pos_y", 100, 1440);
//endregion

//region Dependencies

/**
 * @description Converts an Angle object into a 3D world vector.
 * @param {Number[3]} x 
 */
function AngleVector(x) {

    /**
     * @description Convert degrees into radians.
     * @param {Number} deg 
     */
    const DegreeToRadian = function(deg) {
        return deg * Math.PI / 180;
    }

    // Calculate the sines and cosines of the X and Y angles.
    const sp = Math.sin(DegreeToRadian(x[0]));
    const cp = Math.cos(DegreeToRadian(x[0]));
    const sy = Math.sin(DegreeToRadian(x[1]));
    const cy = Math.cos(DegreeToRadian(x[1]));

    // Convert the angles into an unitary vector.
    return [cp * cy, cp * sy, -sp]
}

/**
 * @description Calculates the angle from one point to another.
 * @param {Number[3]} from 
 * @param {Number[3]} to 
 */
function CalculateAngles(from, to) {

    /**
     * @description Converts radians into degrees.
     * @param {Number} rad 
     */
    const RadianToDegree = function(rad) {
        return rad * 180 / Math.PI;
    }

    // Calculate the difference between 'to' and 'from'.
    const sub = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];

    // Calculate the hypotenuse.
    const hyp = Math.sqrt(sub[0] ** 2 + sub[1] ** 2);

    // Calculate the angles and convert them into degrees.
    const yaw = RadianToDegree(Math.atan2(sub[1], sub[0]));
    const pitch = RadianToDegree(-Math.atan2(sub[2], hyp));

    // Return an Angle object.
    return [pitch, yaw, 0];
}

/**
 * @description Calculates the FOV delta from one point to another.
 * @param {Number[3]} from 
 * @param {Number[3]} to 
 * @param {Number[3]} angles 
 */
function CalculateFOV(from, to, angles) {
    // Calculate the angles from the origin point to the destination.
    const calculated = CalculateAngles(from, to);

    // Calculate the delta between the calculated angles and our view angles.
    const yaw_delta = angles[1] - calculated[1];
    const pitch_delta = angles[0] - calculated[0];

    // Normalize our yaw.
    if (yaw_delta > 180)
        yaw_delta -= 360;

    if (yaw_delta < -180)
        yaw_delta += 360;

    // Calculate the FOV and return it.
    return Math.sqrt(yaw_delta ** 2 + pitch_delta ** 2);
}
//endregion

//region Functions
//region Miscellaneous
function GetCrosshairTarget() {
    // Get our local player and enemies.
    const me = Entity.GetLocalPlayer();
    const enemies = Entity.GetEnemies();

    // Get our eye position and eye angles.
    const eye_pos = Entity.GetEyePosition(me);
    const eye_angles = Local.GetViewAngles();

    // Initialize an object where our data will be stored.
    var data = {target: null, fov: 180};

    // Loop through every enemy.
    for (var i = 0; i < enemies.length; i++) {
        // Get our current enemy's entity index.
        const ent = enemies[i];

        // Do sanity checks to make sure he's alive and not dormant.
        if (!Entity.IsAlive(ent) || Entity.IsDormant(ent))
            continue;

        // Get the enemy's head position.
        // This is my preferred hitbox to calculate FOV with.
        const head_pos = Entity.GetHitboxPosition(ent, 0);

        // Calculate the FOV delta from our eye position to the enemy's head position.
        const fov = CalculateFOV(eye_pos, head_pos, eye_angles);
        
        // Check if the calculated FOV is lower than the stored one.
        // When true, it means that this enemy is closer to our crosshair than the previous ones.
        if (data.fov > fov) {
            // Update our data for further calculations.
            data.fov = fov;
            data.target = ent;
        }
    }

    // Return the target closest to our crosshair or null.
    return data.target;
}

function HandleDragging() {
    // Get our input information.
    const cursor = Input.GetCursorPosition();
    const is_pressed = Input.IsKeyPressed(1);

    // Get our screen size.
    const size = Render.GetScreenSize();

    // If we aren't pressing Mouse1 then we can't be dragging.
    if (!is_pressed)
        drag.dragging = false;

    // Check if we're pressing Mouse1 and if our cursor is inside the top bar of the window, or, if we were dragging the window in the last frame.
    if (is_pressed && cursor[0] >= drag.x && cursor[1] >= drag.y - 42 && cursor[0] <= drag.x + size[0] / 4 && cursor[1] <= drag.y - 10 || drag.dragging) {
        // We are dragging, so set this boolean to true.
        drag.dragging = true;

        // Update our window's position.
        drag.x = cursor[0] - drag.difference.x;
        drag.y = cursor[1] - drag.difference.y;

        // Save the new position on our sliders.
        UI.SetValue( ["Config", "Cheat", "General", "pos_x"], drag.x );
        UI.SetValue( ["Config", "Cheat", "General", "pos_y"], drag.y );
    }

    // If we're not dragging.
    else {
        // Update the difference between our cursor's position and the window's position.
        // This allows us to properly drag the window.
        drag.difference.x = cursor[0] - drag.x;
        drag.difference.y = cursor[1] - drag.y;
    }
}
//endregion

//region Callbacks

/**
 * @callback None
 * @description Hides the invisible sliders and updates our window's position on load.
 */
function fetchPositions() {
    // Hide our sliders
    UI.SetEnabled( ["Config", "Cheat", "General", "pos_x"], 0 );
    UI.SetEnabled( ["Config", "Cheat", "General", "pos_y"], 0 );

    // Updates our positions
    drag.x = Math.max( UI.GetValue( ["Config", "Cheat", "General", "pos_x"] ), 100 );
    drag.y = Math.max( UI.GetValue( ["Config", "Cheat", "General", "pos_y"] ), 100 );
}

/**
 * @callback CreateMove
 * @description Handles our targeting system.
 */
function onCreateMove() {
    // Gets our target and updates the global variable.
    target = GetCrosshairTarget();
}

/**
 * @callback FRAME_RENDER_START
 * @description Handles the updating of our view.
 */
function onFrameRenderStart() {
    // Check if we're in-game.
    // Otherwise, there's no need to update.
    if (!Entity.IsValid(Entity.GetLocalPlayer()))
        return;
        
    // Check if there's a valid target.
    if (!target)
        return;
    
    // Get our local player
    const me = Entity.GetLocalPlayer()

    // Get some entity-related properties.
    const head_pos = Entity.GetHitboxPosition(me, 0);
    const camera_pos = Entity.GetEyePosition(target);

    // Calculate the angle from the target's eye position to our head position.
    // Pretty much inverted aimbot logic here.
    const camera_angles = CalculateAngles(camera_pos, head_pos);

    // Convert those camera angles into a unitary vector.
    const vector = AngleVector(camera_angles);

    // Create a new vector and initialize it with our target's eye position.
    const end_pos = [camera_pos[0], camera_pos[1], camera_pos[2]];

    // Extends the camera position to simulate a third-person view.
    end_pos[0] -= vector[0] * 64;
    end_pos[1] -= vector[1] * 64;
    end_pos[2] -= vector[2] * 64;

    // Do a trace from the target's eye position to his third-person camera position.
    const trace = Trace.Line(target, camera_pos, end_pos)

    // Check if the trace is valid.
    // It can rarely return undefined.
    if (!trace)
        return;

    // Get our screen size.
    const size = Render.GetScreenSize();

    // Calculate the new third-person view position using the trace's info.
    // Doing this so the camera doesn't go inside a wall.
    camera_pos[0] -= vector[0] * 64 * trace[1];
    camera_pos[1] -= vector[1] * 64 * trace[1];
    camera_pos[2] -= vector[2] * 64 * trace[1];

    // Update our view using the new camera position and angles, at half the resolution for better performance.
    View.Update( view, size[0] / 2, size[1] / 2, camera_pos, camera_angles );
}

/**
 * @callback Draw
 * @description Handles the rendering and dragging of the window.
 */
function onDraw() {
    // Get whether or not the menu is open.
    const is_menu_open = UI.IsMenuOpen();

    // Get whether or not our local player is valid.
    const is_local_player_valid = Entity.IsValid(Entity.GetLocalPlayer());

    // If it is, then handle the window's dragging.
    if (is_menu_open)
        HandleDragging();

    // Check if we're holding the hotkey or if the menu is open.
    // Otherwise, we don't want to render the Enemy view window, so, return.
    if (!(UI.GetValue(["Misc.", "Keys", "General", "Key assignment", "Enemy view"]) && is_local_player_valid) && !is_menu_open)
        return;

    // Get the screen size and create a new font.
    const size = Render.GetScreenSize();
    const font = Render.AddFont("segoeuib", 20, 0);

    // Get the X and Y positions used to render our window.
    // This is mostly me being lazy and not wanting to add 'drag.' before every 'x' and 'y'.
    const x = drag.x, y = drag.y;

    // Render the background
    Render.FilledRect( x - 4, y - 42, size[0] / 4 + 8, 32, [35, 35, 40, 255] );
    Render.FilledRect( x - 4, y - 4, size[0] / 4 + 8, size[1] / 4 + 8, [35, 35, 40, 255] );

    // Render the yellow bar on top.
    Render.FilledRect( x - 4, y - 42, size[0] / 4 + 8, 4, [250, 166, 24, 255] );

    // Render the window's title.
    Render.String( x - 4 + size[0] / 8, y - 40, 1, "Enemy view", [235, 235, 235, 255], font );

    // Check if our target and local player are valid and, then, render the enemy's third-person view.
    if (is_local_player_valid && target)
        View.Render( view, drag.x, drag.y, size[0] / 4, size[1] / 4 );

    // Otherwise, render a black screen saying that the camera is unavailable.
    else {
        // Calculate a breathing alpha for the aesthetics.
        const alpha = Math.sin(Globals.Tickcount() * Globals.TickInterval() * 2) * 127 + 128;

        // Render the black rectangle and the 'Camera unavailable' text.
        Render.FilledRect( drag.x, drag.y, size[0] / 4, size[1] / 4, [10, 10, 10, 255] );
        Render.String( drag.x + size[0] / 8, drag.y + size[1] / 8 - 24, 1, "Camera unavailable.", [235, 235, 235, alpha], font );
    }
}

// Fetch our menu positions and hide our sliders.
// Call this once on load.
fetchPositions();

// Register the callbacks.
Cheat.RegisterCallback("FRAME_RENDER_START", "onFrameRenderStart");
Cheat.RegisterCallback("Draw", "onDraw");
Cheat.RegisterCallback("CreateMove", "onCreateMove");
//endregion
//endregion
