/*
 *
 * Title: Miss logs
 * Author: april#0001
 * Description: Checks if a ragebot_fire event successfully hit or not.
 *
 */
 
// DISCLAIMER:
// This is a framework to help other scripters to make their own ragebot logs
// with support for misses. This script on its own, although usable, isn't
// useful.

// Array to store all bullet information.
const bullets = [ ];

/**
 * Converts time in seconds into ticks.
 * @param time
 * @returns {number}
 */
function TIME_TO_TICKS( time ) {
    return Math.round( time / Globals.TickInterval( ) );
}

function onRagebot( ) {
    // Push bullet information to global array.
    bullets.push({
        tick: Entity.GetProp( Entity.GetLocalPlayer( ), "CBasePlayer", "m_nTickBase" ),
        time: 0,
        delay: TIME_TO_TICKS( Local.Latency( ) ),
        registered: false,
        hit: false
    })

    // Log action
    Cheat.Print( "[ " + Globals.Tickcount( ) + " ] Pushed\n" );
}

// Middle
function onBulletImpact( ) {
    // Get the player who shot.
    const userid = Entity.GetEntityFromUserID( Event.GetInt( "userid" ) );

    // Check if we aren't the ones who shot.
    if ( !Entity.IsLocalPlayer( userid ) )
        return;

    // Get current tickbase.
    const tick_count = Entity.GetProp( Entity.GetLocalPlayer( ), "CBasePlayer", "m_nTickBase" );

    // Loop through all bullets
    for ( var i = 0; i < bullets.length; i++ ) {
        // Get current bullet.
        const current = bullets[ i ];

        // Check if this bullet hasn't been registered and if it is
        // still valid for registration.
        if ( !current.registered && current.tick + current.delay >= tick_count ) {
            // Update registered state.
            current.registered = true;

            // Log action.
            Cheat.Print( "[ " + current.tick + " ] Registered\n" );
        }

    }
}

function onPlayerHurt( ) {
    // Get attacker
    const attacker = Entity.GetEntityFromUserID( Event.GetInt( "attacker" ) );

    // Check if we aren't the one who attacked.
    if ( !Entity.IsLocalPlayer( attacker ) )
        return;

    // Get current tickbase.
    const tick_count = Entity.GetProp( Entity.GetLocalPlayer( ), "CBasePlayer", "m_nTickBase" );

    // Loop through all bullets.
    for ( var i = 0; i < bullets.length; i++ ) {
        // Get current bullet.
        const current = bullets[ i ];

        // Check if this bullet has already been registered on bullet_impact,
        // if it hasn't hit a player yet and if it is still valid.
        if ( current.registered && !current.hit && current.tick + current.delay >= tick_count ) {
            // Update hit status.
            current.hit = true;

            // Log action.
            Cheat.Print( "[ " + current.tick + " ] Hit\n" );
        }
    }
}

function onNetUpdateStart( ) {
    // Loop through all bullets.
    for ( var i = 0; i < bullets.length; i++ ) {
        // Get current bullet.
        const current = bullets[ i ];

        // Check if bullet_impact hasn't registered this bullet yet.
        if ( !current.registered )
            continue;

        // Increment bullet's time.
        current.time++;

        // Check if this bullet's registration time is over, meaning that the
        // script should already have an answer for whether or not it hit.
        if ( current.time >= current.delay ) {
            // Log whether or not it hit.
            Cheat.Print( "[ " + current.tick + " ] The shot has " + ( current.hit ? "HIT" : "MISSED" ) + ".\n" );

            // Delete this bullet's information.
            bullets.splice( i, 1 );
        }
    }
}

// Register callbacks
Cheat.RegisterCallback( "FRAME_NET_UPDATE_START", "onNetUpdateStart" );
Cheat.RegisterCallback( "ragebot_fire", "onRagebot" );
Cheat.RegisterCallback( "player_hurt", "onPlayerHurt" );
Cheat.RegisterCallback( "bullet_impact", "onBulletImpact" );
