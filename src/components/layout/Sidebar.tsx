import React from 'react';
import { Link } from 'react-router-dom';
import { SecuredContent } from '../shared/authHelper';
import { Roles } from '../shared/roles';

interface SidebarProps {
    active: string
}

const isActive = (to:string,current:string) => {
    return  (to===current) ? 'active' : '';
}

const getNavLinkClassname = (to:string,current:string) => {
    return `sidebar-nav-item-link ${isActive(to,current)}`;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    return (
        <div className="sidebar sidebar-fixed">
            <ul className="sidebar-nav">
                <SecuredContent roles={[Roles.Admin]}>
                    <li className="sidebar-nav-item">
                        <Link to="/dashboard" className={getNavLinkClassname('/dashboard',props.active)}>
                            <i className="sidebar-nav-icon fa fa-cube"></i>
                            Dashboard
                            <span className="badge badge-info">New</span>
                        </Link>
                    </li>
                </SecuredContent>
                <SecuredContent roles={[Roles.Admin]}>
                    <li className="sidebar-nav-item">
                    <Link to="/users" className={getNavLinkClassname('/users',props.active)}>
                        <i className="sidebar-nav-icon fa fa-users"></i>
                        Users
                    </Link>
                    </li>
                </SecuredContent>
            </ul>
        </div>
    );
}

export default Sidebar;