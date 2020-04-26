import React from 'react';
import {  Link } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

const Breadcrumb = ({ breadcrumbs }) => {
        const parentBreadcrumbs = breadcrumbs.slice(0,breadcrumbs.length-1);
        return (
            <ol className="breadcrumb">
                {parentBreadcrumbs.map(({ breadcrumb }) => {
                    return <li className="breadcrumb-item" key={breadcrumb.key}>
                                <Link to={breadcrumb.key} className="breadcrumb-item-brand">{breadcrumb}</Link>
                            </li>;
                })}
                <li className="breadcrumb-item active">{breadcrumbs[breadcrumbs.length-1].breadcrumb}</li>

                <li className="breadcrumb-menu d-md-down-none">
                    <div className="btn-group" role="group" aria-label="Button group">
                        <button className="btn">
                            <i className="icon-speech"></i>
                        </button>
                    </div>
                </li>
            </ol>

        );
}

  const routes = [
    { path: '/dashboard', breadcrumb: 'Dashboard' },
    { path: '/users/create', breadcrumb: 'Create User' },
    { path: '/users/:userId', breadcrumb: 'Edit user' },
    { path: '/users/:userId', breadcrumb: 'User' }
    
  ];
export default withBreadcrumbs(routes)(Breadcrumb);