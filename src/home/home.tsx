import React from 'react';
import HomeLeftMenu from './home-left-menu';
import HomeHeader from './home-header';
import './home.scss';

type HomeProps = {};

type HomeState = {};

export default class Home extends React.Component<HomeProps, HomeState> {
    render() {
        return (
            <div className="mc-home">
                <HomeLeftMenu />
                <div className="mc-home--body">
                <HomeHeader />
                Dashboard Home!!
                </div>
            </div>
        );
    }
}
