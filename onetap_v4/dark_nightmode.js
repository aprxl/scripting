/*
*
* Title: Dark night mode
* Author: april#0001
* Description: Makes your night mode darker
*
*/

//region Locals
//region Consts
// Declare our CEnvTonemapController's ClassID.
const CEnvTonemapController = 69;
//endregion

// Create a cache object to store our cached variables.
var cache = {
    amount: -1
};
//endregion

//region Menu
// Create a reference to the night mode slider.
const ref_night_mode = [ "Visuals", "World", "General", "Night mode" ];
//endregion

//region Functions
//region Other
/**
 * Updates the CEnvTonemapController's props.
 * @param number entity 
 * @param number min 
 * @param number max 
 */
function updateAutoExposure( entity, min, max ) {
    // Force the entity to use our custom values for auto exposure
    Entity.SetProp( entity, "CEnvTonemapController", "m_bUseCustomAutoExposureMin", true );
    Entity.SetProp( entity, "CEnvTonemapController", "m_bUseCustomAutoExposureMax", true );

    // And bloom.
    Entity.SetProp( entity, "CEnvTonemapController", "m_bUseCustomBloomScale", true );

    // Override the custom values.
    Entity.SetProp( entity, "CEnvTonemapController", "m_flCustomAutoExposureMin", min );
    Entity.SetProp( entity, "CEnvTonemapController", "m_flCustomAutoExposureMax", max );

    Entity.SetProp( entity, "CEnvTonemapController", "m_flBloomSaturation", 5 );
    Entity.SetProp( entity, "CEnvTonemapController", "m_flCustomBloomScaleMinimum", min / 0.1 * 5 );
    Entity.SetProp( entity, "CEnvTonemapController", "m_flCustomBloomScale", max / 0.1 * 5 );
}
//endregion

//region Callbacks
// Hana forced me into naming the callback MSPaint uwu
function msPaint(  ) {

    // Check if our local player is a valid entity.
    // Do this to check if we're connected to a game.
    if ( !Entity.IsValid( Entity.GetLocalPlayer(  ) ) )
        return;

    // Get our current CEnvTonemapController.
    const tonemap_controller = Entity.GetEntitiesByClassID( CEnvTonemapController )[ 0 ];

    // Check if our CEnvTonemapController is valid.
    if ( !Entity.IsValid( tonemap_controller ) )
        return;

    // Get our night mode amount.
    const amount = UI.GetValue( ref_night_mode );

    // Check if our value has changed from the last frame to this frame.
    // Doing this for better performance as we don't need to change
    // the props every frame.
    if ( cache.amount === amount )
        return;

    // Cache our current amount for further checks.
    cache.amount = amount;
    
    // Update the auto exposure and bloom.
    updateAutoExposure(
        tonemap_controller,
        amount * 0.1,
        amount * 0.1
    );
}

// Register our Draw callback
// Global just to piss everyone off ( also Hana's idea ).
Global.RegisterCallback( 'Draw', 'msPaint' );
//endregion
//endregion
