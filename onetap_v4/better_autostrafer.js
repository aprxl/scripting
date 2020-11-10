/*
*
* Title: Better auto strafer
* Author: april#0001
* Description: Overrides auto strafer velocity to make it more responsive on high air accelerate servers.
*
*/

//region Locals
// Create our cache object where cached variables will be stored.
var cache = {
    turn_speed: 0
}
//endregion

//region Menu
// Create references to the menu elements I'll be using.
const ref_autostrafe = [ "Misc.", "Movement", "General", "Auto strafe" ];
const ref_turnspeed = [ "Misc.", "Movement", "General", "Turn speed" ];
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
//endregion

//region Others
/**
 * Gets the horizontal speed of an entity.
 * @param number entity 
 */
function getEntitySpeed( entity ) {
    // Get the velocity vector.
    const velocity = Entity.GetProp( entity, "CBasePlayer", "m_vecVelocity[0]" );
    
    // Calculate speed and return it.
    return Math.sqrt( velocity[ 0 ] * velocity[ 0 ] + velocity[ 1 ] * velocity[ 1 ] );
}
//endregion

//region Callbacks
function onLoad(  ) {
    // Hide the 'Turn speed' slider so the user doesn't try to change it.
    // It's not like they'd be able to either way.
    UI.SetEnabled( ref_turnspeed, 0 );

    // Cache our turn speed so we can restore it on unload.
    cache.turn_speed = UI.GetValue( ref_turnspeed );
}

function onUnload(  ) {
    // Restore our turn speed whenever the script is unloaded.
    UI.SetValue( ref_turnspeed, cache.turn_speed );
}

function onCreateMove(  ) {

    // Check if our auto stafer is on 'Directional' mode.
    if (UI.GetValue( ref_autostrafe ) != 3 )
        return;

    // Get our local player and its speed.
    const me = Entity.GetLocalPlayer(  );
    const speed = getEntitySpeed( me );

    // Calculate our air acceleration multiplier. This is calculated in a way that
    // sv_airaccelerate 12, the default value, is 0 and sv_airaccelerate 100, the 
    // most common used value on HvH servers, is 1.
    const air_accel = clamp( -0.12 + Convar.GetFloat( "sv_airaccelerate" ) * 0.01, 0, 1 );

    // Calculate the base turn speed that the auto strafer will be
    // working with.
    const base_speed = 10 + air_accel * 90;

    // Calculate our speed multiplier. This is calculated in a way that 0 speed is
    // 0 and 320 speed, default value of sv_maxspeed, is 1.
    const speed_multiplier = clamp( speed / 320, 0, 1 );

    // Calculate the additional turn speed. This is makes so the higher our speed
    // and the higher the sv_airaccelerate, the faster we'll turn.
    const additional_speed = 200 * air_accel * speed_multiplier;

    // Override our 'Turn speed' slider's value.
    UI.SetValue( ref_turnspeed, base_speed + additional_speed );
}

// Call this once whenever the script first loads.
onLoad(  );

// Register our other callbacks.
Cheat.RegisterCallback( "CreateMove", "onCreateMove" );
Cheat.RegisterCallback( "Unload", "onUnload" );
//endregion
//endregion
