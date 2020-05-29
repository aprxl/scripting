/*
 *
 * Title: Low FPS mitigations
 * Author: april#0001
 * Description: A script meant to disable certain features to improve FPS.
 *
 */

//region dependencies
function safe_concat(x, y)
{
    var arr = [];

    for (var k in x)
    {
        arr.push(x[k]);
    }

    arr.push(y);

    return arr;
}

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
//endregion

//region api
const callback = Cheat.RegisterCallback, log = Cheat.PrintChat;
//endregion

//region locals
const weapons = [
    "GENERAL",
    "PISTOL",
    "HEAVY PISTOL",
    "SCOUT",
    "AWP",
    "AUTOSNIPER"
];

const paths = [
    [
        ["Rage", "GENERAL", "General", "Team check"],
        ["Visual", "SELF", "ESP", "Taser range"],
        ["Visual", "SELF", "ESP", "Knife range"],
        ["Visual", "SELF", "Chams", "Visible override"],
        ["Visual", "SELF", "Chams", "Attachment override"],
        ["Visual", "SELF", "Chams", "Desync override"],
        ["Visual", "SELF", "Chams", "Fakelag override"],
        ["Visual", "SELF", "Chams", "Arms override"],
        ["Visual", "SELF", "Chams", "Weapon override"],
        ["Visual", "ENEMIES", "HUD", "Footsteps"],
        ["Visual", "ENEMIES", "Chams", "Hidden override"],
        ["Visual", "ENEMIES", "Chams", "History override"],
        ["Visual", "FRIENDLIES", "ESP", "Box"],
        ["Visual", "FRIENDLIES", "ESP", "Glow"],
        ["Visual", "FRIENDLIES", "ESP", "Name"],
        ["Visual", "FRIENDLIES", "ESP", "Health"],
        ["Visual", "FRIENDLIES", "ESP", "Weapon"],
        ["Visual", "FRIENDLIES", "ESP", "Ammo"],
        ["Visual", "FRIENDLIES", "Chams", "Visible override"],
        ["Visual", "FRIENDLIES", "Chams", "Hidden override"],
        ["Visual", "FRIENDLIES", "Chams", "Attachment override"],
        ["Visual", "WORLD", "Entities", "Weapons"],
        ["Visual", "WORLD", "Entities", "Bullet impacts (client)"],
        ["Visual", "WORLD", "Entities", "Bullet tracers"],
        ["Visual", "WORLD", "Entities", "Penetration crosshair"],
        ["Misc", "GENERAL", "Matchmaking", "Auto accept"],
        ["Misc", "GENERAL", "Matchmaking", "Rank revealer"],
        ["Misc", "GENERAL", "Movement", "Slide walk"],
        ["Misc", "GENERAL", "Miscellaneous", "Ragdoll force"],
        ["Misc", "GENERAL", "Miscellaneous", "Ragdoll gravity"],
        ["Misc", "PERFORMANCE & INFORMATION", "Information", "Watermark"],
        ["Misc", "PERFORMANCE & INFORMATION", "Information", "Spectators list"],
        ["Misc", "PERFORMANCE & INFORMATION", "Information", "Team damage list"],
        ["Misc", "PERFORMANCE & INFORMATION", "Information", "Spectators list"]
    ],

    [
        ["Misc", "PERFORMANCE & INFORMATION", "Performance", "Disable post processing"],
        ["Misc", "PERFORMANCE & INFORMATION", "Performance", "Disable fog"],
        ["Misc", "PERFORMANCE & INFORMATION", "Performance", "Disable shadows"],
        ["Misc", "PERFORMANCE & INFORMATION", "Performance", "Disable blood"],
        ["Misc", "PERFORMANCE & INFORMATION", "Performance", "Disable teammate"]
    ]
];

var cache = [];
//endregion

//region functions
function update_features(override) {
    for (var i = 0; i < paths.length; i++) {
        for (var j = 0; j < paths[i].length; j++) {
            UI.SetEnabled.apply(null, safe_concat(paths[i][j], override ? true : (i ? true : false)));
            UI.SetValue.apply(null, safe_concat(paths[i][j], i ? true : false));
        }
    }
}

function update_cache() {
    for (var i = 0; i < weapons.length; i++) {
        const hitboxes = UI.GetValue("Rage", weapons[i], "Targeting", "Hitboxes");
        const multipoint = UI.GetValue("Rage", weapons[i], "Targeting", "Multipoint hitboxes");

        cache[i] = {hitboxes: hitboxes, multipoint: multipoint};
    }
}

function update_configuration(disable) {
    for (var i = 0; i < weapons.length; i++) {
        const hitboxes = UI.GetValue("Rage", weapons[i], "Targeting", "Hitboxes");
        const multipoint = UI.GetValue("Rage", weapons[i], "Targeting", "Multipoint hitboxes");

        UI.SetValue("Rage", weapons[i], "Targeting", "Hitboxes", disable ? (hitboxes & ~((1 << 1) | (1 << 6) | (1 << 7))) : cache[i].hitboxes);
        UI.SetValue("Rage", weapons[i], "Targeting", "Multipoint hitboxes", disable ? (multipoint & ~((1 << 1) | (1 << 6) | (1 << 7))) : cache[i].multipoint);
    }
}

update_features(false);
update_cache();
update_configuration(true);

log(" " + CHAT_COLOR.GRAY + "[" + CHAT_COLOR.YELLOW + "FPS" + CHAT_COLOR.GRAY + "] Your settings have been successfully updated.");

function on_unload() {
    update_features(true);
    update_configuration(false);
}
//endregion

//region callbacks
callback("Unload", "on_unload");
//endregion
