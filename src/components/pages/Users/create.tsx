import React from 'react';
import { Field, reduxForm, InjectedFormProps, SubmissionError } from 'redux-form';
import { Button} from 'reactstrap';
import {NotificationManager} from 'react-notifications';
import { Animated } from "react-animated-css";
import { ANIMATION_CONTAINER_IN, ANIMATION_CONTAINER_OUT } from '../../shared/animationHelper';
import { Input,Dropdown } from '../../ui';
import restService from '../../shared/restService';
import { UserData } from './UserData';
import { Roles } from '../../shared/roles';



export interface UserCreateFormData extends UserData {
    password: string;
    passwordRepeat: string;
}

const UserCreatePage : React.FunctionComponent<InjectedFormProps<UserCreateFormData>> = (props) => {

    const onSubmit = async (formValues: UserCreateFormData) => {
        const model = {
            "email":formValues.email,
            "firstName":formValues.firstName,
            "lastName":formValues.lastName,
            "Password":formValues.password,
            "PasswordRepeat":formValues.passwordRepeat,
            "Role":formValues.role,
            "Status":"Active"
            };
            const {status } =  await restService.post('/api/users',model).catch( (e) => {
                const errors = e.response.data;
                NotificationManager.error('There are some Errors', 'Error!');
                throw new SubmissionError(errors);
            });
            if(status === 201 ) {
                props.reset();
                NotificationManager.success('User has been created', 'Success');
            }
    }

        return (
            <div className="row">
                <div className="col-md-6">
                    <Animated animationIn={ANIMATION_CONTAINER_IN} animationOut={ANIMATION_CONTAINER_OUT} isVisible={true}>
                        <form onSubmit={props.handleSubmit(onSubmit)} className="form-horizontal error">
                            <Field 
                                name="firstName"
                                type="text"
                                component={Input}
                                autoComplete="none"
                                className="form-control"
                                placeholder="Enter Firstname"
                                label="Firstname"
                            />
                            <Field 
                                name="lastName"
                                type="text"
                                component={Input}
                                autoComplete="none"
                                className="form-control"
                                placeholder="Enter Lastname"
                                label="Lastname"
                            />
                            <Field 
                                name="email"
                                type="text"
                                component={Input}
                                autoComplete="none"
                                className="form-control"
                                placeholder="Enter Email"
                                label="Email"
                            />
                            <Field 
                                name="password"
                                type="password"
                                component={Input}
                                autoComplete="none"
                                className="form-control"
                                placeholder="Enter Password"
                                label="Password"
                            />
                            <Field 
                                name="passwordRepeat"
                                type="password"
                                component={Input}
                                autoComplete="none"
                                className="form-control"
                                placeholder="Repeat Password"
                                label="Repeat Password"
                            />
                            <Field 
                                name="role"
                                type="select"
                                component={Dropdown}
                                autoComplete="none"
                                className="form-control"
                                placeholder="Choose Role"
                                label="Role"
                                options={[Roles.User,Roles.Admin]}
                            />
                            <Button>Submit</Button>
                        </form>
                    </Animated>
                </div>
            </div>
        )
}

export default reduxForm<UserCreateFormData>({
    form: 'userCreate'
})(UserCreatePage);