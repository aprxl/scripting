/*
*
* Title: Legit ESP
* Author: april#0001
* Description: Toggles ESP on certain players according to selected events/conditions.
* uwu im helpful - Hana 
*
*/

//region Dependencies
//region Menu
// Dependencies that makes UI.Add... elements return their respective paths.
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
//endregion

//region Locals
//region Consts
// Declare our flag constants.
const Flags = {
    ON_GROUND: (1 << 0)
};
//endregion

// Initialize the array where our entity data will be stored.
var data = [  ];
//endregion

//region Menu
// Create a constant for our menu path.
const path = [ "Visuals", "ESP", "Enemy" ];

// Create our menu elements
const enable = UI.AddCheckbox( path, "Legit ESP" );
const triggers = UI.AddMultiDropdown( path, "Triggers", [ "On spotted", "On sound", "On visible", "On visible + peek", "On proximity", "On FOV" ], 0 );
const proximity = UI.AddSliderInt( path, "Maximum distance", 100, 1000 );
const duration = UI.AddSliderFloat( path, "Duration", 1, 10 );
const max_fov = UI.AddSliderFloat( path, "Maximum field of view", 0, 60 ); /* we should have an option for step :c */
//endregion

//region Functions
//region Math
/**
 * Clamps a value between a lower and upper limit.
 * @param number value 
 * @param number min 
 * @param number max 
 */
function clamp( value, min, max ) {
    return Math.min( Math.max( value, min ), max );
}

/**
 * Calculates the distance between two 3D points.
 * @param Number[3] a 
 * @param Number[3] b 
 */
function distance( a, b ) {
    // Calculate the difference between b and a.
    const sub = [ b[ 0 ] - a[ 0 ], b[ 0 ] - a[ 0 ], b[ 0 ] - a[ 0 ] ];

    // Return the length of the subtracted vector, i.e. our distance.
    return Math.sqrt( sub[ 0 ] * sub[ 0 ] + sub[ 1 ] * sub[ 1 ] + sub[ 2 ] * sub[ 2 ] );
}

/**
 * Normalizes an angle.
 * @param Number angle 
 */
function normalize( angle ) {
    // If angle is lower than 180, adds 360.
    if ( angle < -180 )
        angle += 360;

    // If angle is greater than 180, subtract 360.
    if ( angle > 180 )
        angle -= 360;

    // Return normalized angle.
    return angle;
}
//endregion

//region Menu
function handleMenuEvents(  ) {
    // Get our menu element's values.
    const enabled = UI.GetValue( enable );
    const value = UI.GetValue( triggers );

    // Updates our menu's visibility
    UI.SetEnabled( triggers, enabled );
    UI.SetEnabled( duration, enabled && value );
    UI.SetEnabled( proximity, enabled && value & ( 1 << 4 ) );
    UI.SetEnabled( max_fov, enabled && value & ( 1 << 5 ) );

    // Check if the 'On visible + peek' trigger is enabled without 'On visible' being enabled.
    // If so, disable 'On visible + peek' because it is part of 'On visible'.
    if ( !( value & ( 1 << 2 ) ) && value & ( 1 << 3 ) )
        UI.SetValue( triggers, value & ~( 1 << 3 ) );
}
//endregion

//region Visibility
/**
 * Checks if an entity is visible.
 * @param Number me 
 * @param Number entity 
 * @param Boolean extrapolate 
 */
function isEntityVisible( me, entity, extrapolate ) {

    /**
     * Extrapolates an vector by an entity's velocity.
     * @param Number entity 
     * @param Number[3] position 
     */
    const extrapolate = function( entity, position ) {
        // Get this entity's velocity.
        const velocity = Entity.GetProp( entity, "CBasePlayer", "m_vecVelocity[0]" );

        // Extrapolate the position by the velocity.
        // In this case, we're 'predicting' where this entity will be in one second.
        position[ 0 ] += velocity[ 0 ];
        position[ 1 ] += velocity[ 1 ];
        position[ 2 ] += velocity[ 2 ];

        // Return the extrapolated position.
        return position;
    };

    // Create an array to store hitbox positions. Doing this just for better performance.
    const hitbox_positions = [  ];

    // Create an array containing the hitboxes we want to loop through. In this case: head,
    // stomach, chest, feet and hands.
    const hitboxes = [ 0, 3, 5, 11, 12, 13, 14 ];

    // Get our local player's eye position.
    const origin = Entity.GetEyePosition( me );

    // Loop through every hitbox.
    for ( var i = 0; i < hitboxes.length; i++ ) {
        // Get our current hitbox.
        const hitbox = hitboxes[ i ];

        // Get this hitbox's position and store it in case we need to use it later.
        hitbox_positions[ hitbox ] = Entity.GetHitboxPosition( entity, hitbox );

        // Calculate the trace fraction from our local player's eye to this hitbox.
        const trace = Trace.Line( me, origin, hitbox_positions[ hitbox ] );
        const smoke = Trace.Smoke( origin, hitbox_positions[ hitbox ] );

        // If the trace fraction is greater than 0.95, it's safe to assume that it is visible.
        // In this case, return true because entity is partially (or fully) visible.
        if ( trace[1] > 0.95 && !smoke ) 
            return true;            
    }

    // If none of the entity's hitboxes is visible then the entity isn't on our screen. However,
    // we still need to predict if it'll be visible in one second.

    // If we don't want to predict, then just return false because entity isn't visible.
    if ( !extrapolate )
        return false;

    // Create an array containing the hitboxes we want to loop through. In this case only head, stomach and chest,
    // because we don't need to be as accurate as before.
    const extrapolate_hitboxes = [ 0, 3, 5 ];

    // Loop through every new hitbox.
    for ( var i = 0; i < extrapolate_hitboxes.length; i++ ) {
        // Get our current hitbox.
        const hitbox = extrapolate_hitboxes[ i ];

        // Get our extrapolated hitbox position.
        const extrapolated = extrapolate( entity, hitbox_positions[ hitbox ] );

        // Calculate the trace fraction from our local player's eye to the predicted hitbox position.
        const trace = Trace.Line( me, origin, extrapolated );
        const smoke = Trace.Smoke( origin, extrapolated );

        // If the trace fraction is greater than 0.95, it's safe to assume that it is visible.
        // In this case, return true because entity will be peeking.
        if ( trace[1] > 0.95 && !smoke )
            return true;
    }

    // If none of the checks above went through, it means that this entity is not visible and won't be peeking
    // in the next second, so, return false.
    return false;
}

function calculateFOV( me, pos ) { /* snake case superior uwu */
    // Get entity properties.
    const eye_pos = Entity.GetEyePosition( me );
    const viewangles = Local.GetViewAngles(  );

    // Get maximum FOV.
    const max = UI.GetValue( max_fov )

    /**
     * Subtracts two 3D vectors.
     * @param Number[3] vec 
     * @param Number[3] vec2 
     */
    const subtract = function(vec, vec2)
    {
        return [
            vec[ 0 ] - vec2[ 0 ],
            vec[ 1 ] - vec2[ 1 ],
            vec[ 2 ] - vec2[ 2 ]
        ];
    };

    /* **REDACTED** - Hana */
    const sub = subtract( pos, eye_pos );

    // Calculate yaw and pitch.
    const yaw = Math.atan2( sub[ 1 ], sub[ 0 ] ) * 180 / Math.PI;
    const pitch = -Math.atan2( sub[ 2 ], Math.sqrt( sub[ 0 ] ** 2 + sub[ 1 ] ** 2 ) ) * 180 / Math.PI;

    // Calculate yaw and pitch delta.
    const yaw_delta = ( ( viewangles[ 1 ] % 360 - yaw % 360 ) % 360 );
    const pitch_delta = viewangles[ 0 ] - pitch;

    // Normalize our yaw delta so it doesn't exceed source engine's mins and maxs.
    yaw_delta = normalize( yaw_delta );

    // Calculate the FOV.
    const fov = Math.sqrt( yaw_delta ** 2 + pitch_delta ** 2 )

    // Return whether or not point is within desired FOV.
    return fov < max;
}
//endregion

//region Data
/**
 * Resets an entity's data.
 * @param Number entity 
 */
function resetData( entity ) {
    // Reset (or initialize) the data array.
    data[ entity ] = {
        time: 0,
        last_flags: -1
    };
}

/**
 * Do calculations and checks to see if any conditions are met on this entity.
 * @param Number me 
 * @param Number entity 
 * @param Object data 
 */
function doTriggers( me, entity, data, enemies, dur ) {
    // Get our current active triggers.
    const active = UI.GetValue( triggers );

    // Get some entity props.
    const flags = Entity.GetProp( entity, "CBasePlayer", "m_fFlags" );
    const spotted = Entity.GetProp( entity, "CBaseEntity", "m_bSpotted" );

    // Calculate the distance from our local player to this entity.
    const dst = distance( Entity.GetRenderOrigin( me ), Entity.GetRenderOrigin( entity ) );

    // Check if we're using 'On proximity' and if the distance is lower than our threshold.
    if ( active & ( 1 << 4 ) && dst < UI.GetValue( proximity ) ) {
        // Update flags, for further checks, and the time.
        data.last_flags = flags;
        data.time = UI.GetValue( duration );
        return;
    }
    
    // Check if we're using 'On FOV' and player is within desired FOV.
    if ( active & ( 1 << 5 ) && calculateFOV( me, Entity.GetHitboxPosition( entity, 0 ) ) ) {
        // Update flags, for further checks, and the time.
        data.last_flags = flags;
        data.time = UI.GetValue( duration );
        return;
    }

    // Check if we're using 'On spotted' and if the entity is spotted.
    if ( active & ( 1 << 0 ) && spotted ) {
        // Update flags, for further checks, and the time.
        data.last_flags = flags;
        data.time = UI.GetValue( duration );
        return;
    }

    // Check if we're using 'On visible' and if the entity is/will be visible.
    if ( active & ( 1 << 2 ) && isEntityVisible( me, entity, active & ( 1 << 3 ) ) ) {
        // Update flags, for further checks, and the time.
        data.last_flags = flags;
        data.time = UI.GetValue( duration );
        return;
    }

    // Check if the entity has landed on this tick, meaning that they probably made a landing sound.
    if ( active & ( 1 << 1 ) && !( data.last_flags & Flags.ON_GROUND ) && ( flags & Flags.ON_GROUND ) ) {
        // Update flags, for further checks, and the time.
        data.last_flags = flags;
        data.time = UI.GetValue( duration );
        return;
    }

    // Update flags for further checks.
    data.last_flags = flags;
}

function updateEntityData(  ) {
    // Get our entities.
    const me = Entity.GetLocalPlayer(  );
    const enemies = Entity.GetEnemies(  );

    // Get some static values.
    const tick_interval = Globals.TickInterval(  );
    const dur = UI.GetValue( duration );

    UI.SetValue( [ "Visuals", "Extra", "Radar", "Radar reveal" ], 0 );

    // Loop through every single enemy in-game.
    for ( var i = 0; i < enemies.length; i++ ) {
        // Get our current enemy.
        const entity = enemies[ i ];

        // Check if this entity doesn't have any data.
        if ( !data[ entity ] ) {
            // Initialize this entity.
            resetData( entity );
        }

        // Check if this entity is dead.
        if ( !Entity.IsAlive( entity ) ) {
            // Reset this entity.
            resetData( entity );
            continue;
        }

        // Decrement the time from this entity.
        data[ entity ].time = clamp( data[ entity ].time - tick_interval, 0, dur );

        // Check if this entity is dormant.
        if ( Entity.IsDormant( entity ) ) {
            // Disable ESP and skip checks.
            Entity.DisableESP( entity );
            continue;
        }
        
        // Check if any conditions are met on this entity and update its time.
        doTriggers( me, entity, data[ entity ], enemies, dur );
    
        // If this entity's time isn't greater than 0 then disable ESP.
        if ( !data[ entity ].time ) 
            Entity.DisableESP( entity );            
    }
}
//endregion

//region Sounds
function updateSoundTime(  ) {
    // Check if 'On sound' is enabled.
    if ( !( UI.GetValue( triggers ) & ( 1 << 1 ) ) )
        return;

    // Get the event's entity.
    const userid = Entity.GetEntityFromUserID( Event.GetInt( "userid" ) );

    // Check if the entity is valid and if it is an enemy.
    if ( !Entity.IsValid( userid ) || !Entity.IsEnemy( userid ) )
        return;

    // Check if this entity doesn't have any data registered to it.
    // If so, initialize it.
    if ( !data[ userid ] )
        resetData( userid );

    //Cheat.Print( "[Sound] Registered sound for " + Entity.GetName( userid ) + '\n' );

    // Update this entity's time.
    data[ userid ].time = UI.GetValue( duration );
}
//endregion

//region Callbacks
function onCreateMove(  ) {
    // Check if the feature is enabled and update data.
    if ( UI.GetValue( enable ) )
        updateEntityData(  );
}

function onFrameRenderStart(  ) {
    // Check if the menu is open and update menu visibility and values.
    if ( UI.IsMenuOpen(  ) )
        handleMenuEvents(  );
}

// Register the main callbacks.
Cheat.RegisterCallback( "CreateMove", "onCreateMove" );
Cheat.RegisterCallback( "FRAME_RENDER_START", "onFrameRenderStart" );

// Register the sound callbacks.
Cheat.RegisterCallback( "bomb_begindefuse", "updateSoundTime" );
Cheat.RegisterCallback( "bomb_beginplant", "updateSoundTime" );
Cheat.RegisterCallback( "weapon_fire", "updateSoundTime" );
Cheat.RegisterCallback( "weapon_fire_on_empty", "updateSoundTime" );
Cheat.RegisterCallback( "weapon_reload", "updateSoundTime" );
Cheat.RegisterCallback( "weapon_zoom", "updateSoundTime" );
Cheat.RegisterCallback( "grenade_thrown", "updateSoundTime" );
Cheat.RegisterCallback( "player_spawned", "updateSoundTime" );
Cheat.RegisterCallback( "item_pickup", "updateSoundTime" );
Cheat.RegisterCallback( "player_footstep", "updateSoundTime" );
Cheat.RegisterCallback( "player_falldamage", "updateSoundTime" );
//endregion
//endregion
