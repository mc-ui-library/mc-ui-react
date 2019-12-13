import React from 'react';
import './home-header.scss';
import {Field, Icon} from '../../shared';

type Props = {};

type State = {};

export default class HomeHeader extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any) {}

    render() {
        return (
            <div className="mc-home-header">
                <Field name="search" placeholder="Search..." theme={['home-header']} onChange={this.handleChange} prefix={() => <Icon icon="search" theme={['field', 'home-header']} />} />
            </div>
        );
    }
}
