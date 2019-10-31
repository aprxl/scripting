
---
--- Title: Crimsync
--- Author: april#0001
--- Description: Recreates onetap's anti-aimbot system, originally made by Salvatore#0850
--- Version: 1.2
---

--region main
local main_c = {}
local main_mt = {__index = main_c}

--- Instantiate a main object.
--- @return table
function main_c.new()
    local properties = {
        menu = true,

        modes = {"Desync", "Twist", "Anti-balance adjust"},

        manual_antiaiming = false,
        inverted = false
    }

    return properties
end

-- Create our main class
local main = main_c.new()

-- Initiate our fonts
local font_main = draw.CreateFont("Verdana", 30, 500)
--endregion

--region Menu

-- Create color variables
local clr_arrows = gui.ColorEntry("crimsync_arrows", "Crimsync arrows", 255, 255, 255, 125)
local clr_outline = gui.ColorEntry("crimsync_outline", "Crimsync outline", 100, 100, 100, 200)
local clr_outline_inv = gui.ColorEntry("crimsync_outline_inv", "Crimsync outline inverted", 50, 105, 170, 200)

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
    [1] = gui.Multibox(standing, "Crooked modes"),
    [2] = gui.Multibox(running, "Crooked modes"),
    [3] = gui.Multibox(slowwalk, "Crooked modes"),
    [4] = gui.Multibox(manualaa, "Crooked modes")
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

local desync_modes = {
    [1] = {
        [1] = gui.Checkbox(desync_boxes[1], "standing_desync", "Desync", 0),
        [2] = gui.Checkbox(desync_boxes[1], "standing_twist", "Twist", 0),
        --[3] = gui.Checkbox(desync_boxes[1], "standing_anti", "Anti-balance adjust", 0)
    },

    [2] = {
        [1] = gui.Checkbox(desync_boxes[2], "running_desync", "Desync", 0),
        [2] = gui.Checkbox(desync_boxes[2], "running_twist", "Twist", 0)
    },

    [3] = {
        [1] = gui.Checkbox(desync_boxes[3], "slowwalk_desync", "Desync", 0),
        [2] = gui.Checkbox(desync_boxes[3], "slowwalk_twist", "Twist", 0)
    },

    [4] = {
        [1] = gui.Checkbox(desync_boxes[4], "manual_desync", "Desync", 0),
        [2] = gui.Checkbox(desync_boxes[4], "manual_twist", "Twist", 0)
    }
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

    if gui.GetValue("manual_left") == 0 or
       gui.GetValue("manual_right") == 0 or
       gui.GetValue("manual_back") == 0 or 
       gui.GetValue("manual_inv") == 0 then
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

    local twist_label = get_value(current_type, "_twist")
    local choke_label = get_value(choke_type, "_choke")

    -- Fakeduck override
    if input.IsButtonDown(gui.GetValue("rbot_antiaim_fakeduck")) then
        gui.SetValue("msc_fakelag_value", 15)
        return
    end

    gui.SetValue("msc_fakelag_value", gui.GetValue(twist_label) and 2 or gui.GetValue(choke_label))

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
    local desync_label = get_value(current_type, "_desync")
    local max = options_elements[1]:GetValue()

    local target_angles = gui.GetValue(desync_label) and local_player:GetProp("m_angEyeAngles[1]") + (main.inverted and max or -max) or local_player:GetProp("m_angEyeAngles[1]")

    local_player:SetProp("m_flLowerBodyYawTarget", target_angles)

end

local arrows = { [0] = {pos = 0, text = ""}, [1] = {pos = -70, text = "◄"}, [2] = {pos = 45, text = "►"}, [3] = {pos = -15, text = "▼"} }
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

    local outline_clr = main.inverted and clr_outline_inv or clr_outline

    -- Draw box outline
    draw.Color(outline_clr:GetValue())
    draw.OutlinedRect( x / 2 - 91, y - 161, x / 2 + 91, y - 101)

    -- Draw box background
    draw.Color(25, 25, 25, 125)
    draw.FilledRect( x / 2 - 90, y - 160, x / 2 + 90, y - 100)

    -- Draw dormant indicators
    -- Left
    draw.Color( 10, 10, 10, 200 )
    draw.Text( x / 2 - 70, y - 145, "◄")

    -- Center
    draw.Color( 10, 10, 10, 200 )
    draw.Text( x / 2 - 15, y - 145, "▼")

    -- Right
    draw.Color( 10, 10, 10, 200 )
    draw.Text( x / 2 + 45, y - 145, "►")

    -- Draw active indicator
    draw.Color( clr_arrows:GetValue() )
    draw.Text( x / 2 + arrows[state].pos, y - 145, arrows[state].text)

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
