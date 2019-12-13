import React from 'react';
import './input.scss';
import './input.theme.scss';

type Props = typeof Input.defaultProps & {
    name: string,
    onChange: Function;
    placeholder?: string;
    theme?: string[];
};

type State = {
    value: string
}

export default class Input extends React.Component<Props, State> {

    static defaultProps = {
        type: 'text',
        value: ''
    };

    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: this.props.value
        };
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const oldValue = this.state.value;
        this.setState({ value: e.target.value });
        this.props.onChange({ event: e, oldValue: oldValue, value: this.state.value});
    }

    render() {
        const classNames = ['mc-input'];
        if (this.props.theme) {
            classNames.push(...this.props.theme);
        }
        return (
            <input className={classNames.join(' ')} id={this.props.name} name={this.props.name} type={this.props.type} placeholder={this.props.placeholder || this.props.name} onChange={this.handleChange} value={this.state.value} />
        );
    }
}
