import React from 'react';
import './field.scss';
import './field.theme.scss';
import { Input } from '..';

type Props = typeof Field.defaultProps & {
    placeholder?: string;
    name: string;
    onChange?: Function;
    prefix?: Function;
    suffix?: Function;
    theme?: string[];
};

type State = {
    value: any
}

export default class Field extends React.Component < Props, State > {

    static defaultProps = {
        type: 'text',
        hasLabel: false
    };

    constructor(props : Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any) {}

    getFix(type: string) {
        let fix = type === 'prefix' ? this.props.prefix ? this.props.prefix() : '' : this.props.suffix ? this.props.suffix() : '';
        if (fix) {
            return <div className={'mc-field--' + type}>{fix}</div>;
        }
        return '';
    }

    getInput() {
        const theme = [];
        if (this.props.theme) {
            theme.push(...this.props.theme);
        }
        switch(this.props.type) {
            default:
                return <Input type={this.props.type} name={this.props.name} placeholder={this.props.placeholder || this.props.name} theme={theme} onChange={this.handleChange}></Input>
        }
    }

    getLabel() {
        if (this.props.hasLabel) {
            return <div className="mc-field--label">
                <label id={this.props.name}>{this.props.placeholder}</label>
            </div>;
        }
        return '';
    }

    render() {
        const classNames = ['mc-field'];
        if (this.props.theme) {
            classNames.push(...this.props.theme);
        }
        const prefix = this.getFix('prefix');
        const suffix = this.getFix('suffix');
        if (prefix) {
            classNames.push('has-prefix');
        }
        if (suffix) {
            classNames.push('has-suffix');
        }
        return (
            <div className={classNames.join(' ')}>
                {prefix}
                {this.getLabel()}
                {this.getInput()}
                {suffix}
            </div>
        );
    }
}
