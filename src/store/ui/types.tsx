export interface SidebarState {
    'sidebar-active' : boolean,
    'sidebar-active-sm': boolean
}

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

interface ToggleSidebarAction {
    type: typeof TOGGLE_SIDEBAR;
    payload: SidebarState;
  }
  
  export type UiActionTypes = ToggleSidebarAction;