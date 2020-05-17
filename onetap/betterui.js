// THIS IS A LIBRARY AND NOT A STANDALONE SCRIPT.
// HAVING SAID SO, THIS WILL NOT WORK OR DO A THING IF EXECUTED.

//region dependencies

/**
 * @title BetterUI
 * @version 2.2.0
 * @description A better UI system for Onetap
 */

var menu = {};
var menu_elements = {};
const menu_spacer = "                                                                                  ";

/**
 * Concats two elements into an array without increasing the array length.
 * Prevents the memory leak in 2.0.0 from happening
 *
 * @param a {array}
 * @param b {any}
 */
menu.concat = function(a, b)
{
    // Creates a new array.
    var arr = [];

    // Push all items from the array 'a' into our array.
    for (var c in a)
    {
        arr.push(a[c]);
    }

    // Push the value 'b' into our array.
    arr.push(b);

    // Return the new array.
    return arr;
}

/**
 * Creates a new menu label
 *
 * @param label {string}
 */
menu.label = function(label)
{
    // Creates the label
    UI.AddLabel(label);
};

/**
 * Creates a new menu element
 *
 * @param func {function}
 * @param name {string}
 * @param label {string},
 * @param properties {array}
 */
menu.new = function(func, name, label, properties, initial_value)
{
    // Fix values
    properties = properties || [];
    initial_value = initial_value || undefined;

    // Get properties
    const final_name = name + menu_spacer + label;
    var final_props = [final_name];

    const element_info_t = {
        path: ["Misc", "JAVASCRIPT", "Script Items", final_name],
        cache: initial_value,
        func: func
    };

    // If our properties aren't null, then pack them together.
    if (properties != null)
    {
        for (var i = 0; i < properties.length; i++)
        {
            final_props.push(properties[i]);
        }
    }

    // Create our menu element and return properties
    func.apply(null, final_props);

    // Initialize our menu element if it has an initializer.
    if (initial_value)
    {
        switch (func)
        {
            case UI.AddColorPicker:
                UI.SetColor.apply(null, this.concat(element_info_t.path, initial_value));
                break;
            
            case UI.AddHotkey:
                break;
            
            default:
                UI.SetValue.apply(this, this.concat(element_info_t.path, initial_value));
                break;
        }
    }

    menu_elements[label] = element_info_t;

    return element_info_t;
};

/**
 * Creates a new menu reference
 *
 * @param path {array}
 */
menu.reference = function(path)
{
    return {
        path: path
    };
};

/**
 * Gets the value of a menu element
 *
 * @param elem {array}
 * @return {*}
 */
menu.get = function(elem)
{
    // If the element doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Returns the element's value
    switch (elem.func)
    {
        case UI.AddColorPicker:
            return UI.GetColor.apply(null, elem.path);
        
        case UI.AddHotkey:
            return UI.IsHotkeyActive.apply(null, elem.path);
        
        default:
            return UI.GetValue.apply(null, elem.path);
    }
};

/**
 * Sets the value of a menu element
 *
 * @param elem {array}
 * @param value {*}
 */
menu.set = function(elem, value)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Set the element's value
    switch (elem.func)
    {
        case UI.AddColorPicker:
            UI.SetColor.apply(null, this.concat(elem.path, value));
            break;
        
        case UI.AddHotkey:
            if (menu.get(elem) !== value)
                UI.ToggleHotkey.apply(null, elem.path);
            break;
        
        default:
            UI.SetValue.apply(null, this.concat(elem.path, value));
            break;
    }
};

/**
 * Changes the visibility of a menu elements
 *
 * @param elem {array}
 * @param visible {boolean}
 */
menu.visibility = function(elem, visible)
{
    // If the label doesn't exist
    if (!(elem.path))
        throw new Error("[Menu] This element doesn't exist!");

    // Change the element's visibility
    UI.SetEnabled.apply(null, this.concat(elem.path, visible));
};

/**
 * Adds an event to a menu element which is triggered everytime this element's value is changed.
 * 
 * @param elem {array}
 * @param func {function}
 */
menu.add_event = function(elem, func)
{
    if (!elem.path)
        throw new Error("[Menu] This element doesn't exist!");

    elem.callback = func;
}

/**
 * Handles the menu elements' events. Call this inside a Draw or FSN callback.
 */
menu.handle_events = function()
{
    for (var label in menu_elements)
    {
        const elem = menu_elements[label];

        if (!elem.path || !elem.callback)
            continue;

        const value = menu.get(elem);

        if (elem.cache === undefined)
            elem.cache = value;

        if (elem.cache !== value)
        {
            elem.callback.apply(null, [elem]);
            elem.cache = value;
        }
    }
}

//endregion
