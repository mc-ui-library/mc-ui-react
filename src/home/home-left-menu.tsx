import React from 'react';
import './home-left-menu.scss';
import {Icon, Button} from '../../shared';

type HomeLeftProps = {};

type HomeLeftState = {};

export default class HomeLeftMenu extends React.Component < HomeLeftProps,
HomeLeftState > {

    constructor(props : HomeLeftProps) {
        super(props);
        this.handleMenuButtonClick = this
            .handleMenuButtonClick
            .bind(this);
    }

    handleMenuButtonClick() {
        console.log('click menu icon!');
    }

    render() {
        return (
            <aside className="mc-home-left-menu">
                <div className="mc-home-left-menu--header">
                    <a href="/" className="mc-home-left-menu--header--logo"><span className="mc-home-left-menu--header--logo mc-home-left-menu--header--logo--1">okay</span><span  className="mc-home-left-menu--header--logo--2">board</span></a>
                    <div className="mc-home-left-menu--header--right">
                        <Button theme={['mc-button-icon']} onClick={this.handleMenuButtonClick}>
                            <Icon icon="menu" theme={['button', 'home-left-menu']}></Icon>
                        </Button>
                    </div>
                </div>
                <div className="mc-home-left-menu--body"></div>
            </aside>
        );
    }
}
