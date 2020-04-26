import React from 'react';
import { WrappedFieldMetaProps } from 'redux-form';
import { Animated } from "react-animated-css";
import { showErrors } from '../shared/validationService';
import { ANIMATION_ERROR_IN, ANIMATION_ERROR_OUT } from '../shared/animationHelper';

interface InputProps {
    input:any;
    label: string,
    meta:WrappedFieldMetaProps;
    type:string;
    placeholder:string;
    className: string;
    readonly: boolean;
    hidden:boolean;
}

const Input: React.FunctionComponent<InputProps> = ({input, label, meta,type, placeholder, className, readonly, hidden}) => {

    const inputClassName = `${className} ${meta.error && meta.touched ? 'is-invalid': ''}`;
    const isErrorVisible = meta.error && meta.touched ? true : false;
    
    if(hidden) return <></>
    
       return (
        <div className="form-group">
            <label>{label}</label>
            <input {...input} className={inputClassName} id={input.name} readOnly={readonly} type={type} placeholder={placeholder} />
            <div className="invalid-feedback">
                <Animated animationIn={ANIMATION_ERROR_IN} animationOut={ANIMATION_ERROR_OUT} isVisible={isErrorVisible}>
                    {showErrors(meta.error)}
                </Animated>
            </div>
        </div>
        ); 
    
}

export default Input;