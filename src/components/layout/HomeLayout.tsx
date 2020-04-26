
import React from 'react';
import { Route } from 'react-router-dom';

const HomeLayout: React.SFC = ({ children }) => (     
    <div className="app d-flex align-items-center">
        {children}  
    </div>                  
);  
  
const HomeLayoutRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
        <HomeLayout>
            <Component {...matchProps} />
        </HomeLayout>
        )} />
    )
};

export default HomeLayoutRoute;