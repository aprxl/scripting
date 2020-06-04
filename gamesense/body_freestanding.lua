---
--- Title: Better body freestanding
--- Description: A trace-based body freestanding with more customization.
--- Author: april#0001
---

---region menu
-- Create my menu elements
local enable = ui.new_checkbox("AA", "Anti-aimbot angles", "Better body freestanding")
local mode = ui.new_combobox("AA", "Anti-aimbot angles", "Body freestanding mode", { "Hide real", "Hide fake" })
local smart = ui.new_checkbox("AA", "Anti-aimbot angles", "Smart mode")

-- And reference the ones I'll be using
local ref_body_freestanding = ui.reference("AA", "Anti-aimbot angles", "Freestanding body yaw")
local ref_body_yaw, ref_body_yaw_offset = ui.reference("AA", "Anti-aimbot angles", "Body yaw")
local ref_fake_limit = ui.reference("AA", "Anti-aimbot angles", "Fake yaw limit")
---endregion

---region locals
-- Create the table where all my info will be stored
local data = {
    side = 1,
    last_side = 0,

    last_hit = 0,
    hit_side = 0
}
---endregion

---region functions
local on_setup_command = function(cmd)
    -- Get local player
    local me = entity.get_local_player()

    -- If our local player is invalid or if we're dead, return
    if not me or entity.get_prop(me, "m_lifeState") ~= 0 then
        return
    end

    -- Get the server's current time
    local now = globals.curtime()

    -- Check if our smart mode behaviour is done
    if data.hit_side ~= 0 and now - data.last_hit > 5 then
        -- If so, set the last side to '0' so the anti-aim updates
        data.last_side = 0

        -- And reset the smart mode info
        data.last_hit = 0
        data.hit_side = 0
    end

    -- Get what mode our freestanding is using
    local _mode = ui.get(mode)

    -- Get some properties
    local x, y, z = client.eye_position()
    local _, yaw = client.camera_angles()

    -- Create a table where the trace data will be stored
    local trace_data = {left = 0, right = 0}

    for i = yaw - 90, yaw + 90, 30 do
        -- I don't know an alternative for continue so..
        -- Don't do any calculations if the current angle is equal to our yaw
        -- This means that this is the center point and thus it doesn't contribute to the calculations
        if i ~= yaw then
            -- Convert our yaw to radians in order to do further calculations
            local rad = math.rad(i)

            -- Calculate our destination point
            local px, py, pz = x + 256 * math.cos(rad), y + 256 * math.sin(rad), z

            -- Trace a line from our eye position to the previously calculated point
            local fraction = client.trace_line(me, x, y, z, px, py, pz)
            local side = i < yaw and "left" or "right"

            -- Add the trace's fraction to the trace table
            trace_data[side] = trace_data[side] + fraction
        end
    end

    -- Get which side has the lowest fraction amount, which means that it is closer to us.
    data.side = trace_data.left < trace_data.right and 1 or 2

    -- If our side didn't change from the last tick then there's no need to update our anti-aim
    if data.side == data.last_side then
        return
    end

    -- If it did change, then update our cached side to do further checks
    data.last_side = data.side

    -- Check if we should override our side due to the smart mode
    if data.hit_side ~= 0 then
        data.side = data.hit_side == 1 and 2 or 1
    end

    -- Get the fake angle's maximum length and calculate what our next body offset should be
    local limit = ui.get(ref_fake_limit)
    local lby = _mode == "Hide real" and (data.side == 1 and limit or -limit) or (data.side == 1 and -limit or limit)

    -- Update our body yaw settings
    ui.set(ref_body_yaw, "Static")
    ui.set(ref_body_yaw_offset, lby)
end

local on_paint = function()
    -- Get local player
    local me = entity.get_local_player()

    -- If our local player is invalid or if we're dead, return
    if not me or entity.get_prop(me, "m_lifeState") ~= 0 then
        return
    end

    -- Calculate our desync length
    -- Thanks sapphyrus!
    local body = math.max(-60, math.min(60, entity.get_prop(me, "m_flPoseParameter", 11) or 0) * 120 - 60)
    local perc = math.abs(body) / 60

    -- Calculate the indicator's color based on our desync length
    local r, g, b = 192 - (perc * 71), 32 + (perc * 146), 28

    -- Render our indicator and get its vertical offset
    local y = renderer.indicator(r, g, b, 200, "FAKE")

    -- Render a circle indicator next to it just for that extra visual pleasure
    renderer.circle_outline(85, y + 20, 10, 10, 10, 125, 8, 0, 1, 3)
    renderer.circle_outline(85, y + 20, r, g, b, 200, 8, -90, perc, 3)
end

local on_player_hurt = function(e)
    -- Check if smart mode is disabled
    if not ui.get(smart) then
        return
    end

    -- Get the event's entities
    local me = entity.get_local_player()
    local userid, attacker = client.userid_to_entindex(e.userid), client.userid_to_entindex(e.attacker)

    -- Check if we're the one who got hurt and not the one who hurt us
    if me == userid and me ~= attacker then
        -- If so, set the last side to '0' so the anti-aim updates
        data.last_side = 0

        -- Update our smart mode info
        data.last_hit = globals.curtime()
        data.hit_side = data.side
    end
end

local handle_menu_visibility = function(self)
    -- Get if the script is enabled and determine if we should set or unset the callbacks
    local enabled = ui.get(self)
    local callback = enabled and client.set_event_callback or client.unset_event_callback

    -- Update the other elements' visibility
    ui.set_visible(mode, enabled)
    ui.set_visible(smart, enabled)

    ui.set_visible(ref_body_freestanding, not enabled)

    -- Register/Unregister our callbacks
    callback("setup_command", on_setup_command)
    callback("paint", on_paint)
    callback("player_hurt", on_player_hurt)
end

-- Execute this whenever the script is first enabled
handle_menu_visibility(enable)
---endregion

---region callbacks
-- Register the UI callbacks
ui.set_callback(enable, handle_menu_visibility)
ui.set_callback(mode, function(self)
    -- Set the last side to '0' so the anti-aim updates
    data.last_side = 0
end)
---endregion
