/**
*
* Title: Quick stop
* Author: april#0001
* Description: A custom quick stop system for Onetap.
*
*/

//region dependencies

/**
 * @title BetterUI
 * @version 1.0.0
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
menu_c.label = function(label, upper, lower)
{
    // Creates the label
    if (upper)
        UI.AddLabel(" ");

    UI.AddLabel(label);

    if (lower)
        UI.AddLabel(" ");
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
* @title Vector3D
* @version 1.0.0
* @description A simple 3D vector library
*/

var vec3 = {__index: "vec3"};

vec3.new = function(x, y, z)
{
    if (x instanceof Array)
        return {
            x: x[0],
            y: x[1],
            z: x[2]
        };

    return {
        x: x,
        y: y,
        z: z
    }
}

vec3.unpack = function(self)
{
    return [self.x, self.y, self.z];
}

vec3.add = function(vec, vec2)
{
    if (vec2 instanceof Number)
        return {
            x: vec.x + vec2,
            y: vec.y + vec2,
            z: vec.z + vec2
    }

    return {
        x: vec.x + vec2.x,
        y: vec.y + vec2.y,
        z: vec.z + vec2.z
    }
}

vec3.sub = function(vec, vec2)
{
    if (vec2 instanceof Number)
        return {
            x: vec.x - vec2,
            y: vec.y - vec2,
            z: vec.z - vec2
    }

    return {
        x: vec.x - vec2.x,
        y: vec.y - vec2.y,
        z: vec.z - vec2.z
    }
}

vec3.multiply = function(vec, vec2)
{
    if (vec2 instanceof Number)
        return {
            x: vec.x * vec2,
            y: vec.y * vec2,
            z: vec.z * vec2
    }

    return {
        x: vec.x * vec2.x,
        y: vec.y * vec2.y,
        z: vec.z * vec2.z
    }
}

vec3.divide = function(vec, vec2)
{
    if (vec2 instanceof Number)
        return {
            x: vec.x / vec2,
            y: vec.y / vec2,
            z: vec.z / vec2
    }

    return {
        x: vec.x / vec2.x,
        y: vec.y / vec2.y,
        z: vec.z / vec2.z
    }
}

vec3.length = function(self)
{
    return Math.sqrt((self.x * self.x) + (self.y * self.y) + (self.z * self.z));
}

vec3.distance = function(self, destination)
{
    return vec3.length(vec3.sub(destination, self));
}


/**
 * @title Better Colors
 * @version 1.2
 * @description A basic color system for javascript
 */

// Create our main color instance
var color = {/* @mio#9999 zZz */};

/**
 * Create a new RGBA color instance
 *
 * @param r {number} <0, 255>       Red value
 * @param g {number} <0, 255>       Green value
 * @param b {number} <0, 255>       Blue value
 * @param a {number} <0, 255>       Alpha value
 * @return {Color | Array}
 */
color.new_rgba = function(r, g, b, a)
{
    // Check if our value(s) are valid
    if (!r || !g || !b || !a)
        throw new Error("[Color] Invalid color values!");

    // Return the color values
    return {
        r: r,
        g: g,
        b: b,
        a: a
    };
};


/**
 * Creates a new HEXA color instance
 *
 * @param hex {string} <0, 0xFFFFFF>        Hex value
 * @param alpha {number} <0, 255>           Alpha value
 * @return {Color | Array}
 */
color.new_hexa = function(hex, a)
{
    // Check if our value(s) are valid
    if (!hex || !a)
        throw new Error("[Color] Invalid color values!");

    // Create the initial values
    var r, g, b;

    // Check is our HEX code contains a "#"
    if (hex.length > 6)
    {
        // Parse integers
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    } else {
        // Otherwise, parse integers as well
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    }

    // Return the color values
    return {
        r: r,
        g: g,
        b: b,
        a: a,

        // Cache the hex value for further usage
        hex: hex
    };
};


/**
 * Creates a new HSLA color instance
 *
 * @param h {Number} <0, 360>       Hue
 * @param s {Number} <0, 100>       Saturation
 * @param l {Number} <0, 100>       Lightness
 * @return {Color | Array}
 */
color.new_hsla = function(h, s, l, a)
{
    // Check if our value(s) are valid
    if (!h || !s || !l || !a)
        throw new Error("[Color] Invalid color values!");

    // Create the initial values
    var r, g, b;

    // Fix the ratio of HSL value
    h /= 360;
    s /= 100;
    l /= 100;

    //If our saturation is 0, then, there's no colors
    if (s === 0)
    {
        // So, all colors are the same.
        r = g = b = l;

    } else {

        // Otherwise, convert the HSL values into RGB
        var hue2rgb = function(p, q, t)
        {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        // Some logic I totally don't understand
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        // Convert and round values
        r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
        g = Math.round(hue2rgb(p, q, h) * 255);
        b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
    }

    // Return the color values
    return {
        r: r,
        g: g,
        b: b,
        a: a,

        // Cache the hue, saturation and lightness for further usage
        h: h,
        s: s,
        l: l
    };
};

/**
 * Checks if a color instance is valid
 *
 * @param self {Color}      Our color instance
 * @return {boolean}
 */
color.is_valid = function(self)
{
    // Do our checks and return result
    return ((self instanceof Array) && self.r && self.g && self.b && self.a);
}

/**
 * Converts a color instance to a hexadecimal value
 *
 * @param self {Color}      Color instance
 * @return {String}
 */
color.to_hex = function(self)
{
    // Check if our value(s) are valid
    if (!color.is_valid(self))
        throw new Error("[Color] Invalid color instance!");

    // Creates our initial string
    var str = "#";

    // Add our converted color values to it
    str += self.r.toString(16);
    str += self.g.toString(16);
    str += self.b.toString(16);

    // Return hexadecimal color value
    return str;
};


/**
 * Unpack a color instance into 4 numbers
 *
 * @param self {Color}      Color instance
 * @return {Array}
 */
color.unpack = function(self)
{
    // Check if our value(s) are valid
    //if (!color.is_valid(self))
        //throw new Error("[Color] Invalid color instance!");

    // Unpack values
    return [
        self.r,
        self.g,
        self.b,
        self.a
    ];
};


/**
 * Creates a new RGBA color instance based from another already existent color instance
 *
 * @param base {Color}
 * @param r {Number} <0, 255>       The RED value offset
 * @param g {Number} <0, 255>       The GREEN value offset
 * @param b {Number} <0, 255>       The BLUE value offset
 * @param a {Number} <0, 255>       The ALPHA value offset\
 * @return {Color | Array}
 */
color.new_offset = function(base, r, g, b, a)
{
    // Check if our value(s) are valid
    if (!color.is_valid(self) || (!r && !g && !b && !a))
        throw new Error("[Color] Invalid color instance and/or values!");

    return {
        r: base.r + r,
        g: base.g + g,
        b: base.b + b,
        a: base.a + a,

        offset: {
            r: r,
            g: g,
            b: b,
            a: a
        }
    };
};

/**
 * Check if a color instance is undefined, or equal to 0
 *
 * @param self {Color}
 * @param tolerance {Number} <0, 255>       The maximum tolerance
 * @return {boolean}
 */
color.is_zero = function(self, tolerance)
{
    // Check if our value(s) are valid
    if (!color.is_valid(self))
        throw new Error("[Color] Invalid color instance!")

    // If we didn't specify a tolerance amount, then set it to 0
    tolerance = tolerance || 0;

    // Do our checks and return result
    return ((self.r < tolerance) && (self.g < tolerance) && (self.b < tolerance) && (self.a < tolerance));
}


/**
 * Checks if a color instance is transparent
 *
 * @param self {Color}
 * @param tolerance {Number} <0, 255>       The maximum tolerance
 * @return {boolean}
 */
color.is_transparent = function(self, tolerance)
{
    // Check if our value(s) are valid
    if (!color.is_valid(self))
        throw new Error("[Color] Invalid color instance!")

    // If we didn't specify a tolerance amount, then set it to 0
    tolerance = tolerance || 0;

    // Do our checks and return result
    return ((self.a < tolerance))
}

color.shift_hue = function(self, amount)
{
    // Check if our value(s) are valid
    if (!color.is_valid(self) || !amount || !self.h || !self.s || !self.l)
        throw new Error("[Color] Invalid color instance and/or shift amount!")

    // Shift the amount
    amount += self.h;

    // Cycle for the hue
    if (amount > 360)
        amount = 360 - amount;

    // Return the new color instance
    return color.new_hsla(amount, self.s, self.l, self.a);
}


/**
 * @brief Draws an shadowed text
 * @author Signal
 *
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Number} a
 * @param  {String} text
 * @param  {Array} color
 * @param  {Any} font
 * @return {void}
 */
function text(x, y, a, text, color, font)
{
    // Draw text
    Render.StringCustom(x + 1, y + 1, a, text, [15, 15, 15, 55], font);
    Render.StringCustom(x, y, a, text, color, font);
}


/**
 * Draws an Onetap-styled container
 *
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Number} w
 * @param  {String} title
 * @return {Void}
 */
function draw_container(x, y, w, title)
{
    // Get onetap's color scheme
    const colors = [
        color.new_hexa("#FDDC93", 225),
        color.new_hexa("#DA9F56", 255),
        color.new_hexa("#FFFFFF", 255),
        color.new_hexa("#28282F", 75)
    ]

    // Create our main font
    const font_title = Render.AddFont("Segoe UI", 8, 400);

    // Render container
    Render.GradientRect(x, y, w / 2, 2, 1, color.unpack(colors[1]), color.unpack(colors[0]));
    Render.GradientRect(x + w / 2, y, w / 2, 2, 1, color.unpack(colors[0]), color.unpack(colors[1]));
    Render.FilledRect(x, y + 2, w, 16, color.unpack(colors[3]));
    text(x + w / 2, y + 2, 1, title, color.unpack(colors[2]), font_title);
}


/**
 * @brief Clamps an integer between 2 other integers
 *
 * @param {Number} v
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
const clamp = function(v, min, max)
{
    return Math.min(Math.max(v, min), max);
}


/**
 * @brief Executes an command with multiple arguments
 *
 * @param {String} cmd
 * @param {Array} args
 * @return {Void}
 */
const exec = function(cmd, args)
{
    const str = cmd + " ";

    if (args)
    {
        for (var i = 0; i < args.length; i++)
        {
            str += args[i];
            str += " ";
        }
    }

    Cheat.ExecuteCommand(str);
}


/**
 * @brief Checks if we customized this color and create a new color instance.
 *
 * @param {String} label
 * @param {Array} def Default color
 * @return {Array}
 */
const setup_color = function(label, def)
{
    if (menu_c.get_color(label)[3] !== 0)
        return menu_c.get_color(label);

    return def;
};

//endregion

//region main

// Chat colours
// by @csmit195
const CHAT_COLOR = {
	WHITE: '\x01',
    RED: '\x02',
    LIGHT_PURPLE: '\x03',
    GREEN: '\x04',
    LIGHT_GREEN: '\x05',
    LIME: '\x06',
    GRAY: '\x08',
    YELLOW: '\x09',
    LIGHT_BLUE: '\x0A',
    CYAN: '\x0B',
    BLUE: '\x0C',
    MAGENTA: '\x0D',
    PINK: '\x0E',
    LIGHT_RED: '\x0F',
    GOLD: '\x10',
};

// Create our main variables
// Regarding the tracing system
const max_radius = Math.PI * 2;
const step = max_radius / 24;

// Regarding functions status
var unduck = false;
var is_lj = false;

// Regarding the chart
var last_log = 0;
var last_delta = 0;
var last_color = null;
var velocity_data = [];

// Regarding the practice mode
var last_position = null;
var last_angles = null;
var last_mode = 0;
const practice_modes = [
    "Vanilla",
    "Vanilla KZ",
    "NoPre KZ"
];

const configurations = [
    {air_accel: 12, accel: 5.5, stamina: 80, ladder_accel: 0.78, speed_cap: 0}, // Vanilla
    {air_accel: 12, accel: 6.5, stamina: 0, ladder_accel: 1, speed_cap: 1}, // Vanilla KZ
    {air_accel: 100, accel: 6.5, stamina: 0, ladder_accel: 1, speed_cap: 1} // NoPre KZ
];

// Regarding the jumpstats
var last_jumping = false;
var jump_positions = [];
var last_pre = 0;

const scores = [
    [220, 225, 235], // Perfect
    [230, 235, 245], // Impressive
    [240, 245, 255], // Godlike
    [245, 255, 265] // Ownage
];

const sounds = [
    "perfect",
    "impressive",
    "godlike",
    "ownage"
];

//endregion

//region menu

// Create our menu elements

// Create a separator
menu_c.label("| Movement features", true, false);

const jb = menu_c.call(UI.AddHotkey, "Automatic jumpbug", "mv_jumpbug", null);
const cb = menu_c.call(UI.AddHotkey, "Automatic crouchbug", "mv_crouchbug", null);
const lj = menu_c.call(UI.AddHotkey, "Automatic strafer", "mv_strafer", null);

// Create a separator
menu_c.label("| Miscellaneous features", true, false);

const movement_type = menu_c.call(UI.AddDropdown, "Movement mode", "mv_practice_mode", [practice_modes]);
const practice = menu_c.call(UI.AddCheckbox, "Enable practice mode", "mv_practice", null);
const jumpstats = menu_c.call(UI.AddCheckbox, "Enable jumpstats", "mv_jumpstats", null);

// Create a separator
menu_c.label("| Visual features", true, false);

const info = menu_c.call(UI.AddCheckbox, "Draw speed graph", "mv_showinfo", null);
const keystatus = menu_c.call(UI.AddCheckbox, "Draw keystatus", "mv_showkeys", null);
const info_offset = menu_c.call(UI.AddSliderInt, "Drawing vertical offset", "mv_showinfo_offset", [0, 500]);

// Create a separator
menu_c.label("| Settings", true, false);

const setup_keys = menu_c.call(UI.AddCheckbox, "Setup keys", "mv_setup_keys", null);
const practice_hotkeys = {
    get: menu_c.call(UI.AddHotkey, "Save position", "keys_save", null),
    set: menu_c.call(UI.AddHotkey, "Set position", "keys_set", null),
};
const move_hotkeys = {
    forward: menu_c.call(UI.AddHotkey, "Move forward", "keys_fwrd", null),
    backward: menu_c.call(UI.AddHotkey, "Move backwards", "keys_back", null),
    left: menu_c.call(UI.AddHotkey, "Move to the left", "keys_left", null),
    right: menu_c.call(UI.AddHotkey, "Move to the right", "keys_right", null)
};

// Group all hotkeys together
const hotkeys_t = [
    practice_hotkeys,
    move_hotkeys
];

const setup_colors = menu_c.call(UI.AddCheckbox, "Setup colors", "mv_setup_colors", null);
const chart_colors = {
    main: menu_c.call(UI.AddColorPicker, "Chart: Main", "clrs_chart_main", null),
    axis: menu_c.call(UI.AddColorPicker, "Chart: Axis", "clrs_chart_axis", null),
    speed_loss: menu_c.call(UI.AddColorPicker, "Chart: Speed (loss)", "clrs_chart_velocity_loss", null),
    speed_stable: menu_c.call(UI.AddColorPicker, "Chart: Speed (normal)", "clrs_chart_velocity_stable", null),
    speed_gain: menu_c.call(UI.AddColorPicker, "Chart: Speed (gain)", "clrs_chart_velocity_gain", null),
    land_speed: menu_c.call(UI.AddColorPicker, "Chart: Landing speed", "clrs_chart_velocity_land", null),
    unit: menu_c.call(UI.AddColorPicker, "Chart: Unit", "clrs_chart_unit", null)
};
const keystatus_colors = {
    dormant: menu_c.call(UI.AddColorPicker, "Keystatus: Dormant", "clrs_hotkeys_dormant", null),
    active: menu_c.call(UI.AddColorPicker, "Keystatus: Active", "clrs_hotkeys_active", null),
    overlap: menu_c.call(UI.AddColorPicker, "Keystatus: Overlap", "clrs_hotkeys_overlap", null)
};
const practice_colors = {
    dormant: menu_c.call(UI.AddColorPicker, "Practice: Dormant", "clrs_practice_dormant", null),
    active: menu_c.call(UI.AddColorPicker, "Practice: Active", "clrs_practice_active", null)
};

// Group all colors togheter
const colors_t = [
    chart_colors,
    keystatus_colors,
    practice_colors
];

//endregion

//region function


/**
 * @brief Handles our menu elements' visibility
 *
 * @return {Void}
 */
function handle_menu_visibility()
{
    // Loop for each hotkey group
    for (var i = 0; i < hotkeys_t.length; i++)
    {
        // Get our current hotkey group
        const group = hotkeys_t[i];

        // Loops for each element inside our group
        for (var elem in group)
        {
            // Get our current properties
            const label = group[elem];
            const enabled = menu_c.get(setup_keys);

            // Update visibility
            menu_c.visibility(label, enabled);
        }
    }

    // Loop for each colors group
    for (var i = 0; i < colors_t.length; i++)
    {
        // Get our current color group
        const group = colors_t[i];

        // Loops for each element inside our group
        for (var elem in group)
        {
            // Get our current properties
            const label = group[elem];
            const enabled = menu_c.get(setup_colors);

            // Update visibility
            menu_c.visibility(label, enabled);
        }
    }
}


/**
 * @brief Handle our hotkey system
 *
 * @return {Void}
 */
const hotkey_status = {get: false, set: false};
function handle_hotkeys()
{
    // If our practice mode isn't enabled, then no need to handle the hotkeys
    if (!menu_c.get(practice))
        return;

    // Get our local player
    const player = Entity.GetLocalPlayer();

    // If our local player isn't valid or if we're not alive, then no need to handle the hotkeys as well
    if (!player || !Entity.IsAlive(player))
        return;

    // If our current hotkeys' status are the same as the cached ones, then anything updated
    if (menu_c.get_hotkey(practice_hotkeys.get) === hotkey_status.get &&
        menu_c.get_hotkey(practice_hotkeys.set) === hotkey_status.set)
            return;

    // Otherwise, cache our status
    hotkey_status.get = menu_c.get_hotkey(practice_hotkeys.get);
    hotkey_status.set = menu_c.get_hotkey(practice_hotkeys.set);

    // If we're pressing our save position hotkey...
    if (hotkey_status.get)
    {
        // Save our position and view angles and play a sound.
        last_position = Entity.GetRenderOrigin(player);
        last_angles = Local.GetViewAngles();
        exec("playvol", ["buttons\\blip1", "1"]);
    }

    // If we're pressing our teleport hotkey...
    if (hotkey_status.set)
    {
        // And we have a valid last position and angles...
        if (last_position && last_angles)
        {
            // Teleport ourselves to our last saved checkpoint...
            exec("setpos_exact", [last_position[0], last_position[1], last_position[2]]);
            exec("setang_exact", [last_angles[0], last_angles[1]]);

            // And play a sound.
            exec("playvol", ["buttons\\blip1", "1"]);
        }
    }
}


/**
 * @brief Draws the keystatuses
 *
 * @return {Void}
 */
function do_keystatus_ui()
{
    // If our keystatus visualizer isn't enabled, then no need to draw them.
    if (!menu_c.get(keystatus))
        return;

    // Get our local player
    const player = Entity.GetLocalPlayer();

    // If our local player ins't valid or if we're not alive, then no need to draw them as well.
    if (!player || !Entity.IsAlive(player))
        return;

    // Setup our drawing colors
    const colors = {
        dormant: setup_color(keystatus_colors.dormant, [150, 150, 150, 125]),
        active: setup_color(keystatus_colors.active, [225, 225, 225, 200]),
        overlap: setup_color(keystatus_colors.overlap, [225, 0, 75, 125])
    };

    // Get yet more drawing properties
    const x = Render.GetScreenSize()[0], y = Render.GetScreenSize()[1] + menu_c.get(info_offset);

    const status = {
        forward: menu_c.get_hotkey(move_hotkeys.forward),
        backward: menu_c.get_hotkey(move_hotkeys.backward),
        left: menu_c.get_hotkey(move_hotkeys.left),
        right: menu_c.get_hotkey(move_hotkeys.right)
    };

    // Check for overlapping (pressing two opposite keys simultaneously).
    if ((status.forward && status.backward) || (status.left && status.right))
    {
        // If we're overlapping, then change all the colors to our Overlap color.
        colors.dormant = colors.overlap;
        colors.active = colors.overlap;
    };

    // Render indicators
    Render.String(x / 2 - 39, y / 2 + 205, 0, "W", status.forward ? colors.active : colors.dormant, 4);
    Render.String(x / 2 - 14, y / 2 + 205, 0, "A", status.left ? colors.active : colors.dormant, 4);
    Render.String(x / 2 + 5, y / 2 + 205, 0, "S", status.backward ? colors.active : colors.dormant, 4);
    Render.String(x / 2 + 19, y / 2 + 205, 0, "D", status.right ? colors.active : colors.dormant, 4);
}


/**
 * @brief Draws the practice user-interface.
 *
 * @return {Void}
 */
function do_practice_ui()
{
    // If we're not in practice mode, then no need to draw the UI.
    if (!menu_c.get(practice))
        return;

    // Get our local player
    const player = Entity.GetLocalPlayer();

    // If our local player ins't valid or if we're not alive, then no need to draw them as well.
    if (!player || !Entity.IsAlive(player))
        return;

    // Get drawing properties
    const y = Render.GetScreenSize()[1];

    const font_practice = Render.AddFont("Segoe UI", 14, 800);

    // And setup our colors.
    const colors = {
        dormant: setup_color(practice_colors.dormant, [255, 210, 35, 125]),
        active: setup_color(practice_colors.active, [255, 225, 225, 200])
    };

    // Render our user-interface.
    draw_container(5, y / 2 - 100, 200, "practice mode (" + practice_modes[menu_c.get(movement_type)] + ")");
    text(5, y / 2 - 80, 0, "1. Checkpoint", hotkey_status.get ? colors.active : colors.dormant, font_practice);
    text(5, y / 2 - 60, 0, "2. Teleport", hotkey_status.set ? colors.active : colors.dormant, font_practice);
}


/**
 * @brief Updates the server settings based on the selected movement type.
 *
 * @return {Void}
 */
function handle_movement_mode()
{
    // Get our current movement type
    const type = menu_c.get(movement_type);

    // If the settings we're already updated, then no need to re-update them.
    if (type === last_mode)
        return;

    // Otherwise, cache our current movement type for future checks.
    last_mode = type;

    // Update our server settings.
    exec("sv_airaccelerate", [configurations[type].air_accel]);
    exec("sv_accelerate", [configurations[type].accel]);
    exec("sv_staminamax", [configurations[type].stamina]);
    exec("sv_ladder_scale_speed", [configurations[type].ladder_accel]);
}


/**
 * @brief Calculates and prints to chat your jump's distance.
 *
 * @return {Void}
 */
function handle_jumpstats()
{
    // If our jumpstats system is disabled, then return.
    if (!menu_c.get(jumpstats))
        return;

    // Get our local player
    const player = Entity.GetLocalPlayer();

    // If our local player ins't valid or if we're not alive, then return as well.
    if (!player || !Entity.IsAlive(player))
        return;

    // Get properties and initalize variables.
    const vec = vec3.new(Entity.GetProp(player, "CBasePlayer", "m_vecVelocity[0]"));
    const flags = Entity.GetProp(player, "CBasePlayer", "m_fFlags");
    var landed = false;

    // If we're jumping...
    if (!(flags & 1))
    {
        // And we weren't jumping last tick...
        if (!last_jumping)
        {
            // Then save our initial position and velocity.
            jump_positions[0] = vec3.new(Entity.GetRenderOrigin(player));
            last_pre = Math.round(Math.sqrt(vec.x ** 2 + vec.y ** 2) * 10) / 10;
        }

        // Update our jumping state.
        last_jumping = true;
        return;
    }

    // If we're NOT jumping...
    if (flags & 1)
    {
        // And we were jumping...
        if (last_jumping)
        {
            // Then save our last position and update the landing state.
            landed = true;
            jump_positions[1] = vec3.new(Entity.GetRenderOrigin(player));
        }

        // Update the jumping state too.
        last_jumping = false;
    }

    // If we didn't land yet, then there's nothing to calculate.
    if (!landed)
        return;

    // Get our jump distance
    const sub = vec3.sub(jump_positions[1], jump_positions[0])
    const dist = Math.round((Math.sqrt(sub.x * sub.x + sub.y * sub.y) + 31) * 100) / 100;


    /**
     * @brief Get the level of the jump based on its distance.
     *
     * @param {Number} dist
     * @return {Array}
     */
    const get_jump_level = function(dist)
    {
        // Get our properties and initialize variables.
        const type = menu_c.get(movement_type);
        const data = {level: -1, color: CHAT_COLOR.WHITE};
        const current_scores = {
            perfect: scores[0][type],
            impressive: scores[1][type],
            godlike: scores[2][type],
            ownage: scores[3][type]
        };

        // If our distance is lower than a perfect (lowest level), then return a normal jump's data.
        if (dist < current_scores.perfect)
        {
            return data;
        }
        // Else, if our distance is between a perfect and an impressive, then return a perfect jump's data.
        else if (dist >= current_scores.perfect && dist < current_scores.impressive)
        {
            data.level = 0;
            data.color = CHAT_COLOR.CYAN;
            return data;
        }
        // Else, if our distance is between an impressive and a godlike, then return an impressive jump's data.
        else if (dist >= current_scores.impressive && dist < current_scores.godlike)
        {
            data.level = 1;
            data.color = CHAT_COLOR.GREEN;
            return data;
        }
        // Else, if our distance is between a godlike and an ownage, then return a godlike jump's data.
        else if (dist >= current_scores.godlike && dist < current_scores.ownage)
        {
            data.level = 2;
            data.color = CHAT_COLOR.RED;
            return data;
        }
        // Else, if our distance is higher than an ownage, then return an ownage jump's data.
        else if (dist >= current_scores.ownage)
        {
            data.level = 3;
            data.color = CHAT_COLOR.GOLD;
            return data;
        }
    }

    // If we we're crouched when landing, then add 5 units to the final distance.
    if (flags & (1 << 1))
        dist += 5;

    // Get jump's data.
    const jump_data = get_jump_level(dist);

    // If our distance is between 220 and 300 (you won't be surpassing that with normal jumps without pre-strafing) and our jump wasn't a vertical, then...
    if (dist > 220 && dist < 300 && Math.abs(jump_positions[1].z - jump_positions[0].z) < 8)
    {
        // Check if our jump wans't a normal one.
        if (jump_data.level > -1)
        {
            // And, then, play a corresponding sound.
            Cheat.ExecuteCommand("playvol " + sounds[jump_data.level] + " 1");
        }

        // Print the jump's info to the chat.
        Global.PrintChat(" " + CHAT_COLOR.GRAY + "[" + CHAT_COLOR.YELLOW + "JS" + CHAT_COLOR.GRAY + "] Distance: " + jump_data.color + dist.toString() +
        CHAT_COLOR.GRAY + " | Pre-speed: " + CHAT_COLOR.WHITE + last_pre.toString());
    }

}

/**
 * Handles the jumpbug and crouchbug feature
 *
 * @param  {boolean} should_jump Specifies if we should crouchbug or jumpbug
 * @return {void}
 */
function do_jump_bug(should_jump)
{
    // Gets our local player
    const player = Entity.GetLocalPlayer();

    // If our player isn't valid or if we're not alive, return
    if (!player || !Entity.IsAlive(player))
        return;

    // If we're not using any of the crouchbug related features, return
    if (!menu_c.get_hotkey(jb) && !menu_c.get_hotkey(cb))
    {
        // Check if we we're ine middle of a crouchbug when we stopped pressing the crouchbug/jumpbug hotkey
        // This will prevent you to duck infinitely and having to reset it manually
        if (unduck)
        {
            // Resets the duck state
            unduck = false;
            Cheat.ExecuteCommand("-duck");
        }

        return;
    }

    // If we performed a crouchbug/jumpbug and we need to disable the crouch...
    if (unduck)
    {
        // Then disable it!
        unduck = false;
        Cheat.ExecuteCommand("-duck");
    }

    // Get our properties
    const flags = Entity.GetProp(player, "CBasePlayer", "m_fFlags");
    const origin = vec3.new(Entity.GetProp(player, "CBaseEntity", "m_vecOrigin"));
    const vel = vec3.new(Entity.GetProp(player, "CBasePlayer", "m_vecVelocity[0]"));

    // Fix our origin vector
    vel = vec3.multiply(vel, vec3.new(Globals.TickInterval(), Globals.TickInterval(), 0));
    origin = vec3.add(origin, vel);

    // If we're on the ground...
    if (flags & 1)
    {
        // And we're pressing the jumpbug hotkey...
        if (should_jump)
        {
            // Then jump!
            UserCMD.ForceJump();
        }

        // Otherwise, just return, since our crouchbug was already performed.
        return;
    }

    // Cycles through a circle, creating 24 traces around you.
    for (var i = 0; i < max_radius; i+=step)
    {
        // Gets the vectors the trace will be based upon.
        const start = vec3.add(origin, vec3.new(Math.cos(i) * 17, Math.sin(i) * 17, 0));
        const end = vec3.add(origin, vec3.new(Math.cos(i) * 17, Math.sin(i) * 17, -128));

        // Do the tracing
        const trace_t = Trace.Line(player, vec3.unpack(start), vec3.unpack(end));

        // If we're in the middle of the air then...
        if (trace_t[1] * 128 < 9)
        {
            // Duck and update ducking status
            Cheat.ExecuteCommand("+duck");
            unduck = true;
            return;
        }
    }
}


/**
 * Handles the long jump feature
 *
 * @return {void}
 */
function do_long_jump()
{
    // Get our local player
    const player = Entity.GetLocalPlayer();

    // If our local player isn't valid or if we're not alive, return
    if (!player || !Entity.IsAlive(player))
        return;

    // Get our flags
    const flags = Entity.GetProp(player, "CBasePlayer", "m_fFlags");

    // If we're not pressing the longjump hotkey...
    if (!menu_c.get_hotkey(lj))
    {
        // And we're in the middle of a longjump...
        if (is_lj)
        {
            // Reset the longjump status and disable features.
            is_lj = false;
            Cheat.ExecuteCommand("-jump");
            UI.SetValue("Misc", "Movement", "Auto strafe", 0);
        }

        // Return since we're not using the feature.
        return;
    }

    // If we're on the ground...
    if (flags & 1)
    {

        // And we were in the middle of a longjump...
        if (is_lj)
        {
            // Reset the longjump status and disable features.
            is_lj = false;
            Cheat.ExecuteCommand("-jump");
            UI.SetValue("Misc", "Movement", "Auto strafe", 0);
            return;
        }

        // Otherwise, if we're on the air...
    } else {

        // And we're not on the longjump status...
        if (!is_lj)
        {
            // Enable the longjump status and the features.
            is_lj = true;
            UI.SetValue("Misc", "Movement", "Auto strafe", 3);
            return;
        }

        // Keep IN_JUMP to ensure that the auto-strafer will work.
        Cheat.ExecuteCommand("+jump");
    }

}


/**
 * Gets the color of our velocity indicator based on the latest velocity delta
 *
 * @param {number} delta
 */
const get_delta_color = function(delta)
{
    // Rounds our delta to get more consistent results
    delta = Math.round(delta);

        // Who the f*ck made this code?!
        // If the delta is positive, then set the color to red (confusing, right? I thought that too).
        if (delta > 0)
        {
            delta = setup_color(chart_colors.speed_loss, [255, 200, 200, 200]);
    } else
        // If the delta is negative, then set the color to green.
        if (delta < 0)
        {
            delta = setup_color(chart_colors.speed_gain, [220, 255, 200, 200]);
    } else
        // If there's no delta, then set the color to yellow.
        if (delta > -1 && delta < 1)
        {
            delta = setup_color(chart_colors.speed_stable, [255, 255, 200, 200]);
        }

    // Return the final color
    return delta;
}


/**
 * Draws the velocity chart
 *
 * @return {void}
 */
function do_velocity_info()
{
    // Get the local player
    const player = Entity.GetLocalPlayer();

    // If our local player ins't valid or we're not alive, return
    if (!player || !Entity.IsAlive(player))
        return;

    // If our velocity chart isn't enabled, return
    if (!menu_c.get(info))
        return;

    // Get drawing properties
    const x = Render.GetScreenSize()[0], y = Render.GetScreenSize()[1] + menu_c.get(info_offset);

    const vec = Entity.GetProp(player, "CBasePlayer", "m_vecVelocity[0]");
    const velocity = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
    const in_air = Entity.GetProp(player, "CBasePlayer", "m_fFlags") & 1 || Entity.GetProp(player, "CBasePlayer", "m_fFlags") & 17;

    const colors = {
        main: setup_color(chart_colors.main, [200, 200, 200, 255]),
        unit: setup_color(chart_colors.unit, [225, 225, 225, 225]),
        axis: setup_color(chart_colors.axis, [100, 100, 100, 125]),
        land_speed: setup_color(chart_colors.land_speed, [255, 200, 200, 255])
    };

    // Draw the outter part of the chart
    Render.String(x / 2, y / 2 + 150, 1, Math.round(velocity).toString(), get_delta_color(last_delta), 4);
    Render.String(x / 2 + 1, y / 2 + 185, 1, "u/s", colors.unit, 2);

    Render.Line(x / 2 - 100, y / 2 + 25, x / 2 - 100, y / 2 + 145, colors.axis);
    Render.Line(x / 2 - 115, y / 2 + 130, x / 2 + 95, y / 2 + 130, colors.axis);

    // Update our velocity data every tick
    if (Globals.Curtime() - last_log > Globals.TickInterval())
    {
        // Cache our current time to do the next timer calculations..
        last_log = Globals.Curtime();

        // And return data.
        velocity_data.unshift([velocity, in_air]);
    }

    // If we didn't gather enough data to draw a chart, draw an indicator and return
    if (velocity_data.length < 2)
    {
        Render.String(x / 2, 120, 1, "CREATING CHART...", [200, 200, 200, Math.sin((Globals.Realtime() % 3) * 4) * (255 / 2 - 1) + 255 / 2], 12);
        return;
    }

    // If we reached our data's array limit, then remove the last value.
    if (velocity_data.length > 40)
        velocity_data.pop();

    // Loops for each value inside our velocity data's array.
    for (var i = 0; i < velocity_data.length - 1; i++)
    {
        // Get the info necessary to draw the chart
        const cur = velocity_data[i][0];
        const next = velocity_data[i + 1][0];
        const landed = velocity_data[i][1] && !velocity_data[i + 1][1];

        // We only need to update the velocity delta once, so do it only if the index is equal 0
        if (i === 0)
            last_delta = next - cur;

        // Render each line of the chart
        Render.Line(x / 2 + 90 - (i - 1) * 5, y / 2 + 130 - (clamp(cur, 0, 450) * 75 / 320), x / 2 + 90 - i * 5, y / 2 + 130 - (clamp(next, 0, 450) * 75 / 320), colors.main);

        // If we landed in our current tick then...
        if (landed)
        {
            // Draw the velocity on the chart for that extra info which will make you feel unique and cool when making your mediocre ass shadowplay videos!
            Render.String(x / 2 + 100 - (i + 1) * 5, y / 2 + 115 - (clamp(next, 0, 450) * 75 / 320), 0, Math.round(next).toString(), colors.land_speed, 3);
        }
    }
}

// Executes this whenever the script is first loaded.
handle_menu_visibility();

/**
 * Where our CreateMove functions are called
 *
 * @return {void}
 */
function on_create_move()
{
    // Check if we should jumpbug or crouchbug
    const should_jump = menu_c.get_hotkey(jb);

    // Do handling
    handle_hotkeys();
    handle_movement_mode();

    handle_jumpstats();

    handle_menu_visibility();

    // Do CreateMove features
    do_jump_bug(should_jump);
    do_long_jump();
}


/**
 * @brief Where our PaintTraverse functions are called
 *
 * @return {Void}
 */
function on_paint()
{
    // Do PaintTraverse functions.
    do_practice_ui();
    do_velocity_info();
    do_keystatus_ui();
}

/**
 * Resets the chart data whenever we changed between servers/maps
 *
 * @return {void}
 */
function reset()
{
    // Reset all data in order to not glitch out.
    last_log = Globals.Curtime();
    velocity_data = [];

    last_jumping = false;
    last_pre = 0;
    jump_positions = [];

    last_position = [];
    last_angles = [];
}

//endregion

//region callbacks

// Callback our functions!
Cheat.RegisterCallback("CreateMove", "on_create_move");
Cheat.RegisterCallback("Draw", "on_paint");
Cheat.RegisterCallback("player_connect_full", "reset");

//endregion
