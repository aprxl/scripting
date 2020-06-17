//region menu
UI.AddSliderInt("Tolerance", 0, 8);
UI.AddSliderInt("Shift", 1, 14);
//endregion

//region main
function _FrameNetUpdateStart( )
{
    Exploit.OverrideTolerance(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Tolerance"));
    Exploit.OverrideShift(UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Shift"));
}
//endregion

//region callbacks
Cheat.RegisterCallback("FRAME_NET_UPDATE_START", "_FrameNetUpdateStart");
//endregion
