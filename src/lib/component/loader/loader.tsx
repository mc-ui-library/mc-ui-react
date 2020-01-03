import React from 'react';
import './loader.scss';
import { addThemeCls } from '../../util/util';

export interface LoaderProps {
  theme: string[]; // theme class
};

export const Loader = ({
  theme
}: LoaderProps) => {
  // ***** init className and style *****
  const cls = ['mc-loader'];
  addThemeCls(cls, theme);
  // ***** render *****
  const renderLoader = () => {
    const type = theme[0];
    switch (type) {
      case 'spin':
        return (
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>);
      default:
        return (
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>);
    }
  };
  return (
    <div className={cls.join(' ')}>{renderLoader}</div>
  );
};

Loader.defaultProps = {
  theme: ['ring']
};
