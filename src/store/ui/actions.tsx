import { SidebarState, TOGGLE_SIDEBAR } from './types';
export const toggleSidebar = (newState : SidebarState) => {
    return {
        type: TOGGLE_SIDEBAR,
        payload: newState
    };
};
