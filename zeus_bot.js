/**
*
* Title: Zeusbot
* Author: april#0001
* Description: An automatic zeus aimbot for legit play.
*
*/

/**
 * @title BetterUI
 * @version 1.0.2
 * @description A better UI system for Onetap
 */

var menu_elements_t = [];
var menu_c = [];
const menu_spacer = "                                                                                  ";

/**
 * Creates a new menu label
 *
 * @param label {string}
 */
menu_c.label = function(label)
{
    // Creates the label
    UI.AddLabel(label);
}

/**
 * Creates a new menu element
 *
 * @param func {function}
 * @param name {string}
 * @param label {string},
 * @param properties {array}
 */
menu_c.call = function(func, name, label, properties)
{
    // If the label isn't unique
    if (label in menu_elements_t)
        throw new Error("[Menu] The label must be unique!");

    // Get properties
    const final_name = name + menu_spacer + label;
    var final_props = [final_name];
    const element_info_t = {
        name: name,
        label: label,
        properties: properties
    };

    // If our properties aren't null, then pack them together.
    if (properties !== null)
    {
        for (var i = 0; i < properties.length; i++)
        {
            final_props.push(properties[i]);
        }
    }

    // Create our menu element and return properties
    func.apply(null, final_props);
    menu_elements_t[label] = element_info_t;
    return label;
}

/**
 * Gets the value of a menu element
 *
 * @param label {string}
 * @return {any}
 */
menu_c.get = function(label)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Returns the element's value
    return UI.GetValue("Misc", "JAVASCRIPT", "Script items", final_name);
}

/**
 * Gets the value of a menu element
 *
 * @param label {string}
 * @return {any}
 */
menu_c.get_hotkey = function(label)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Returns the element's value
    return UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", final_name);
}

/**
 * Gets the value of a menu element
 *
 * @param label {string}
 * @return {any}
 */
menu_c.get_color = function(label)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Returns the element's value
    return UI.GetColor("Misc", "JAVASCRIPT", "Script items", final_name);
}

/**
 * Sets the value of a menu element
 *
 * @param label {string}
 * @param value {any}
 */
menu_c.set = function(label, value)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Set the element's value
    UI.SetValue("Misc", "JAVASCRIPT", "Script items", final_name, value);
}

/**
 * Changes the visibility of a menu elements
 *
 * @param label {string}
 * @param visible {boolean}
 */
menu_c.visibility = function(label, visible)
{
    // If the label doesn't exist
    if (!(label in menu_elements_t))
        throw new Error("[Menu] This element's label doesn't exist!");

    // Get properties
    const properties = menu_elements_t[label];
    const final_name = properties.name + menu_spacer + properties.label;

    // Change the element's visibility
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", final_name, visible);
}


/**
 * Creates a new 3D Vector instance from an array
 *
 * @param  {array} array Our base array
 * @return {Vector3D}
 */
function vec3(array)
{
    return {
        x: array[0],
        y: array[1],
        z: array[2]
    };
}

/**
 * Adds a 3D Vector to another 3D Vector
 *
 * @param  {Vector} vec  Our first vector parameter
 * @param  {Vector} vec2 Our second vector parameter
 * @return {Vector}
 */
function vec_add(vec, vec2)
{
    return {
        x: vec.x + vec2.x,
        y: vec.y + vec2.y,
        z: vec.z + vec2.z
    };
}

/**
 * Substracts a 3D Vector from another 3D Vector
 *
 * @param  {Vector} vec  Our first vector parameter
 * @param  {Vector} vec2 Our second vector parameter
 * @return {Vector}
 */
function vec_sub(vec, vec2)
{
    return {
        x: vec.x - vec2.x,
        y: vec.y - vec2.y,
        z: vec.z - vec2.z
    };
}

/**
 * Multiplies a 3D Vector to another 3D Vector
 *
 * @param  {Vector} vec  Our first vector parameter
 * @param  {Vector} vec2 Our second vector parameter
 * @return {Vector}
 */
function vec_mult(vec, vec2)
{
    return {
        x: vec.x * vec2.x,
        y: vec.y * vec2.y,
        z: vec.z * vec2.z
    };
}


/**
 * Converts a radian value to a degree
 *
 * @param {number} rad Our initial radian
 * @return {number}
 */
const rad_deg = function(rad)
{
    return rad * 180 / Math.PI;
}


/**
 * Gets the distance between two 3D vectors
 *
 * @param {Vector} vec
 * @param {Vector} vec2
 * @return {number}
 */
const distance3d = function(vec, vec2)
{
    // Substract the initial vector from the final vector
    const sub = vec_sub(vec2, vec);

    // Calculate and return distance
    return Math.sqrt(sub.x * sub.x + sub.y * sub.y + sub.z * sub.z);
}


/**
 * Unpacks an array into another array without values
 *
 * @param {Array} Array
 * @return {Array}
 */
const unpack = function(array)
{
    // Create the array we'll be pushing our elements into
    var final = [];

    // Loops for every element inside our parameter array
    for (var i in array)
    {
        // Push values
        final.push(array[i]);
    }

    // Return final array
    return final;
}
//endregion

//region main

// Create our variables
var old_index = -1;
var shot = false;
var is_zeus = false;

//endregion

//region menu

// Create our main switch
const enable = menu_c.call(UI.AddCheckbox, "Zeusbot", "zeus_enable", null);

//endregion

//region functions

// Create our target system instance
const target = {};


/**
 * Calculates the FOV distance, nearest hitbox and angles of an Entity
 *
 * @param {Entity | Number} ent The entity our calculation will be based on
 * @param {Vector} eye_pos Our local player's eye position
 * @param {Vector} angles Our local player's eye angles
 * @return {Array}
 */
target.calculate_fov = function(ent, eye_pos, angles)
{
    // Create the array we're our data will be saved
    var data = {fov: 360, hitbox: -1, angles: []};

    // Loops between body, pelvis and chest
    for (var i = 2; i < 7; i++)
    {
        // Get our vectors
        const hitbox = vec3(Entity.GetHitboxPosition(ent, i));
        const sub = vec_sub(hitbox, eye_pos);

        // Calculate our angles based on the previously calculated vectors
        const yaw = rad_deg(Math.atan2(sub.y, sub.x));
        const pitch = -rad_deg(Math.atan2(sub.z, Math.sqrt(sub.x * sub.x + sub.y * sub.y)));

        // Calculate the difference between our local angles and the calculated angles
        const yaw_dif = Math.abs(angles.y % 360 - yaw % 360) % 360;
        const pitch_dif = Math.abs(angles.x - pitch) % 360;

        // Normalize the yaw
        if (yaw_dif > 180)
            yaw_dif = 360 - yaw_dif;

        // Calculate the FOV
        const distance = Math.sqrt(pitch_dif * pitch_dif + yaw_dif * yaw_dif);

        // If this FOV is lower than our cached FOV, then update our data
        if (distance < data.fov)
        {
            // Update our data
            data.fov = distance;
            data.hitbox = i;
            data.angles = [pitch, yaw];
        }
    }

    // Return gathered data
    return data;
}


/**
 * Gets the entity index of our target
 *
 * @return {Void}
 */
target.get_target = function()
{
    // Get our properties
    const player = Entity.GetLocalPlayer();
    const eye_pos = vec3(Entity.GetEyePosition(player));
    const eye_angles = vec3(Local.GetViewAngles());

    // Get our enemies
    const enemies = Entity.GetEnemies();

    // Create the array we're our data will be saved
    const data = {fov: 360, id: -1, hitbox: -1, angles: []};

    // Loops for every enemy
    for (var i = 0; i < enemies.length; i++)
    {
        // Our current enemy
        const ent = enemies[i];

        // Check if our enemy is valid for our purposes
        if (Entity.IsValid(ent) && Entity.IsAlive(ent) && !Entity.GetProp(ent, "CCSPlayer", "m_bGunGameImmunity"))
        {
            // Calculate the FOV
            const fov_info = target.calculate_fov(ent, eye_pos, eye_angles);

            // If our calculated FOV is lower than the cached FOV, then update data
            if (fov_info.fov < data.fov)
            {
                // Update data
                data.fov = fov_info.fov;
                data.id = ent;
                data.hitbox = fov_info.hitbox;
                data.angles = fov_info.angles;
            }
        }
    }

    // Return gathered target and data
    return data;
}

target.is_zeus = function()
{
    // Gets our properties
    const player = Entity.GetLocalPlayer();
    const weapon_id = Entity.GetProp(Entity.GetWeapon(player), "CBaseAttributableItem", "m_iItemDefinitionIndex") & 0xFFFF;

    // If our current weapon index is the same as the cached one, then we didn't swap between weapons
    if (weapon_id === old_index)
        return;

    // Otherwise, cache our weapon index for further calculations
    old_index = weapon_id;

    // If our weapon is a zeus, then set is_zeus to true. Otherwise, set it to false.
    if (weapon_id === 31)
        is_zeus = true;
    else
        is_zeus = false;
}

// Create our aiming system instance
var aim = {};


/**
 * Where the aimbot magic happens (I love this meme.)
 *
 * @return {Void}
 */
aim.do = function()
{
    // If the zeusbot isn't enable, then no need to do the aimbot
    if (!menu_c.get(enable))
        return;

    // Checks if we did shoot
    if (shot)
    {
        // If we did, then update buttons, set shot to false and return, otherwise, we won't be able to shoot again.
        Cheat.ExecuteCommand("-attack");
        shot = false;
        return;
    }

    // If our current weapon ins't a zeus, then no need to do aimbot
    if (!is_zeus)
        return;

    // Get our local player
    const player = Entity.GetLocalPlayer();

    // If our local player insn't valid or if we're dead, return
    if (!player || !Entity.IsAlive(player))
        return;

    // Get our target and its info
    const data = target.get_target();

    // If there's no target, then return
    if (data.id === -1)
        return;

    // Get our propeties
    const eye_pos = vec3(Entity.GetEyePosition(player));
    const hitbox = vec3(Entity.GetHitboxPosition(data.id, data.hitbox));

    // Do checks
    const trace = Trace.Line(player, unpack(eye_pos), unpack(hitbox));
    const dst = distance3d(eye_pos, hitbox);

    // If our checks are true then...
    if (dst < 150 && !shot && trace[1] > 0.88)
    {
        // Do aimbot, fire and update data
        Local.SetViewAngles([data.angles[0], data.angles[1], 0]);
        Cheat.ExecuteCommand("+attack");
        shot = true;
    }

}

//endregion

//region callbacks

// Callback our functions otherwise nothing will happen
// Haha, another PaintTraverse aimbot.
Cheat.RegisterCallback("Draw", "target.is_zeus");
Cheat.RegisterCallback("Draw", "aim.do");

//endregion
