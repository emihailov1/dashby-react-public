import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { AppState } from '../../store'
import { SidebarState } from '../../store/ui/types';
import { toggleSidebar } from '../../store/ui/actions';
import { logOut } from '../../store/auth/actions';

import logo from '../../scss/layout/logo-brand.png'
import avatar from '../../scss/layout/user.png'

interface NavbarProps {
    logOut: typeof logOut,
    toggleSidebar: typeof toggleSidebar,
    sidebar: SidebarState
}

interface IState {
    dropdownOpen: boolean;
}

class Navbar extends React.Component<NavbarProps, IState> {

    constructor(props: NavbarProps) {
        super(props);

        this.state = {
          dropdownOpen: false
        };
      }

    toggleRightMenu = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleSidebar = () => {
        let newState : SidebarState = {'sidebar-active': this.props.sidebar['sidebar-active'], 'sidebar-active-sm': this.props.sidebar["sidebar-active-sm"]};
        if(window.innerWidth<=1000) newState['sidebar-active-sm'] = !this.props.sidebar["sidebar-active-sm"];
        else newState['sidebar-active'] = !this.props.sidebar['sidebar-active'];

        this.props.toggleSidebar(newState);
    }
    
    render () {
        return (
        <header className="navbar fixed-top app-navbar">
            <div className="navbar-brand-holder">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="Dashby logo" className="navbar-brand-full img-fluid" />
                </Link>
                <button onClick={this.toggleSidebar} className="navbar-toggler sidebar-toggler" type="button" data-toggle="sidebar-lg-show">
                    <i className="fa fa-bars fa-2x"></i>
                </button>
            </div>
            <ul className="nav ml-auto">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleRightMenu}>
                <DropdownToggle caret tag="a">
                    <img src={avatar} alt="user@gmail.com" className="img-fluid rounded-circle navbar__avatar" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-right">
                <div className="dropdown-menu__header text-center">Account</div>
                        <Link onClick={this.props.logOut} to="#" className="dropdown-item">Logout</Link>
                </DropdownMenu>
            </Dropdown>
            </ul>
        </header>
        );
    }
    
}

const mapStateToProps = (state: AppState) => ({
    sidebar: state.sidebar
});

export default connect(mapStateToProps, { toggleSidebar, logOut })(Navbar);