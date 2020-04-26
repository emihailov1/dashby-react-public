import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { History } from 'history';
import LoginForm, { LoginFormData } from './LoginForm';
import { logIn } from '../../../store/auth/actions';

interface LoginProps {
    logIn: typeof logIn
    children: any,
    history: History
}

class LoginPage extends React.Component<LoginProps> {
    
    onSubmit = (formProps: LoginFormData) => {
        this.props.logIn(formProps, () => {
            this.props.history.push('/');
        });
    };

    render() {

        return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4">
                        <div className="card-body">
                            <LoginForm onSubmit={this.onSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = () => {
    return {
        logIn: logIn
    };
  }

export default compose(
    connect(mapStateToProps,{logIn})
)(LoginPage);