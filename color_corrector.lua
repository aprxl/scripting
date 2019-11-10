---
--- Title: Noble Color Corrector
--- Author: april#0001
--- Description: Creates a color correction effect in-game
---

--region menu

-- Our main reference
local ref = gui.Reference("MISC", "GENERAL", "Extra")

-- Creates our menu elements
local enable = gui.Checkbox(ref, "noble_cc_enable", "Enable color correction", 0)
local tint = gui.Slider(ref, "noble_cc_tint", "Tint", 50, 0, 100)
local intensity = gui.Slider(ref, "noble_cc_int", "Intensity", 25, 0, 100)
local saturation = gui.Slider(ref, "noble_cc_sat", "Saturation", 100, 0, 100)

--endregion

--region callbacks

callbacks.Register("Draw", function()

    if not enable:GetValue() then
        return
    end

    -- Get drawing properties
    local x, y = draw.GetScreenSize()
    local value_sat = (saturation:GetValue() / 100) * 255
    local value_tint = tint:GetValue() * (value_sat / 100)
    local value_intensity = intensity:GetValue() * 0.75

    draw.Color(
            value_tint,
            0,
            value_sat - value_tint,
            value_intensity
        )

    draw.FilledRect(0, 0, x, y)

end
)

--endregion
