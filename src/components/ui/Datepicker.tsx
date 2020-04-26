import React from 'react';
import { WrappedFieldMetaProps } from 'redux-form';
import { InputGroup } from 'reactstrap';
import { Animated } from "react-animated-css";
import { ANIMATION_ERROR_IN, ANIMATION_ERROR_OUT } from '../shared/animationHelper';
import "flatpickr/dist/themes/material_green.css";

import Flatpickr from "react-flatpickr";
import { showErrors } from '../shared/validationService';

interface DatepickerProps {
    input:any;
    label: string,
    meta:WrappedFieldMetaProps;
    type:string;
    placeholder:string;
    className: string;
    options:DropdownOption[];
    readonly: boolean;
    disabled: boolean;
    onChange:any;
}

export interface DropdownOption {
    key:string;
    value:string;
}

const ReactDatepicker: React.FunctionComponent<DatepickerProps> = ({input, label, meta,type, placeholder, className, options, readonly,disabled}) => {
    
    const inputClassName = `${className} ${meta.error && meta.touched ? 'is-invalid': ''}`;
    const formControlClassName = `input-group-wrapper form-control-datepicker  ${meta.error && meta.touched ? 'is-invalid': ''}`;
    const isErrorVisible = meta.error && meta.touched ? true : false;

       return (
        <div className="form-group">
            <label>{label}</label>
            <InputGroup className={formControlClassName}>
                <Flatpickr
                    className={inputClassName} 
                    id={input.name} 
                    onChange={input.onChange}
                />
            </InputGroup>
            <div className="invalid-feedback">
                <Animated animationIn={ANIMATION_ERROR_IN} animationOut={ANIMATION_ERROR_OUT} isVisible={isErrorVisible}>
                    {showErrors(meta.error)}
                </Animated>
            </div>
        </div>
        ); 
    
}

export default ReactDatepicker;