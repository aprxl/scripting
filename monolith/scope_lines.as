/*
 *
 * Title: Custom scope lines
 * Author: april#0001
 * Description: Renders grandient 'lines' as scope lines.
 *
 */

//region Globals
// Initialize our global interfaces.
ISurface@ g_Surface = Interfaces.Surface;
IEngineClient@ g_Engine = Interfaces.EngineClient;
IClientEntityList@ g_EntityList = Interfaces.ClientEntityList;
CGlobalVarsBase@ g_Globals = Interfaces.Globals;

// Initialize our FrameStage_t enum.
enum g_Stage {
	FRAME_UNDEFINED = -1,
	FRAME_START,
	FRAME_NET_UPDATE_START,
	FRAME_NET_UPDATE_POSTDATAUPDATE_START,
	FRAME_NET_UPDATE_POSTDATAUPDATE_END,
	FRAME_NET_UPDATE_END,		

	FRAME_RENDER_START,
	FRAME_RENDER_END
};
//endregion

//region Functions
//region UI
namespace UI {
     // Handles the menu's open state
     bool m_Open      = false;
     
     // Saves the script's settings
     bool m_Enabled   = false;
     float m_Size     = 5;
     float m_Offset   = 1;

     // Saves the scope's color
     float m_ColorR   = 255;
     float m_ColorG   = 255;
     float m_ColorB   = 255;

     void Render( ) {
          // Creates a new window
          if ( Menu::Begin( "Scope Lines", m_Open, 0 ) ) {
               // Adds the master switch
               Menu::Checkbox( "Enable", m_Enabled );
               
               // Checks if the master switch is enabled in order to render the 
               // rest of the elements
               if ( m_Enabled ) {
                    // Render the other elements
                    Menu::SliderFloat( "Size", m_Size, 1.f, 100.f, "%.1f%%", 2.f );
                    Menu::SliderFloat( "Offset", m_Offset, 0.f, 100.f, "%.1f%%", 2.f );

                    Menu::Text( "Color" );

                    Menu::SetNextItemWidth( 75.f );
                    Menu::SliderFloat( "Red", m_ColorR, 0.f, 255.f, "%.0f", 1.f );
                    Menu::SetNextItemWidth( 75.f );
                    Menu::SameLine( 0.f, 5.f );
                    Menu::SliderFloat( "Green", m_ColorG, 0.f, 255.f, "%.0f", 1.f );
                    Menu::SetNextItemWidth( 75.f );
                    Menu::SameLine( 0.f, 5.f );
                    Menu::SliderFloat( "Blue", m_ColorB, 0.f, 255.f, "%.0f", 1.f );
               }

               // Ends the window
               Menu::End( );
          }
     }
}
//endregion

//region Scope
namespace Scope {
     // Used to save the last state of the master switch so we can
     // update the 'fov_cs_debug' cvar
     bool m_LastEnabled = false;

     // Used to determine whether or not to render the scope lines
     bool m_Scoped = false;
     float m_AnimTime = 0.f;

     void RemoveScope( CBaseEntity& me ) {
          // Calculate the fraction which should be added/subtracted this frame
          const float increment = g_Globals.frametime * 8;

          // Check if the local player is scoped
          if ( me.IsScoped( ) ) {
               // If so, set 'm_bIsScoped' to false, causing the scope overlay to disappear.
               me.IsScoped( ) = false;

               // Tell the script we're scoped in and update the animation time.
               m_Scoped = true;
               m_AnimTime = Util.ClampFloat( m_AnimTime + increment, 0.f, 1.f );
               return;
          }
               
          // Otherwise, tell the script we aren't scoped in and update the animation time.
          m_Scoped = false;
          m_AnimTime = Util.ClampFloat( m_AnimTime - increment, 0.f, 1.f );
     }

     void PreserveViewModel( ) {
          // Check if the master switch's state has changed.
          if ( m_LastEnabled == UI::m_Enabled )
               return;

          // Cache the current state for further checks.
          m_LastEnabled = UI::m_Enabled;

          // Set 'fov_cs_debug' to 90 if we enabled the script, or to 0 if we disabled it.
          UI::m_Enabled ? g_Engine.ClientCmd_Unrestricted( "fov_cs_debug 90", false ) : g_Engine.ClientCmd_Unrestricted( "fov_cs_debug 0", false );
     }

     void Do( D3D9Renderer& ctx ) {
          // Check if we're scoped in and still animating.
          if ( !m_Scoped && m_AnimTime == 0 )
               return;

          // Declare and get the screen's width and height.
          int w, h;

          g_Surface.GetScreenSize( w, h );

          // Calculate the line's size and offset based on the user's settings.
          int size = int( UI::m_Size * w / 100 );
          int offset = int( UI::m_Offset * w / 100 );

          // Initialize the colors used on the scope lines.
          uint transparent_clr = Color( int( UI::m_ColorR ), int( UI::m_ColorG ), int( UI::m_ColorB ), 0 ).D3D( );
          uint filled_clr = Color( int( UI::m_ColorR ), int( UI::m_ColorG ), int( UI::m_ColorB ), int( 255 * m_AnimTime ) ).D3D( );

          // Render all four lines.
          ctx.FilledRect( Vec2( w / 2, h / 2 - offset - size ), 1, size, filled_clr, transparent_clr, filled_clr, transparent_clr );
          ctx.FilledRect( Vec2( w / 2, h / 2 + offset ), 1, size, transparent_clr, filled_clr, transparent_clr, filled_clr );
          ctx.FilledRect( Vec2( w / 2 - offset - size, h / 2 ), size, 1, transparent_clr, transparent_clr, filled_clr, filled_clr );
          ctx.FilledRect( Vec2( w / 2 + offset, h / 2 ), size, 1, filled_clr, filled_clr, transparent_clr, transparent_clr );
     }
}
//endregion

//region Callbacks
void onMenu( ) {
     // Checks whether or not the menu is open so we can render our window.
     if ( CheatVars.menuOpen )
          UI::Render( );
}

void onPaint( D3D9Renderer& ctx ) {
     // Check if the script is enabled.
     if ( !UI::m_Enabled )
          return;

     // Check if we're in-game and connected to a server.
     if ( !g_Engine.IsInGame( ) || !g_Engine.IsConnected( ) ) {
          // Otherwise, reset the scope animation. Doing this so when you die/disconnect while scoped,
          // you don't render the scope the next time you play.
          Scope::m_AnimTime = 0.f;
          return;
     }
          
     // Get our local player.
     CBaseEntity@ me = g_EntityList.GetLocalPlayer( );

     // Check if we're valid and alive.
     if ( me is null || !me.IsAlive( ) ) {
          // Otherwise, reset the scope animation.
          Scope::m_AnimTime = 0.f;
          return;
     }
          
     // Render the scope lines.
     Scope::Do( ctx );
}

void onFSN( int stage ) {
     // Check if we're on the correct FrameStage.
     if ( stage != g_Stage::FRAME_RENDER_START )
          return;

     // Enable/Disable the viewmodel when scopped.
     Scope::PreserveViewModel( );

     // Check if the script is enabled.
     if ( !UI::m_Enabled )
          return;

     // Get our local player.
     CBaseEntity@ me = g_EntityList.GetLocalPlayer( );

     // Check if we're valid and alive.
     if ( me is null || !me.IsAlive( ) )
          return;

     // Removes the scope overlay/lines.
     Scope::RemoveScope( me );
}

void init( ) {
     // Register our callbacks.
     RegisterCallback( "OnPaint", onPaint );
     RegisterCallback( "OnMenu", onMenu );
     RegisterCallback( "OnFrameStagePre", onFSN );
}
//endregion
//endregion
