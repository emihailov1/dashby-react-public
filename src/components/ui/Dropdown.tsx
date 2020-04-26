import React from 'react';
import { WrappedFieldMetaProps } from 'redux-form';
import { Input} from 'reactstrap';
import { Animated } from "react-animated-css";
import { ANIMATION_ERROR_IN, ANIMATION_ERROR_OUT } from '../shared/animationHelper';
import { showErrors } from '../shared/validationService';

interface DropdownProps {
    input:any;
    label: string,
    meta:WrappedFieldMetaProps;
    type:string;
    placeholder:string;
    className: string;
    options:string[];
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({input, label, meta,type, placeholder, className, options}) => {

    const inputClassName = `${className} ${meta.error && meta.touched ? 'is-invalid': ''}`;
    const isErrorVisible = meta.error && meta.touched ? true : false;
    
       return (
        <div className="form-group">
            <label>{label}</label>
            <Input {...input} className={inputClassName} id={input.name} type={type} placeholder={placeholder}>
                {options.map((o, key) => {
                    return <option key={key} value={o}>{o}</option>;
                })}
            </Input>
            <div className="invalid-feedback">
                <Animated animationIn={ANIMATION_ERROR_IN} animationOut={ANIMATION_ERROR_OUT} isVisible={isErrorVisible}>
                    {showErrors(meta.error)}
                </Animated>
                </div>
        </div>
        ); 
    
}

export default Dropdown;