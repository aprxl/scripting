/*
*
* Title: Advanced freestanding
* Author: april#0001
* Description: A rework of my body freestanding script made for v3.
*
*/

//region Dependencies
//region Menu
// Dependencies that makes UI.Add... elements return their respective paths.
// Deprecated with newest update.
function fixUIBehaviour() {
    for(var i in UI) {
        if(!~i.indexOf("Add"))
            continue;

        (function(cur) {
            UI[i] = function() {
                cur.apply(this, Array.prototype.slice.call(arguments));
                return arguments[0].concat(arguments[1]);
            }
        }(UI[i]));
    }
}

// Call this whenever the script first loads.
fixUIBehaviour(  );
//endregion

//region Render
/**
 * Renders a shadowed string
 * @param Number x 
 * @param Number y 
 * @param Number a 
 * @param Number l 
 * @param Number c 
 * @param Number f 
 */
Render.ShadowString = function(x, y, a, l, c, f) {
    // Get the minimum alpha.
    const alpha = Math.min(c[3], 235);

    Render.String(x, y + 1, a, l, [10, 10, 10, alpha], f);
    Render.String(x, y, a, l, c, f);
}

/**
 * Renders an outlined string
 * @param Number x 
 * @param Number y 
 * @param Number a 
 * @param Number l 
 * @param Number c 
 * @param Number f 
 */
Render.OutlineString = function(x, y, a, s, c, f) {
    // Get the minimum alpha.
    const alpha = Math.min(235, c[3]);

    Render.String(x - 1, y - 1, a, s, [10, 10, 10, alpha], f);
    Render.String(x - 1, y + 1, a, s, [10, 10, 10, alpha], f);
    Render.String(x + 1, y - 1, a, s, [10, 10, 10, alpha], f);
    Render.String(x + 1, y + 1, a, s, [10, 10, 10, alpha], f);
    Render.String(x, y, a, s, c, f);
}
//endregion

//region Math
/**
 * Subtracts two 3D vectors.
 * @param Number[3] vec 
 * @param Number[3] vec2 
 */
function subtract(vec, vec2)
{
    return [
        vec[ 0 ] - vec2[ 0 ],
        vec[ 1 ] - vec2[ 1 ],
        vec[ 2 ] - vec2[ 2 ]
    ];
};

/**
 * Subtracts two 3D vectors.
 * @param Number[3] vec 
 * @param Number[3] vec2 
 */
function multiply(vec, vec2)
{
    return [
        vec[ 0 ] * vec2[ 0 ],
        vec[ 1 ] * vec2[ 1 ],
        vec[ 2 ] * vec2[ 2 ]
    ];
};

/**
 * Normalizes an angle.
 * @param Number angle 
 */
function normalize( angle ) {
    // If angle is lower than 180, adds 360.
    while ( angle < -180 )
        angle += 360;

    // If angle is greater than 180, subtract 360.
    while ( angle > 180 )
        angle -= 360;

    // Return normalized angle.
    return angle;
}

/**
 * Extrapolates an vector by an entity's velocity.
 * @param Number entity 
 * @param Number[] position 
 * @param Number ticks
 */
function extrapolate( entity, position, ticks ) {
    // Get this entity's velocity.
    const velocity = Entity.GetProp( entity, "CBasePlayer", "m_vecVelocity[0]" );

    // Get the server's tick interval.
    const interval = Globals.TickInterval(  );

    // Extrapolate the position by the velocity.
    // In this case, we're 'predicting' where this entity will be in one second.
    position[ 0 ] += velocity[ 0 ] * interval * ticks;
    position[ 1 ] += velocity[ 1 ] * interval * ticks;
    position[ 2 ] += velocity[ 2 ] * interval * ticks;

    // Return the extrapolated position.
    return position;
};

/**
 * Converts degrees into radians.
 * @param Number degree 
 */
function degree_to_radian( degree ) {
    return degree * Math.PI / 180;
}

/**
 * Converts angles into a direction vector
 * @param Number[] angles 
 */
function angle_to_vector( angles ) {
    // Calculate sines and cosines.
    const sp = Math.sin( degree_to_radian( angles[ 0 ] ) );
    const cp = Math.cos( degree_to_radian( angles[ 0 ] ) );
    const sy = Math.sin( degree_to_radian( angles[ 1 ] ) );
    const cy = Math.cos( degree_to_radian( angles[ 1 ] ) );

    // Return the calculated direction vector.
    return [ cp * cy, cp * sy, -sp ]
}
//endregion
//endregion

//region Locals
// Create a global object where we will be storing our cached values.
var cache = { 
    active: false,
    reference: false
};

// Create a global object where we will store shared information.
var shared = {
    create_fonts: true,
    fonts: { default: null, small: null },

    target: null,

    side: 0,
    last_side: 0
};
//endregion

//region Menu
// Reference our menu's path.
const path = [ "Rage", "Anti Aim", "Fake" ];

// Create our menu elements
const mode = UI.AddDropdown( path, "Body yaw freestanding", [ "Off", "Hide real", "Hide fake" ], 0 );
const fs_target = UI.AddDropdown( path, "Freestanding target", [ "Crosshair", "Distance" ], 0 );

// Reference the necessary menu elements.
const ref_body_freestanding = [ "Rage", "Anti Aim", "Fake", "Hide real angle" ];
const ref_inverter = [ "Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter" ];
//endregion

//region Functions
//region Targeting
/**
 * Gets the distance from a player's origin to a 3D point.
 * @param Number me 
 * @param Number[] pos 
 */
function getDistance( me, pos ) {
    // Get the specified entity's origin.
    const origin = Entity.GetRenderOrigin( me );

    // Calculate the difference between the destination and origin.
    const sub = subtract( pos, origin );

    // Calculate the distance.
    const distance = Math.sqrt( sub[ 0 ] * sub[ 0 ] + sub[ 1 ] * sub[ 1 ] + sub[ 2 ] * sub[ 2 ] );

    // Return distance.
    return distance;
}

/**
 * Gets the FOV delta from a player's eye position to a 3D point.
 * @param Number me 
 * @param Number[] pos 
 */
function getFOV( me, pos ) {
    // Get entity properties.
    const eye_pos = Entity.GetEyePosition( me );
    const viewangles = Local.GetViewAngles(  );

    // Calculate the difference between the desired position and our eye position.
    const sub = subtract( pos, eye_pos );

    // Calculate yaw and pitch.
    const yaw = Math.atan2( sub[ 1 ], sub[ 0 ] ) * 180 / Math.PI;
    const pitch = -Math.atan2( sub[ 2 ], Math.sqrt( sub[ 0 ] ** 2 + sub[ 1 ] ** 2 ) ) * 180 / Math.PI;

    // Calculate yaw and pitch delta.
    var yaw_delta = ( ( viewangles[ 1 ] % 360 - yaw % 360 ) % 360 );
    const pitch_delta = viewangles[ 0 ] - pitch;

    // Normalize our yaw delta so it doesn't exceed source engine's mins and maxs.
    yaw_delta = normalize( yaw_delta );

    // Calculate the FOV.
    // Return the calculated fov.
    return Math.sqrt(yaw_delta * yaw_delta + pitch_delta * pitch_delta);
}

/**
 * Calculates the best target for freestanding.
 * @param Number me 
 */
function getBestTarget( me ) {

    /**
     * Checks if an entity is invalid.
     * @param Number entity 
     */
    const sanitize = function( entity ) {
        return Entity.IsDormant( entity ) || !Entity.IsAlive( entity );
    }

    // Get our freestanding mode.
    const distance_based = UI.GetValue( fs_target );

    // Get enemies.
    const enemies = Entity.GetEnemies(  );

    // Initialize the object where our data will be stored.
    var data = { target: null, fov: 180, distance: 8192 };

    // Loop through every single enemy.
    for ( var i = 0; i < enemies.length; i++ ) {
        // Get our current enemy.
        const entity = enemies[ i ];

        // Check if this enemy is valid.
        if ( sanitize( entity ) )
            return;

        // Check if we are not using 'Distance' targeting mode, thus, we're using 'Crosshair'.
        if ( !distance_based ) {
            // Get the enemy's head position.
            const head_position = Entity.GetHitboxPosition( entity, 0 );

            // Calculate the FOV.
            const fov = getFOV( me, head_position );

            // Check if this FOV is lower than the stored FOV.
            // This means that this enemy is closer to our crosshair than the
            // previous ones.
            if ( fov < data.fov ) {
                // Update our target and save changes.
                data.fov = fov;
                data.target = entity;
            }
        }

        // Otherwise, we're using 'Distance' mode.
        else {
            // Get the enemy's origin.
            const origin = Entity.GetRenderOrigin( entity );

            // Calculate the distance.
            const distance = getDistance( me, origin );

            // Check if this distance is lower than the stored distance.
            // Same logic as FOV.
            if ( distance < data.distance ) {
                // Update our target and save changes.
                data.distance = distance;
                data.target = entity;
            }
        }
    }

    // Update our global target variable.
    shared.target = data.target;
}
//endregion

//region Logic
/**
 * Calculates the best freestanding side.
 * @param Number me 
 */
function getFreestandingSide( me ) {
    // Get local properties.
    const eye_position = Entity.GetEyePosition( me );
    const eye_angles = Local.GetViewAngles(  )[ 1 ];

    // Initialize the object where our data will be stored.
    var data = {
        damages: [ 0, 0 ],
        fractions: { left: 0, right: 0 }
    };

    // Reset freestanding side.
    shared.side = 0;

    // Check if we have a valid target.
    if ( shared.target ) {
        // Get this target's head position.
        const head_position = Entity.GetHitboxPosition( shared.target, 0 );

        // Initialize arrays used for calculations.
        const multiplier = [ 32, 32, 32 ];
        const angles = [ -90, 90 ];

        // Loop through every freestanding angle.
        for ( var i = 0; i < angles.length; i++ ) {
            // Get the current angle.
            const current = angles[ i ];

            // Calculate the extrapolated point.
            const direction = multiply( angle_to_vector( [ 0, eye_angles + current, 0 ] ), multiplier );
            const point = extrapolate( me, [ 
                eye_position[ 0 ] + direction[ 0 ],
                eye_position[ 1 ] + direction[ 1 ],
                eye_position[ 2 ] + direction[ 2 ],
            ], 4 );

            // Trace a bullet from the extrapolated point to the target's head.
            // These points are extrapolated 32 units to the right and left.
            const bullet = Trace.Bullet( me, shared.target, point, head_position );

            // Check if our bullet data is valid.
            // Prevents rare case where it returns null.
            if ( !bullet )
                continue;

            // Update our damage data.
            data.damages[ i ] = bullet[ 1 ];
        }

        // If the left damage is lower than the right one, we
        // want to put our head there.
        if ( data.damages[ 0 ] < data.damages[ 1 ] ) {
            // Update freestanding side to left.
            shared.side = 1;
        }

        // If the left damage is greather than the right one, we
        // want to put our head to the other way.
        else if ( data.damages[ 0 ] > data.damages[ 1 ] ) {
            // Update freestanding side to right.
            shared.side = 2;
        }
    }

    // If none of those conditions are met, it means we didn't have accurate damage information
    // to freestand. So, proceed with normal trace freestanding.
    if ( shared.side )
        return;

    // Start from your backwards angle and do a 360.
    for ( var i = eye_angles - 180; i < eye_angles + 180; i += 180 / 12 ) {
        // Check if our current angle is equals our eye angle.
        // If so continue because the center point can't be right or left.
        if ( i === eye_angles )
            continue;

        // Convert this angle into radians.
        const rotation = degree_to_radian( i );

        // Calculate the extrapolated point once again.
        const point = [
            eye_position[ 0 ] + Math.cos( rotation ) * 256,
            eye_position[ 1 ] + Math.sin( rotation ) * 256,
            eye_position[ 2 ]
        ];

        // Trace a line from our eye position to the extrapolated point.
        // These points are making a circle around you with a 256u radius.
        const line = Trace.Line( me, eye_position, point );
        
        // Check if our trace data is valid.
        // Prevents rare case where it returns null.
        if ( !line )
            continue;

        // Update our trace data.
        data.fractions[ i > eye_angles ? "right" : "left" ] += line[ 1 ];
    }

    // If the left walls are closer than the right ones,
    // put our head to the left.
    if ( data.fractions.left < data.fractions.right ) {
        // Update freestanding side to left.
        shared.side = 1;
    }

    // If the left walls are further away than the right ones,
    // put our head to the right.
    else if ( data.fractions.left > data.fractions.right ) {
        // Update freestanding side to right.
        shared.side = 2;
    }
}

function updateFreestandingData(  ) {
    // Get local player.
    const me = Entity.GetLocalPlayer(  );

    // Update freestanding data.
    getBestTarget( me );
    getFreestandingSide( me );
}
//endregion

//region Update
function updateSettings(  ) {
    // Get current freestanding mode.
    const current_mode = UI.GetValue( mode );

    // Check if our freestanding side changed.
    if ( shared.side === shared.last_side )
        return;

    // Save this side for further checks.
    shared.last_side = shared.side;

    // Check if the script is enabled.
    if ( !current_mode )
        return;

    // Get inverted states.
    const inverted = UI.GetValue( ref_inverter );
    const desired = current_mode == 1 ? shared.side == 1 : shared.side == 2;
    
    // Check if our inverter hotkey is bound. If not,
    // force bind it.
    if ( !UI.GetHotkey( ref_inverter ) )
        UI.SetValue( ref_inverter, 100 );

    // Check if our inverter hotkey is on Toggle. If not,
    // force it to Toggle.
    if ( UI.GetHotkeyState( ref_inverter ) != "Toggle" )
        UI.SetHotkeyState( ref_inverter, "Toggle" );

    // Check if we should update our inverter.
    if ( inverted != desired )
        // Toggle / Untoggle the inverter.
        UI.ToggleHotkey( ref_inverter );
}
//endregion

//region Callbacks
//region Menu
function onEnable(  ) {
    // Get current freestanding mode.
    const value = UI.GetValue( mode );

    // Reset the cached freestanding side.
    // Do this so our freestanding updates.
    shared.last_side = 0;

    // Check if this is the first time activating the script.
    if ( value && !cache.active ) {
        // Cache values.
        cache.active = true;
        cache.reference = UI.GetValue( ref_body_freestanding );

        // Disable the cheat's freestanding as we'll be handling it via the script.
        UI.SetValue( ref_body_freestanding, 0 );
    }

    // Check if we just disabled the script.
    else if ( !value && cache.active ) {
        // Reset cache.
        cache.active = false;

        // Revert the cheat's freestanding to original state.
        UI.SetValue( ref_body_freestanding, cache.reference );
    }

    // Handle visibility.
    UI.SetEnabled( fs_target, +value );
    UI.SetEnabled( ref_body_freestanding, +!value );
}

// Register the UI callbacks.
UI.RegisterCallback( mode, 'onEnable' );
//endregion

function onCreateMove(  ) {
    // Do freestanding.
    updateFreestandingData(  );
    updateSettings(  );
}

function onDraw(  ) {
    // Check if we should create our fonts.
    if ( shared.create_fonts ) {
        // Create fonts on script load.
        shared.create_fonts = false;
        shared.fonts.default = Render.AddFont( "segoeuib", 30, 0 );
        shared.fonts.small = Render.AddFont( "segoeuib", 9, 0 );
    }

    // Check if the script is enabled.
    if ( !UI.GetValue( mode ) )
        return;

    // Get rendering position.
    const x = 15, y = Render.GetScreenSize(  )[ 1 ] - 150;

    // Get anti-aim data.
    const real = Local.GetRealYaw(  ), fake = Local.GetFakeYaw(  );
    const delta = normalize( real - fake ) / 2;

    // Render the main indicator.
    Render.ShadowString( x, y, 0, "FAKE", [ 235, 235, 235, 225 ], shared.fonts.default );
    Render.OutlineString( x + 34, y + 45, 1, delta.toFixed( 1 ).toString(  ), [ 200, 200, 200, 225 ], shared.fonts.small );
    Render.FilledRect( x, y + 40, 72, 4, [ 10, 10, 10, 200 ] );

    // Render the delta bar.
    if ( delta > 0 ) 
        Render.FilledRect( x + 36, y + 41, 36 * Math.abs( delta ) / 60, 2, [ 235, 235, 235, 225 ] );
    
    else
        Render.FilledRect( x + 36 - ( 36 * Math.abs( delta ) / 60 ), y + 41, 36 * Math.abs( delta ) / 60, 2, [ 235, 235, 235, 225 ] );
        
}

// Call this on script load.
onEnable(  );

// Register normal callbacks.
Cheat.RegisterCallback( 'CreateMove', 'onCreateMove' );
Cheat.RegisterCallback( 'Draw', 'onDraw' );
//endregion
//endregion
