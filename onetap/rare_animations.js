/*
 *
 * Title: Rare animations
 * Author: april#0001
 * Description: Forces all rare inspect animations
 *
 */

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
menu.reference = function(path, func)
{
 return {
     path: path,
     func: func
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

 if (!elem.func)
     throw new Errror("[Menu] This element does not have a valid type. Please, specify one.");

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

const is_selected = function(id, mask, tbl) {
    var i = 0;

    // Loop thru all weapons.
    for (var k in tbl) {
        // Checks if our current weapon is selected.
        // If so, return true.
        // This works because the dropdown's array is correspondent to the sequence id enum.
        if (k == id && mask & (1 << i))
            return true;

        // Otherwise increment 'i'.
        i++;
    }

    // If we our current weapon is not selected, return false.
    return false;
}

//endregion

//region locals
const weapons = [
    "Desert eagle",
    "R8 Revolver",
    "Falchion knife",
    "Butterfly knife",
    "Paracord knife",
    "Survival knife",
    "Ursus knife",
    "Nomad knife",
    "Stiletto knife",
    "Talon knife",
    "Skeleton knife"
];

const sequence_ids = {
    // Desert eagle
    1: {7: 8},
    // Revolver
    64: {3: 4},
    // Falchion
    512: {12: 13},
    // Butterfly
    515: {1: 0, 13: 15, 14: 15},
    // Paracord
    517: {0: 1, 14: 13},
    // Survival
    518: {0: 1, 14: 13},
    // Ursus
    519: {0: 1, 14: 13},
    // Nomad
    521: {14: 13},
    // Stiletto
    522: {13: 12},
    // Talon
    523: {14: 15},
    // Skeleton
    525: {0: 1, 13: 14}
};
//endregion

//region api
const m_dropdown = UI.AddMultiDropdown, local_player = Entity.GetLocalPlayer, is_alive = Entity.IsAlive, get_prop = Entity.GetProp, set_prop = Entity.SetProp, frame_stage = Cheat.FrameStage, callback = Cheat.RegisterCallback;
//endregion

//region menu
const overrides = menu.new(m_dropdown, "| Rare animations", "", [weapons]);
//endregion

//region functions
function on_net_update_start() {
    // Get the value of our multi dropdown.
    const active = menu.get(overrides);

    // Only do this in NET_UPDATE_START.
    if (frame_stage() !== 1) return;

    // If the script is not active, return.
    if (!active) return;

    // Get our local player
    const me = local_player();

    // If our local player isn't valid or if we're not alive, return.
    if (!me || !is_alive(me)) return;

    // Get our viewmodel handle and check if it is valid.
    const viewmodel = get_prop(me, "CBasePlayer", "m_hViewModel[0]");
    if (!viewmodel) return;

    // Get our weapon handle and check if it is valid.
    const wpn = get_prop(me, "CBasePlayer", "m_hActiveWeapon");
    if (!wpn) return;

    // Get our weapon item definition index and get it's sequence ids.
    const index = get_prop(wpn, "CBaseAttributableItem", "m_iItemDefinitionIndex") & 0xffff;
    const sequence_tbl = sequence_ids[index];

    // If this weapon has no sequences to override, return.
    if (!sequence_tbl) return;

    // Check if we should override this weapon's sequences.
    if (!is_selected(index, active, sequence_ids)) return;

    // Get the viewmodel's current sequence.
    const sequence = get_prop(viewmodel, "CBaseViewModel", "m_nSequence");

    // If we shouldn't override this sequence, return.
    if (!sequence_tbl[sequence]) return;

    // Override the sequence.
    set_prop(viewmodel, "CBaseViewModel", "m_nSequence", sequence_tbl[sequence]);
} callback("FrameStageNotify", "on_net_update_start");

//endregion
