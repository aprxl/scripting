
---
--- Title: Crimsync
--- Author: april#0001
--- Description: Recreates onetap's anti-aimbot system, originally made by Salvatore#0850
---

--region main
local main_c = {}
local main_mt = {__index = main_c}

--- Instantiate a main object.
--- @return table
function main_c.new()
    local properties = {
        menu = true,

        modes = {"Desync", "Anti-balance adjust"},

        manual_antiaiming = false,
        inverted = false
    }

    return properties
end

--- @class col_t
local col_t = {}

--- Creates a new color vector
--- @param r
--- @param g
--- @param b
--- @param a
--- @return col_t
function col_t.new(r, g, b, a)
    r = r or 255
    g = g or 255
    b = b or 255
    a = a or 255

    return {r = r, g = g, b = b, a = a}
end

-- Create our main class
local main = main_c.new()

-- Initiate our fonts
local font_main = draw.CreateFont("Verdana", 30, 500)
--endregion

--region Menu

-- Create color variables
local clr_arrows = gui.ColorEntry("crimsync_arrows", "Crimsync arrows", 255, 255, 255, 125)
local clr_outline_inv = gui.ColorEntry("crimsync_outline_inv", "Crimsync arrows desync", 50, 105, 170, 200)

-- Create menu elements
local window = gui.Window("crimsync", "Crimsync settings", 250, 500, 1265, 350)
local standing = gui.Groupbox(window, "Standing", 15, 15, 235, 285)
local running = gui.Groupbox(window, "Running", 265, 15, 235, 285)
local slowwalk = gui.Groupbox(window, "Slow-walking", 515, 15, 235, 285)
local manualaa = gui.Groupbox(window, "Manual anti-aiming", 765, 15, 235, 285)
local options = gui.Groupbox(window, "Lean options", 1015, 15, 235, 285)

local static_vars = gui.Groupbox(window, "static_vars", 0, 1020, 0, 0)

local body_lean = {
    [1] = gui.Slider(standing, "standing_lean", "Body lean", 55, 0, 100),
    [2] = gui.Slider(running, "running_lean", "Body lean", 55, 0, 100),
    [3] = gui.Slider(slowwalk, "slowwalk_lean", "Body lean", 55, 0, 100),
    [4] = gui.Slider(manualaa, "manual_lean", "Body lean", 55, 0, 100)
}

local inverted_body_lean = {
    [1] = gui.Slider(standing, "standing_lean_inv", "Inverted body lean", 55, 0, 100),
    [2] = gui.Slider(running, "running_lean_inv", "Inverted body lean", 55, 0, 100),
    [3] = gui.Slider(slowwalk, "slowwalk_lean_inv", "Inverted body lean", 55, 0, 100),
    [4] = gui.Slider(manualaa, "manual_lean_inv", "Inverted body lean", 55, 0, 100)
}

local desync_boxes = {
    [1] = gui.Combobox(standing, "standing_crooked", "Crooked modes", "Eye yaw", "Desync", "Sway", "Jitter"),
    [2] = gui.Combobox(running, "running_crooked", "Crooked modes", "Eye yaw", "Desync", "Sway", "Jitter"),
    [3] = gui.Combobox(slowwalk, "slowwalk_crooked", "Crooked modes", "Eye yaw", "Desync", "Sway", "Jitter"),
    [4] = gui.Combobox(manualaa, "manual_crooked", "Crooked modes", "Eye yaw", "Desync", "Sway", "Jitter")
}

local choke_limit = {
    [1] = gui.Slider(standing, "standing_choke", "Choke limit", 1, 1, 4),
    [2] = gui.Slider(running, "running_choke", "Choke limit", 15, 1, 16),
    [3] = gui.Slider(slowwalk, "slowwalk_choke", "Choke limit", 10, 1, 16)
}

local options_elements = {
    [1] = gui.Slider(options, "crimsync_fakelimit", "Max lean", 60, 0, 60),
    [2] = gui.Checkbox(options, "crimsync_freestand", "Freestanding", 0)
}

local manual_hotkeys = {
    [1] = gui.Keybox( manualaa, "manual_left", "Override left", 0x5A ),
    [2] = gui.Keybox( manualaa, "manual_right", "Override right", 0x43 ),
    [3] = gui.Keybox( manualaa, "manual_back", "Override back", 0x58 ),
    [4] = gui.Keybox( options, "manual_inv", "Invert", 0x56 )
}

--endregion

--region Functions

--region Locals

--- Calculates the local_player velocity
--- @return number
local function velocity()

    local local_player = entities.GetLocalPlayer()

    local x, y, z = local_player:GetPropVector("localdata", "m_vecVelocity[0]")

    return math.sqrt(x*x + y*y)

end

--- Checks if a UI element exists
--- @param var
--- @param complement
local function get_value(var, complement)

    if gui.GetValue( var .. complement ) ~= nil then
        return var .. complement
    end

    return nil

end

-- Creates our custom rendering system
local render = {}

--- Renders a new rectangle
--- @param x
--- @param y
--- @param w
--- @param h
--- @param clr
function render.rectangle(x, y, w, h, clr)
    draw.Color(clr.r, clr.g, clr.b, clr.a)
    draw.FilledRect(x, y, x + w, y + h)
end

--- Renders a new rectangle triangle
--- @param x
--- @param y
--- @param w
--- @param h
--- @param clr
function render.rect_triangle(x, y, w, h, clr)
    draw.Color(clr.r, clr.g, clr.b, clr.a)
    draw.Triangle(x, y, x + w, y + h, x, y + h)
end

--- Renders a new triangle pointing up
--- @param x
--- @param y
--- @param l
--- @param clr
function render.eq_triangle_up(x, y, l, clr)
    draw.Color(clr.r, clr.g, clr.b, clr.a)
    draw.Triangle(x, y - l / 2, x + l / 2, y + l / 2, x - l / 2, y + l / 2)
end

--- Renders a new triangle pointing down
--- @param x
--- @param y
--- @param l
--- @param clr
function render.eq_triangle_down(x, y, l, clr)
    draw.Color(clr.r, clr.g, clr.b, clr.a)
    draw.Triangle(x - l / 2, y - l / 2, x + l / 2, y - l / 2, x, y + l / 2)
end

--- Renders a new text
--- @param x
--- @param y
--- @param centered
--- @param shadow
--- @param font
--- @param clr
--- @param text
function render.text(x, y, centered, shadow, font, clr, text)
    draw.Color(clr.r, clr.g, clr.b, clr.a)
    draw.SetFont(font)

    local w, h = draw.GetTextSize(text)
    x = centered and x - w / 2 or x

    if shadow then
        draw.TextShadow(x, y, text)
    end

    draw.Text(x, y, text)
end

--- Renders a new circle
--- @param x
--- @param y
--- @param radius
--- @param outline
--- @param clr
function render.circle(x, y, radius, outline, clr)
    draw.Color(clr.r, clr.g, clr.b, clr.a)

    if outline then
        draw.OutlinedCircle(x, y, radius)
        return
    end

    draw.FilledCircle(x, y, radius)
end

--endregion

--- Updates the antiaim type
--- @return string
function main.update_state()

    local local_player = entities.GetLocalPlayer()

    if not local_player or not local_player:IsAlive() then
        return
    end

    local vel = velocity()

    if main.manual_antiaiming then
        return "manual"
    end

    if gui.GetValue( "msc_slowwalk" ) ~= 0 and input.IsButtonDown( gui.GetValue( "msc_slowwalk" ) ) then
        return "slowwalk"
    end

    if vel > 0.01 then
        return "running"
    end

    return "standing"

end


local states = {left = false, right = false, back = false, inv = false}
local m_state = gui.Slider(static_vars, "m_state", "m_state", 0, 0, 3)

--- Handles the input system for the manual anti-aim binds
function main.do_manualaa()

    if manual_hotkeys[1]:GetValue() == 0 or
       manual_hotkeys[1]:GetValue() == 0 or
       manual_hotkeys[1]:GetValue() == 0 or
       manual_hotkeys[1]:GetValue() == 0 then
        return
    end

    local input_left, input_right, input_back, input_inv, state = 
            input.IsButtonDown( gui.GetValue("manual_left") ),
            input.IsButtonDown( gui.GetValue("manual_right") ),
            input.IsButtonDown( gui.GetValue("manual_back") ),
            input.IsButtonDown( gui.GetValue("manual_inv") ),
            gui.GetValue( "m_state" )


    if input_left == states.left and 
       input_right == states.right and
       input_back == states.back and 
       input_inv == states.inv then
        return
    end

    states.left = input_left
    states.right = input_right
    states.back = input_back
    states.inv = input_inv

    if (input_inv) then
        main.inverted = not main.inverted
    end 

    if (input_left and state == 1) or (input_right and state == 2) or (input_back and state == 3) then
        gui.SetValue( "m_state", 0 )
        main.manual_antiaiming = false
        return
    end

    if (input_left and state ~= 1) then
        gui.SetValue( "m_state", 1 )
        main.manual_antiaiming = true
    end

    if (input_right and state ~= 2) then
        gui.SetValue( "m_state", 2 )
        main.manual_antiaiming = true
    end

    if (input_back and state ~= 3) then
        gui.SetValue( "m_state", 3 )
        main.manual_antiaiming = true
    end

end

--- Handles your menu
function main.menu_handle()
    window:SetActive(gui.Reference("MENU"):IsActive())
end

--- Updates your anti-aim
function main.do_antiaim()

    local local_player = entities.GetLocalPlayer()

    if not local_player or not local_player:IsAlive() then
        return
    end

    local current_type = main.update_state()
    local label_lean = main.inverted and get_value(current_type, "_lean_inv") or get_value(current_type, "_lean")
    local m_state = gui.GetValue("m_state")

    local lean = 59 - (0.59 * gui.GetValue(label_lean))

    local directions = {
        [0] = lean,
        [1] = -90 + lean,
        [2] = 90 + lean,
        [3] = 0 + lean
    }

    -- Do freestanding
    if options_elements[2]:GetValue() then
        gui.SetValue("rbot_antiaim_autodir", main.manual_antiaiming and 0 or 1)
    end

    -- Set anti-aim values
    gui.SetValue("rbot_antiaim_stand_real_add", directions[m_state])
    gui.SetValue("rbot_antiaim_move_real_add", directions[m_state])
    gui.SetValue("rbot_antiaim_edge_real_add", directions[m_state])

    -- Do choking
    -- Manual anti-aim doesn't have its own choke slider, so use current type's choke.
    local velocity = velocity()
    local choke_type = current_type == "manual" and ( ( gui.GetValue( "msc_slowwalk" ) ~= 0 and input.IsButtonDown( gui.GetValue( "msc_slowwalk" ) ) ) and "slowwalk" or (velocity > 0.01 and "running" or "standing") ) or current_type

    local choke_label = get_value(choke_type, "_choke")

    gui.SetValue("msc_fakelag_value", gui.GetValue(choke_label))

end

--- Updates your body desync
function main.do_desync()

    local local_player = entities.GetLocalPlayer()

    if not local_player or not local_player:IsAlive() then
        return
    end

    -- Invert desync
    gui.SetValue("rbot_antiaim_stand_desync", main.inverted and 2 or 3)
    gui.SetValue("rbot_antiaim_move_desync", main.inverted and 2 or 3)
    gui.SetValue("rbot_antiaim_edge_desync", main.inverted and 2 or 3)

    -- Fix lower body target
    local current_type = main.update_state()
    local desync_label = get_value(current_type, "_crooked")
    local max = options_elements[1]:GetValue()

    local target_angles = function(mode)
        if mode == 0 then -- Eye yaw
            return local_player:GetProp("m_angEyeAngles[1]")
        elseif mode == 1 then -- Desync
            return local_player:GetProp("m_angEyeAngles[1]") + (main.inverted and max or -max)
        elseif mode == 2 then -- Sway
            return local_player:GetProp("m_angEyeAngles[1]") + (-max + math.floor(globals.TickCount() % (max * 2)))
        elseif mode == 3 then -- Jitter
            return local_player:GetProp("m_angEyeAngles[1]") + ((globals.TickCount() % 30 > 15 ) and max or -max)
        end
    end

    local_player:SetProp("m_flLowerBodyYawTarget", target_angles(gui.GetValue(desync_label)))

end

local arrows = { [0] = {pos = {x = 0, y = 0}, text = ""}, [1] = {pos = {x = -50, y = 0}, text = "◄"}, [2] = {pos = {x = 50, y = 0}, text = "►"}, [3] = {pos = {x = 0, y = 50}, text = "▼"} }
--- Draws the manual anti-aim indicators
function main.draw_indicators()

    local local_player = entities.GetLocalPlayer()

    if not local_player or not local_player:IsAlive() then
        return
    end

    -- Get drawing properties
    local x, y = draw.GetScreenSize()
    local state = gui.GetValue("m_state")
    draw.SetFont(font_main)

    local offset = main.inverted and -50 or 50

    -- Draw dormant indicators
    -- Left
    render.text(x / 2 - 50, y / 2, true, false, font_main, col_t.new(125, 125, 125, 200), "◄")

    -- Center
    render.text(x / 2, y / 2 + 50, true, false, font_main, col_t.new(125, 125, 125, 200), "▼")

    -- Right
    render.text(x / 2 + 50, y / 2, true, false, font_main, col_t.new(125, 125, 125, 200), "►")

    -- Overlapping
    if (state == 1 and main.inverted) or (state == 2 and not main.inverted) then
        render.text(x / 2 + arrows[state].pos.x, y / 2 + arrows[state].pos.y, true, true, font_main, col_t.new(125, 0, 255, 200), arrows[state].text)
        return
    end

    -- Draw active indicator
    render.text(x / 2 + arrows[state].pos.x, y / 2 + arrows[state].pos.y, true, true, font_main, col_t.new(clr_arrows:GetValue()), arrows[state].text)

    -- Draw desync indicator
    render.text(x / 2 + offset, y / 2, true, false, font_main, col_t.new(clr_outline_inv:GetValue()), arrows[main.inverted and 1 or 2].text)

end

--endregion

--region Callbacks

callbacks.Register( "Draw", function()

    -- Do functions
    main.menu_handle()
    main.do_manualaa()
    main.do_antiaim()
    main.do_desync()

    local x, y = draw.GetScreenSize()
    local m_state = gui.GetValue("m_state")

    -- Draw our manual anti-aimbot indicators
    main.draw_indicators()

end
)

--endregion
