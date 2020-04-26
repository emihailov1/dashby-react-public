import React, { useEffect } from 'react';
import { RouteComponentProps,withRouter } from "react-router-dom";
import { Field, reduxForm, InjectedFormProps, SubmissionError } from 'redux-form';
import { Button} from 'reactstrap';
import { Animated } from "react-animated-css";
import { ANIMATION_CONTAINER_IN, ANIMATION_CONTAINER_OUT } from '../../shared/animationHelper';
import {NotificationManager} from 'react-notifications';
import { Input, Dropdown } from '../../ui';
import restService from '../../shared/restService';
import { UserData } from './UserData';
import { Roles } from '../../shared/roles';

type TParams = { id: string };

const UserPage : React.FunctionComponent<InjectedFormProps<UserData> & RouteComponentProps<TParams>> = (props) => {

    const { id } = props.match.params;
    const { initialize } = props;

    useEffect(() => {
        
        const fetchUser = async () => {
            try {
                const result = await restService.get(`/api/users/${id}`);
                initialize(result.data);
            }catch(error) {
                NotificationManager.error('Not Able to load user data', 'Error!');
            };
            
            
          };
          fetchUser();

    }, [initialize,id]);

    const onSubmit = async (formValues: UserData) => {
        const model = {
            "email":formValues.email,
            "firstName":formValues.firstName,
            "lastName":formValues.lastName,
            "Role":formValues.role,
            "Status":"Active"
            };
            
            const { status } =  await restService.put(`/api/users/${id}`,model).catch( (e) => {
                const errors = e.response.data;
                NotificationManager.error('There are some Errors', 'Error!');
                throw new SubmissionError(errors);
            });
            if(status === 204) {
                NotificationManager.success('User has been updated', 'Success');
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

export default reduxForm<UserData>({
    form: 'userEdit',
    enableReinitialize: true,
    keepDirtyOnReinitialize:true
})(withRouter(UserPage));