import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { AppState } from '../../store';
import { SidebarState } from '../../store/ui/types';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Breadcrumb } from '../ui/';

import { AuthWrapper } from '../shared/authHelper';

interface DashboardProps {
    sidebar: SidebarState,
    active: string,
    children: any
}

class DashboardLayout extends React.Component<DashboardProps> {

    render() {
        return (
            <div className={`app-container ${this.getSidebarClassName()}`}>
              <Navbar/>
                <div className="app">
                    <Sidebar active={this.props.active} />
                    <main className="main">
                    <Breadcrumb />
                        <div className="container-fluid">
                            {this.props.children}   
                        </div>
                    </main>
                </div>
              <Footer/>
            </div>
        );
    }

    
    getSidebarClassName = () =>
    {   
        
        let sidebarClass =  this.props.sidebar["sidebar-active"] === true ? 'sidebar-active' : '';
        sidebarClass = sidebarClass.concat(this.props.sidebar["sidebar-active-sm"] === true ? ' sidebar-active-sm': '');
        return sidebarClass;
    }

}
const DashboardLayoutRoute = ({component: Component, sidebar, history, roles,  ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
        <AuthWrapper roles={roles} redirectUrl='/login' history={history}>
            <DashboardLayout sidebar={sidebar} active={history.location.pathname}>
                <Component {...matchProps} />
            </DashboardLayout>
        </AuthWrapper>
        
        )} />
    )
};


const mapStateToProps = (state: AppState) => {
    return {
        sidebar: state.sidebar
    };
  }
  
export default connect(mapStateToProps)(DashboardLayoutRoute);