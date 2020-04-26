import React from 'react';
import { Type } from './type';
import { Alert as AlertReactStrap } from 'reactstrap';

interface AlertProps {
    message: string,
    type: Type
}

const Alert: React.FunctionComponent<AlertProps> = ({message, type}) => {
    if(message)
    {
       return (
        <AlertReactStrap color={type} className="mt-3">
            {message}
        </AlertReactStrap>
        ); 
    } else {
        return <></>
    }
    
}

export default Alert;