import React from 'react';
import './SelectOption.css';

export default function SelectOption(props) {
    return (
        <div className="select-container">
            <label>{props.labelValue}</label>
            <select name={props.selectName} onChange={props.handleValue}>
                {props.children}
            </select>
        </div>
    )
}