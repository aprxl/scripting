// Onetap API Snippets and Documentation
// by april#0001

/**
 * An array of strings that references a path to a menu element.
 */
type Path = Array<String>;

/**
 * The index of an entity.
 */
type EntityID = Number;

/**
 * The index of a user in an event.
 */
type UserID = Number;

/**
 * An array containing three number corresponding to the X, Y and Z positions of a 3D point.
 * Or, alternatively, an array containing the pitch, yaw and roll of an Euler angle.
 */
type Vector = Array<Number>;

declare namespace Globals {
    /**
     * Returns the amount of choked ticks.
     */
    function ChokedCommands( ): Number;

    /**
     * Returns the time, in seconds, since the game started.
     */
    function Realtime( ): Number;

    /**
     * Returns the time, in seconds, between the last and current frame.
     */
    function Frametime( ): Number;

    /**
     * Returns the time, in seconds, since the server started.
     */
    function Curtime( ): Number;

    /**
     * Returns the interval, in seconds, between each tick.
     */
    function TickInterval( ): Number;

    /**
     * Returns the server's amount of ticks/second.
     */
    function Tickrate( ): Number;

    /**
     * Returns the time, in ticks, since the server started.
     */
    function Tickcount( ): Number;

    /**
     * Returns the current FrameStageNotify stage.
     * @deprecated
     */
    function FrameStage( ): Number;
}

declare namespace UI {
    /**
     * Register a new callback to a certain menu element.
     * @param path The element's path.
     */
    function RegisterCallback( path: Path ): void;

    /**
     * Returns the cheat's menu position.
     */
    function GetMenuPosition( ): Array<Number>;

    /**
     * Updates the list of a Dropdown or Multi-dropdown.
     * @param path The element's path.
     * @param list The new list of values.
     */
    function UpdateList( path: Path, list: Array<String> ): void;

    /**
     * Removes a menu element created by a script.
     * @param path The element's path.
     */
    function RemoveItem( path: Path ): void;

    /**
     * Returns the virtual-key code for a hotkey.
     * @param path The element's path.
     */
    function GetHotkey( path: Path ): Number;

    /**
     * Overrides a hotkey's state/mode.
     * @param path The element's path.
     * @param state The new state in string form. This can either be 'Always', 'Toggle' or 'Hold'.
     */
    function SetHotkeyState( path: Path, state: String ): void;

    /**
     * Returns the state/mode of a hotkey.
     * @param path The element's path.
     */
    function GetHotkeyState( path: Path ): String;

    /**
     * Toggles a hotkey on/off. Only works on hotkeys set to 'Toggle'.
     * @param path The element's path.
     */
    function ToggleHotkey( path: Path ): void;

    /**
     * Overrides a color-picker's color.
     * @param path The element's path.
     * @param color The new color.
     */
    function SetColor( path: Path, color: Array<Number> ): void;

    /**
     * Creates a new sub-tab and returns its path.
     * @param path The path to the tab.
     * @param name The sub-tab's name.
     */
    function AddSubTab( path: Path, name: String ): Path;

    /**
     * Creates a new textbox and returns its path.
     * @param path The path to the textbox.
     * @param name The textbox's name.
     */
    function AddTextbox( path: Path, name: String ): Path;

    /**
     * Creates a new color picker and returns its path.
     * @param path The path to the color picker.
     * @param name The color picker's name.
     */
    function AddColorPicker( path: Path, name: String ): Path;

    /**
     * Creates a new multi-dropdown and returns its path.
     * @param path The path to the multi-dropdown.
     * @param name The multi-dropdown's name.
     * @param values The multi-dropdown's values.
     * @param search_bar Whether or not the multi-dropdown should contain a search bar.
     */
    function AddMultiDropdown( path: Path, name: String, values: Array<String>, search_bar: Number ): Path;

    /**
     * Creates a new dropdown and returns its path.
     * @param path The path to the dropdown.
     * @param name The dropdown's name.
     * @param values The dropdown's values.
     * @param search_bar Whether or not the dropdown should contain a search bar.
     */
    function AddDropdown( path: Path, name: String, values: Array<String>, search_bar: Number ): Path;

    /**
     * Creates a new hotkey and returns its path.
     * @param path The path to the hotkey. Can only be inside a hotkey list.
     * @param name The hotkey's name.
     * @param display_name The hotkey's display name, shown in the keybind list.
     */
    function AddHotkey( path: Path, name: String, display_name: String ): Path;

    /**
     * Creates a new integer slider and returns its path.
     * @param path The path to the slider.
     * @param name The slider's name.
     * @param min The minimum value of the slider.
     * @param max The maximum value of the slider.
     */
    function AddSliderInt( path: Path, name: String, min: Number, max: Number ): Path;

    /**
     * Creates a new float slider and returns its path.
     * @param path The path to the slider.
     * @param name The slider's name.
     * @param min The minimum value of the slider.
     * @param max The maximum value of the slider.
     */
    function AddSliderFloat( path: Path, name: String, min: Number, max: Number ): Path;

    /**
     * Creates a new checkbox and returns its path.
     * @param path The path to the checkbox.
     * @param name The checkbox's name.
     */
    function AddCheckbox( path: Path, name: String ): Path;

    /**
     * Overrides the value of a menu element. Used in everything except color-pickers, hotkeys and textboxes.
     * @param path The path to the element.
     * @param value The new value.
     */
    function SetValue( path: Path, value: Number ): Path;

    /**
     * Gets the value of a menu element and returns it.
     * @param path The path to the element.
     */
    function GetValue( path: Path ): Number;

    /**
     * Gets the value of a element in a string form. Used mainly on textboxes.
     * @param path The path to the element.
     */
    function GetString( path: Path ): String;

    /**
     * Gets the color of a color-picker and returns it.
     * @param path The path to the color-picker.
     */
    function GetColor( path: Path ): Array<Number>;

    /**
     * Gets all menu element's within a certain path and return them.
     * @param path The path to the container.
     */
    function GetChildren( path: Path ): Array<String>;

    /**
     * Returns whether or not the cheat's menu is open.
     */
    function IsMenuOpen( ): Boolean;

    /**
     * Overrides a menu element's visibility.
     * @param path The path to the element.
     * @param visible Whether or not the element should be visible.
     */
    function SetEnabled( path: Path, visible: Number ): void;
}

declare namespace Entity {
    /**
     * Returns an array with all entities in the server.
     */
    function GetEntities( ): Array<EntityID>;

    /**
     * Returns an array with all players in the server.
     */
    function GetPlayers( ): Array<EntityID>;

    /**
     * Returns an array with all enemies in the server.
     */
    function GetEnemies( ): Array<EntityID>;

    /**
     * Returns an array with all teammates in the server.
     */
    function GetTeammates( ): Array<EntityID>;

    /**
     * Returns the entity ID of the local player.
     */
    function GetLocalPlayer( ): EntityID;

    /**
     * Returns the entity index of the entity equivalent to the specified user index.
     * @param index The user's index.
     */
    function GetEntityFromUserID( index: UserID ): EntityID;

    /**
     * Returns whether or not the specified entity is a teammate.
     * @param index The entity's index.
     */
    function IsTeammate( index: EntityID ): Boolean;

    /**
     * Returns whether or not the specified entity is an enemy.
     * @param index The entity's index.
     */
    function IsEnemy( index: EntityID ): Boolean;

    /**
     * Returns whether or not the specified entity is ourselves.
     * @param index The entity's index.
     */
    function IsLocalPlayer( index: EntityID ): Boolean;

    /**
     * Returns whether or not the specified entity is valid.
     * @param index The entity's index.
     */
    function IsValid( index: EntityID ): Boolean;

    /**
     * Returns whether or not the specified entity is alive.
     * @param index The entity's index.
     */
    function IsAlive( index: EntityID ): Boolean;

    /**
     * Returns whether or not the specified entity is dormant.
     * @param index The entity's index.
     */
    function IsDormant( index: EntityID ): Boolean;

    /**
     * Returns whether or not the specified entity is a bot.
     * @param index The entity's index
     */
    function IsBot( index: EntityID ): Boolean;

    /**
     * Returns the entity's class identifier.
     * @param index The entity's index
     */
    function GetClassID( index: EntityID ): Number;

    /**
     * Returns the entity's class name.
     * @param index The entity's index
     */
    function GetClassName( index: EntityID ): String;
    
    /**
     * Returns the entity's name.
     * @param index The entity's index
     */
    function GetName( index: EntityID ): String;

    /**
     * Returns the entity's origin position.
     * @param index The entity's index
     */
    function GetRenderOrigin( index: EntityID ): Vector;

    /**
     * Returns the entity's eye position.
     * @param index The entity's index
     */
    function GetEyePosition( index: EntityID ): Vector;

    /**
     * Returns the hitbox's position of an entity.
     * @param index The entity's index
     * @param hitbox_index The hitbox's index. Ranges from 0 to 18.
     */
    function GetHitboxPosition( index: EntityID, hitbox_index: Number ): Vector;

    /**
     * Gets a property from an entity. Returns property's name on failure.
     * @param index The entity's index
     * @param table The property's table
     * @param prop The property's name
     */
    function GetProp( index: EntityID, table: String, prop: String ): any;

    /**
     * Overrides a property of an entity. Cannot be used on players.
     * @param index The entity's index
     * @param table The property's table
     * @param prop The property's name
     * @param value The new value
     */
    function SetProp( index: EntityID, table: String, prop: String, value: any ): any;

    /**
     * Returns the weapon's entity index of a player.
     * @param index The player's index
     */
    function GetWeapon( index: EntityID ): EntityID;

    /**
     * Returns an array containing all of the weapon's entity indexes of a player.
     * @param index 
     */
    function GetWeapons( index: EntityID ): Array<EntityID>;

    /**
     * Returns the game's CCSGameRulesProxy entity.
     */
    function GetGameRulesProxy( ): EntityID;

    /**
     * Returns an array containing all entities of a certain class.
     * @param class_index The class' index.
     */
    function GetEntitiesByClassID( class_index: Number ): Array<EntityID>;

    /**
     * Returns an array containing the data of a entity's bounding box: whether or not the box is valid, the box's top left corner X position,
     * the box's top left Y position, the box's bottom right X position and the box's bottom right Y position.
     * @param index The entity's index
     */
    function GetRenderBox( index: EntityID ): Array<Number>;

    /**
     * Returns an object containing all the info of a given weapon.
     * @param index The player's or weapon's index.
     */
    function GetCCSWeaponInfo( index: EntityID ): Object;

    /**
     * Adds a flag to a player's flag list, for one tick.
     * @param index The player's index
     * @param flag The flag
     * @param color The flag's color
     */
    function DrawFlag( index: EntityID, flag: String, color: Array<Number> ): void;

    /**
     * Disables all ESP on a player, for one tick. Does not affect chams.
     * @param index The player's index.
     */
    function DisableESP( index: EntityID ): void;

    /**
     * Returns an entity's STEAM64 identification.
     * @param index 
     */
    function GetSteamID( index: EntityID ): void;
}

declare namespace Render {
    /**
     * Renders a line.
     * @param x1 The first X position
     * @param y1 The first Y position
     * @param x2 The second X position
     * @param y2 The second Y position
     * @param color The line's color
     */
    function Line( x1: Number, y1: Number, x2: Number, y2: Number, color: Array<Number> ): void;

    /**
     * Renders a rectangle outline.
     * @param x The X position
     * @param y The Y position
     * @param w The rectangle's width
     * @param h The rectangle's height
     * @param color The rectangle's color
     */
    function Rect( x: Number, y: Number, w: Number, h: Number, color: Array<Number> ): void;

    /**
     * Renders a rectangle.
     * @param x The X position
     * @param y The Y position
     * @param w The rectangle's width
     * @param h The rectangle's height
     * @param color The rectangle's color
     */
    function FilledRect( x: Number, y: Number, w: Number, h: Number, color: Array<Number> ): void;

    /**
     * Renders a ring.
     * @param x The X position
     * @param y The Y position
     * @param radius The circle's radius
     * @param color The circle's color
     */
    function Circle( x: Number, y: Number, radius: Number, color: Array<Number> ): void;

    /**
     * Renders a circle.
     * @param x The X position
     * @param y The Y position
     * @param radius The circle's radius
     * @param color The circle's color
     */
    function FilledCircle( x: Number, y: Number, radius: Number, color: Array<Number> ): void;

    /**
     * Renders a gradient.
     * @param x The X position
     * @param y The Y position
     * @param w The gradient's width
     * @param h The gradient's height
     * @param is_horizontal The gradient's direction. Use '0' for vertical and '1' for horizontal.
     * @param color1 The gradient's first color
     * @param color2 The gradient's second color
     */
    function GradientRect( x: Number, y: Number, w: Number, h: Number, is_horizontal: Number, color1: Array<Number>, color2: Array<Number> ): void;

    /**
     * Renders a rectangle with a texture.
     * @param x The X position
     * @param y The Y position
     * @param w The rectangle's width
     * @param h The rectangle's height
     * @param texture_index The rectangle's texture index
     */
    function TexturedRect( x: Number, y: Number, w: Number, h: Number, texture_index: Number ): void;

    /**
     * Renders a string.
     * @param x The X position
     * @param y The Y position
     * @param centered Whether or not it should be centered.
     * @param text The actual string
     * @param color The string's color
     * @param font The string's font. Onetap has predefined fonts from 1 to 7.
     */
    function String( x: Number, y: Number, centered: Number, text: String, color: Array<Number>, font: Number ): void;

    /**
     * Renders a polygon.
     * @param points A matrix of all 3 points of the polygon.
     * @param color The polygon's color.
     */
    function Polygon( points: Array<Array<Number>>, color: Array<Number> ): void;

    /**
     * Convers a 3D point into a 2D point on your screen and returns its X and Y positions, and whether or not the point is behind you.
     * @param point The 3D point
     */
    function WorldToScreen( point: Vector ): Array<Number>;

    /**
     * Returns the width and height of your screen.
     */
    function GetScreenSize( ): Array<Number>;

    /**
     * Creates a new font and returns its index.
     * @param font The font's name
     * @param size The font's size
     * @param weight The font's weight. Deprecated.
     */
    function AddFont( font: String, size: Number, weight?: Number ): Number;

    /**
     * Finds an already existing font by its parameters.
     * @param font The font's name
     * @param size The font's size
     * @param weight The font's weight.
     */
    function FindFont( font: String, size: Number, weight?: Number ): Number;

    /**
     * Creates a new texture.
     * @param path The file's path relative to CSGO's folder. Supported files are .bmp, .dds, .dib, .hdr, .jpg, .pfm, .png, .ppm and .tga.
     */
    function AddTexture( path: String ): Number;

    /**
     * Returns the width and height of a string.
     * @param text The actual string
     * @param font The string's font
     */
    function TextSize( text: String, font: Number ): Array<Number>;
}

declare namespace Convar {
    /**
     * Gets a CVar's value in integer form.
     * @param cvar The CVar.
     * @deprecated
     */
    function GetInt( cvar: String ): Number;

    /**
     * Gets a CVar's value in float form.
     * @param cvar The CVar.
     */
    function GetFloat( cvar: String ): Number;

    /**
     * Gets a CVar's value in string form.
     * @param cvar The CVar.
     */
    function GetString( cvar: String ): String;

    /**
     * Overrides a CVar's value to a specified integer.
     * @param cvar The CVar.
     * @deprecated
     */
    function SetInt( cvar: String, value: Number ): void;

    /**
     * Overrides a CVar's value to a specified float.
     * @param cvar The CVar.
     */
    function SetFloat( cvar: String, value: Number ): void;

    /**
     * Overrides a CVar's value to a specified string.
     * @param cvar The CVar.
     */
    function SetString( cvar: String, value: String ): void;
}

declare namespace Event {
    /**
     * Gets a field's value in integer form.
     * @param field_name The field.
     */
    function GetInt( field_name: String ): Number;

    /**
     * Gets a field's value in float form.
     * @param field_name The field.
     */
    function GetFloat( field_name: String ): Number;

    /**
     * Gets a field's value in string form.
     * @param field_name The field.
     */
    function GetString( field_name: String ): String;
}

declare namespace Trace {
    /**
     * Traces a line from a point to another and returns its data.
     * @param skip_entity The entity to be ignored
     * @param from The initial position
     * @param to The ending position
     * @returns The entity index of a hit entity or undefined, the fraction of the trace ('0' means it hit immediately, '1' means it went fully through).
     */
    function Line( skip_entity: EntityID, from: Vector, to: Vector ): Array<Number>;

    /**
     * Traces a bullet from a point to another and returns its data.
     * @param attacker The entity who attacked
     * @param victim The enttiy who should be hit
     * @param from The initial position
     * @param to The ending position
     * @returns The entity index of a hit entity or undefined, the damage dealt, whether or not the ending position is visible and the hitbox that was hit. 
     */
    function Bullet( attacker: EntityID, victim: EntityID, from: Vector, to: Vector ): Array<Number>;

    /**
     * Traces a line from a point to another with a custom mask and returns its data. For advanced users only.
     * @param skip_entity The entity to be ignored
     * @param from The initial position
     * @param to The ending position
     * @param mask The custom mask
     * @param type The type. '0' will trace everything, '1' will trace only the world and '2' will trace only the entities.
     * @returns The entity index of a hit entity or undefined, the fraction of the trace ('0' means it hit immediately, '1' means it went fully through).
     */
    function RawLine( skip_entity: EntityID, from: Vector, to: Vector, mask: Number, type: Number ): Array<Number>;

    /**
     * Returns whether or not a line goes through a smoke. Breaks if smoke is removed.
     * @param from The initial position
     * @param to The ending position
     */
    function Smoke( from: Vector, to: Vector ): Number;
}

declare namespace UserCMD {
    /**
     * Returns an array containing forward, sideways and up movement.
     */
    function GetMovement( ): Array<Number>;

    /**
     * Returns a bit-mask of all buttons.
     */
    function GetButtons( ): Number;

    /**
     * Overrides the UserCMD's movement.
     * @param values 
     */
    function SetMovement( values: Array<Number> ): void;

    /**
     * Overrides the UserCMD's buttons.
     * @param buttons 
     */
    function SetButtons( buttons: Number ): void;

    /**
     * Overrides your UserCMD's angles.
     * @param angles The new angles
     * @param silent Whether or not you should visualize those angles.
     */
    function SetViewAngles( angles: Vector, silent: Boolean ): void;

    /**
     * Overrides the mouse's X position.
     * @param x The new position.
     * @deprecated
     */
    function SetMouseX( x: Number ): void;

    /**
     * Overrides the mouse's Y position.
     * @param y The new position.
     * @deprecated
     */
    function SetMouseY( y: Number ): void;

    /**
     * Forces the cheat to choke a tick.
     */
    function Choke( ): void;

    /**
     * Forces the cheat to send a tick. 
     */
    function Send( ): void;
}

declare namespace Sound {
    /**
     * Plays a sound.
     * @param path The path to the sound file.
     */
    function Play( path: String ): void;

    /**
     * Plays a sound on your in-game microphone.
     * @param path The path to the sound file.
     */
    function PlayMicrophone( path: String ): void;

    /**
     * Stops playing a sound on your microphone.
     */
    function StopMicrophone( ): void;
}

declare namespace Local {
    /**
     * Returns your latency/ping in seconds.
     */
    function Latency( ): Number;

    /**
     * Returns a vector containing your pitch, yaw and roll.
     */
    function GetViewAngles( ): Vector;

    /**
     * Returns a vector containing your camera's pitch, yaw and roll.
     */
    function GetCameraAngles( ): Vector;

    /**
     * Returns a vector containing your camera's X, Y and Z positions.
     */
    function GetCameraPosition( ): Vector;

    /**
     * Overrides your engine's view angles.
     * @param angles The new angles
     */
    function SetViewAngles( angles: Vector ): void;

    /**
     * Overrides your camera's angles.
     * @param angles The new angles
     */
    function SetCameraAngles( angles: Vector ): void;

    /**
     * Overrides your camera's position.
     * @param point The new position.
     */
    function SetCameraPosition( point: Vector ): void;

    /**
     * Overrides your clan-tag.
     * @param tag The new clan-tag.
     */
    function SetClanTag( tag: String ): void;

    /**
     * Returns your real anti-aim yaw.
     */
    function GetRealYaw( ): Number;

    /**
     * Returns your fake anti-aim yaw.
     */
    function GetFakeYaw( ): Number;

    /**
     * Gets your weapon's spread.
     */
    function GetSpread( ): Number;

    /**
     * Gets your weapon's inaccuracy.
     */
    function GetInaccuracy( ): Number;
}

declare namespace Cheat {
    /**
     * Prints a message to the console.
     * @param msg The message
     */
    function Print( msg: String ): void;

    /**
     * Prints a colored message to the console.
     * @param color The color
     * @param msg The message
     */
    function PrintColor( color: Array<Number>, msg: String ): void;

    /**
     * Prints a message to the in-game chat. Client-sided.
     * @param msg The message
     */
    function PrintChat( msg: String ): void;

    /**
     * Executes a console command.
     * @param cmd The command
     */
    function ExecuteCommand( cmd: String ): void;

    /**
     * Register a new callback
     * @param callback The callback's name
     * @param fun The function's name
     */
    function RegisterCallback( callback: String, fun: String ): void;

    /**
     * Returns the user's name.
     */
    function GetUsername( ): String;

    /**
     * Returns whether or not the Legit tab has a configuration for the specified item ID.
     * @param item_id The weapon's item index. 
     * @example Cheat.IsLegitConfigActive( Entity.GetProp( weapon, "CBaseAttributableItem", "m_iItemDefinitionIndex" ) & 0xFFFF );
     */
    function IsLegitConfigActive( item_id: Number ): Boolean;

    /**
     * Returns whether or not the Rage tab has a configuration for the specified item ID.
     * @param item_id The weapon's item index. 
     * @example Cheat.IsRageConfigActive( Entity.GetProp( weapon, "CBaseAttributableItem", "m_iItemDefinitionIndex" ) & 0xFFFF );
     */
    function IsRageConfigActive( item_id: Number ): Boolean;
}

declare namespace Input {
    /**
     * Returns whether or not a key is being held.
     * @param vkey_code The virtual-key code.
     */
    function IsKeyPressed( vkey_code: Number ): Boolean;

    /**
     * Returns the X and Y positions of the cursor.
     */
    function GetCursorPosition( ): Array<Number>;

    /**
     * Toggles the visibility of the cursor.
     * @param visible Whether or not it is visible. 
     */
    function ForceCursor( visible: Number ): void;
}

declare namespace World {
    /**
     * Returns the server's IP.
     */
    function GetServerString( ): String;

    /**
     * Returns the current map's name.
     */
    function GetMapName( ): String;
}

declare namespace AntiAim {
    /**
     * Returns whether or not the anti-aim is being overriden.
     */
    function GetOverride( ): Boolean;

    /**
     * Starts/stops overriding the anti-aim.
     * @param active Whether or not the override is active.
     */
    function SetOverride( active: Number ): void;

    /**
     * Overrides your real (body) offset.
     * @param offset The new offset.
     */
    function SetRealOffset( offset: Number ): void;

    /**
     * Overrides your fake (yaw) offset.
     * @param offset The new offset.
     */
    function SetFakeOffset( offset: Number ): void;

    /**
     * Overrides your LBY (desync) offset.
     * @param offset The new offset.
     */
    function SetLBYOffset( offset: Number ): void;
}

declare namespace Exploit {
    /**
     * Returns a fraction representing how much of the exploit is charged. '0' means it's completely uncharged and '1' means it's fully charged.
     */
    function GetCharge( ): Number;

    /**
     * Forces the cheat to recharge.
     */
    function Recharge( ): void;

    /**
     * Enables the cheat's automatic recharging.
     */
    function EnableRecharge( ): void;

    /**
     * Disables the cheat's automatic recharging.
     */
    function DisableRecharge( ): void;

    /**
     * Overrides the exploit's shift amount.
     * @param amount The new amount. The maximum recommended amount is 15.
     */
    function OverrideShift( amount: Number ): void;

    /**
     * Overrides the exploit's tolerance amount.
     * @param amount The new amount. The minimum amount is 1.
     */
    function OverrideTolerance( amount: Number ): void;

    /**
     * Overrides the cheat's shift and choke cap. 
     * WARNING: This is highly unstable and can easily break your game. Use only if you know what you're doing.
     * @param amount The new amount. The maximum amount is 32.
     */
    function OverrideMaxProcessTicks( amount: Number ): void;
}

declare namespace Ragebot {
    /**
     * Returns the current ragebot target. This only returns an entity right before shooting, so most of the
     * time it'll just return undefined.
     */
    function GetTarget( ): EntityID;

    /**
     * Returns an array containing all possible ragebot targets.
     */
    function GetTargets( ): Array<EntityID>;

    /**
     * Returns the hitchance of the ragebot's target.
     */
    function GetTargetHitchance( ): Number;

    /**
     * Forces the ragebot to prioritize a certain player.
     * @param index The entity's index
     */
    function ForceTarget( index: EntityID ): void;
    
    /**
     * Forces the ragebot to ignore a player.
     * @param index The entity's index
     */
    function IgnoreTarget( index: EntityID ): void;

    /**
     * Forces the ragebot to ignore a hitbox on a specific player.
     * @param index The entity's index
     * @param hitbox The hitbox's index
     */
    function IgnoreTargetHitbox( index: EntityID, hitbox: Number ): void;

    /**
     * Forces the ragebot to target only safe points on a player.
     * @param index The entity's index
     */
    function ForceTargetSafety( index: EntityID ): void;

    /**
     * Forces the ragebot to target a player for a certain hitchance.
     * @param index The entity's index
     * @param hitchance The new hitchance
     */
    function ForceTargetHitchance( index: EntityID, hitchance: Number ): void;

    /**
     * Forces the ragebot to target a player for a certain min. damage.
     * @param index The entity's index
     * @param dmg The new min. damage
     */
    function ForceTargetMinimumDamage( index: EntityID, dmg: Number ): void;

    /**
     * Forces the ragebot to target only safe points for a specific hitbox.
     * @param hitbox The hitbox's index
     */
    function ForceHitboxSafety( hitbox: Number ): void;
}

declare namespace Material {
    /**
     * Creates a new material and returns true on success.
     * @param name The material's name
     */
    function Create( name: String ): Boolean;

    /**
     * Deletes an existing material and returns true on success.
     * @param name The material's name
     */
    function Destroy( name: String ): Boolean;

    /**
     * Gets an existing material by the name and returns its index.
     * @param name The material's name
     */
    function Get( name: String ): Number;

    /**
     * Overrides a material shader's value and returns true on success. Can only be called in 'Material' callback.
     * @param index The material's index
     * @param shader The shader's name
     * @param value The shader's value
     */
    function SetKeyValue( index: Number, shader: String, value: String ): Boolean;

    /**
     * Applies changes to a material and returns true on success. Can only be called in 'Material' callback.
     * @param index The material's index
     */
    function Refresh( index: Number ): Boolean;
}

declare namespace View {
    /**
     * Creates a new view object and returns its index.
     */
    function Create( ): Number;

    /**
     * Updates the view with the specified resolution, position and angles. Can only be called in 'FRAME_RENDER_START' callback.
     * @param index The view's index
     * @param w The width of the image
     * @param h The height of the image
     * @param origin The camera position
     * @param angles The camera angles
     */
    function Update( index: Number, w: Number, h: Number, origin: Vector, angles: Vector ): void;

    /**
     * Renders a rectangle representing the image the view last captured.
     * @param index The view's index
     * @param x The X position
     * @param y The Y position
     * @param w The rectangle's width
     * @param h The rectangle's height
     */
    function Render( index: Number, x: Number, y: Number, w: Number, h: Number ): void;

    /**
     * Converts a 3D point into a 2D point on your screen relative to the view's camera position and angles.
     * @param index The view's index
     * @param point The 3D point
     */
    function WorldToScreen( index: Number, point: Vector ): Array<Number>;
}

declare namespace DataFile {
    /**
     * Saves all current cached keys/values to a specific file.
     * @param file The file's name
     */
    function Save( file: String ): void;

    /**
     * Loads all keys/values from a specific file.
     * @param file The file's name
     */
    function Load( file: String ): void;

    /**
     * Gets a value from a specific file.
     * @param file The file's name
     * @param key The key
     */
    function GetKey( file: String, key: String ): String;

    /**
     * Assigns a value to a specific key in a specific file and caches it for saving.
     * @param file The file's name
     * @param key The key
     * @param value The value
     */
    function SetKey( file: String, key: String, value: String ): void;
}
