/**
 *
 * Title: Color enhancements
 * Author: april#0001
 * Description: Enhances the color of your game
 *
*/

//region menu

// Our main switch
const enable = UI.AddCheckbox("Enable color enhancement");

// Our menu elements
const cc = UI.AddCheckbox("Color correction");
const cc_tint = UI.AddSliderInt("Tint", 0, 100);
const cc_intensity = UI.AddSliderInt("Intensity", 0, 100);

const fog = UI.AddCheckbox("Fog correction");
const fog_color = UI.AddColorPicker("Color");
const fog_distance = UI.AddSliderInt("Distance", 0, 2500);
const fog_density = UI.AddSliderInt("Density", 0, 100);

//endregion

//region functions

/**
 * Handles the visibility of our menu elements
 */
const handle_visibility = function()
{
    // Get booleans to make our life easier
    const main = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable color enhancement");
    const cc = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Color correction");
    const fog = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fog correction");

    // Our main switch should always be visible
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Enable color enhancement", true);

    // Update other elements based on their parents
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Color correction", main);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Tint", cc);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Intensity", cc);

    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Fog correction", main);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Color", fog);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Distance", fog);
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Density", fog);
};

/**
 * Updates the fog values
 */
const update_fog = function()
{
    // Check if Fog correction is enabled
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fog correction"))
    {
        // Check if the fog isn't already disabled (optimization)
        if (Convar.GetString("fog_override") !== "0")
        {
            Convar.SetString("fog_override", "0");
        }

        return;
    }

    // Check if the fog isn't already enabled (optimization)
    if (Convar.GetString("fog_override") !== "1")
    {
        Convar.SetString("fog_override", "1");
    }


    // Get our fog properties
    const clr = UI.GetColor("Misc", "JAVASCRIPT", "Script items", "Color");
    const clr_value = clr[0] + " " + clr[1] + " " + clr[2];

    const dist = UI.GetString("Misc", "JAVASCRIPT", "Script items", "Distance");
    const dens = (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Density") / 100).toString();

    // Check if the fog's color isn't the same as our desired color
    if (Convar.GetString("fog_color") !== clr_value)
    {
        // Update color
        Convar.SetString("fog_color", clr_value);
    }

    // Check if the fog's end distance isn't the same as our desired end distance
    if (Convar.GetString("fog_end") !== dist)
    {
        // Update distance
        Convar.SetString("fog_start", "0");
        Convar.SetString("fog_end", dist);
    }

    // Check if the fog's density isn't the same as our desired density
    if (Convar.GetString("fog_maxdensity") !== dens)
    {
        // Update density
        Convar.SetString("fog_maxdensity", dens);
    }

}

const draw_cc = function()
{
    // Check if Color correction isn't on
    if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Color correction"))
        return;

    // Get our drawing properties
    const tint = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Tint");
    const intensity = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Intensity");

    const x = Global.GetScreenSize()[0], y = Global.GetScreenSize()[1];

    // Draw our color correction layer
    Render.FilledRect(
        0,
        0,
        x,
        y,
        [tint,
         0,
         255 - tint,
         intensity
        ]
    );

}

// Handles the visibility whenever the script is loaded
handle_visibility();

// Disables the 3D skybox for better looking fog
Convar.SetString("r_3dsky", "0");

function main()
{

    // Callback our functions
    handle_visibility();
    update_fog();
    draw_cc();

}

//endregion

//region callbacks

// Register our callbacks
Global.RegisterCallback("Draw", "main");

//endregion

