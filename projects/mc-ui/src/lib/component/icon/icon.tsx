import React from 'react';
import './icon.scss';
import './icon.theme.scss';

type IconProps = {
    icon: string;
    theme?: string[];
};

export default class Icon extends React.Component<IconProps> {
    render() {
        const classNames = ['mc-icon', 'mc-icon-' + this.props.icon];
        if (this.props.theme) {
            classNames.push(...this.props.theme);
        }
        return (
            <div className={classNames.join(' ')}></div>
        );
    }
}
