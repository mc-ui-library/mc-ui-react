import React from 'react';
import './button.scss';
import './button.theme.scss';
import {ButtonProps} from '../model';

export default class Button extends React.Component < ButtonProps > {
    constructor(props : ButtonProps) {
        super(props);
        this.handleClick = this
            .handleClick
            .bind(this);
    }

    handleClick(e : React.MouseEvent < HTMLButtonElement >) {
        this
            .props
            .onClick(e);
    }

    render() {
        const classNames = ["mc-button"];
        if (this.props.theme) {
            classNames.push(...this.props.theme);
        }
        return (
            <button className={classNames.join(" ")} onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }
}
