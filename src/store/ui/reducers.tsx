import { SidebarState, TOGGLE_SIDEBAR, UiActionTypes } from './types';

const initialState: SidebarState = {
    'sidebar-active' : true,
    'sidebar-active-sm': false
};
function uiReducer (
    state = initialState,
    action: UiActionTypes
  ): SidebarState {
    switch (action.type) {
      case TOGGLE_SIDEBAR: {
        return {...state,...action.payload};
      }
      default:
        return state;
    }
  }
export {uiReducer};
