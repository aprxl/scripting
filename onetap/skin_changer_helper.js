//region main

// Cache our old weapon index for optimization purposes
var old_index = -1;

// Combobox indexes based on our weapon indexes
// For further info, access tf2b.com/itemlist.php?gid=730
const weapons = {
    1: 5,
    2: 6,
    3: 8,
    4: 11,
    7: 0,
    8: 1,
    9: 2,
    10: 7,
    11: 9,
    13: 10,
    14: 13,
    16: 14,
    17: 16,
    19: 24,
    23: 19,
    24: 31,
    25: 33,
    26: 3,
    27: 17,
    28: 21,
    29: 26,
    30: 30,
    32: 12,
    33: 18,
    34: 20,
    35: 22,
    36: 23,
    38: 27,
    39: 28,
    40: 29,
    60: 15,
    61: 32,
    63: 4,
    64: 25,
    500: 34,
    503: 48,
    505: 35,
    506: 36,
    507: 37,
    508: 38,
    509: 45,
    512: 40,
    514: 44,
    515: 39,
    516: 42,
    519: 47,
    520: 41,
    522: 43,
    523: 46,
    517: 49,
    518: 50,
    521: 51,
    525: 52
}

//endregion

//region functions

/**
 * Where the magic happens
 *
 * @return {void}
 */
function main()
{
    // Get our properties
    const player = Entity.GetLocalPlayer();

    const wpn_index = Entity.GetProp(Entity.GetWeapon(player), "CBaseAttributableItem", "m_iItemDefinitionIndex") & 0xFFFF;

    // If our weapon hasn't changed then no need to update
    if (wpn_index === old_index)
        return;

    // Otherwise, cache our weapon index
    old_index = wpn_index;

    // If our current weapon index is inside our weapons table, then it is valid for skins.
    if (wpn_index in weapons)
    {
        // Get the checkbox index that matches our weapon index
        const menu = weapons[wpn_index];

        // Update the menu
        UI.SetValue("Misc", "SKINS", "Skins", "Weapon", menu);
    }
}

//endregion

//region callbacks

// Callback our main function
Cheat.RegisterCallback("CreateMove", "main");

//endregion
