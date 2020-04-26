import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Alert, Type } from '../../ui';

export interface LoginFormData {
    username: string;
    password: string;
}

export interface LoginFormProps {
    errorMessage: string;
}

const LoginForm : React.FunctionComponent<InjectedFormProps<LoginFormData> & LoginFormProps> = (props) => {

    const { pristine, submitting, handleSubmit, errorMessage } = props;

        return (
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <p className="text-muted">Sign In to your account</p>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-user"></i>
                        </span>
                    </div>
                    <Field
                        name="username"
                        type="text"
                        component="input"
                        autoComplete="none"
                        className="form-control"
                        placeholder="Username"
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-lock"></i>
                        </span>
                    </div>
                    <Field
                        name="password"
                        type="password"
                        component="input"
                        autoComplete="none"
                        className="form-control"
                        placeholder="Password"
                    />
                </div>

                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-primary px-4" type="submit" disabled={pristine || submitting}>Login</button>
                    </div>
                </div>
                <Alert message={errorMessage} type={Type.Danger} />
        </form>
        );
}

const mapStateToProps = (state: AppState) => ({
    errorMessage: state.auth.errorMessage
});
const loginFormWrapped = connect(mapStateToProps, {})(LoginForm);

export default reduxForm<LoginFormData>({
    form: 'loginForm',
  })(loginFormWrapped);