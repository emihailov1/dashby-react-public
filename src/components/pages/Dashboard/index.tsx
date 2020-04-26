import React from 'react';
import { SecuredContent } from '../../shared/authHelper';
import { Roles } from '../../shared/roles';
import { Link } from 'react-router-dom';
import { Animated } from "react-animated-css";
import { ANIMATION_CONTAINER_IN, ANIMATION_CONTAINER_OUT } from '../../shared/animationHelper';

class DashboardPage extends React.PureComponent {
    render() {
        return (
            <>
            <div className="row">
                <SecuredContent roles={[Roles.Admin]}>
                    <div className="col-lg-3 col-xs-6 col-md-6 col-sm-6 mb-4">
                        <Animated animationIn={ANIMATION_CONTAINER_IN} animationOut={ANIMATION_CONTAINER_OUT} isVisible={true}>
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="card-icon-wrapper">
                                        <Link to="/users" className="card-link">
                                            <i className="card-icon fa fa-users"></i>
                                            <div>Users</div>
                                        </Link>
                                        
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </div>
                </SecuredContent>
            </div>
            </>
        )
    }
}

export default DashboardPage;