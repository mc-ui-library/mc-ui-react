import React from 'react';
import './button-delete.scss';
import { Action } from '../model';
import { getEl } from '../../util/util';

interface ButtonDeleteProps {
  theme?: string[]; // theme class
  onAction: (action: Action) => void;
}

export const ButtonDelete = ({ theme, onAction }: ButtonDeleteProps) => {

  // init ref
  const elRef = React.useRef<HTMLDivElement>(null);

  // init className
  const cls = ['mc-button-delete'];
  if (theme) {
    cls.push(...theme);
  }

  // handle event
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const el = getEl<HTMLDivElement>(elRef);
    const targetEl = e.currentTarget;
    let actionType = '';
    const action = targetEl.dataset.action;
    let emitEvent = false;
    switch (action) {
      case 'do-delete':
        actionType = action;
        emitEvent = true;
        break;
      case 'cancel-delete':
        el.classList.remove('open-buttons');
        break;
      case 'open-buttons':
        el.classList.add('open-buttons');
        break;
    }
    if (emitEvent) {
      onAction({
        target: el,
        type: actionType,
        event: e
      });
    }
  }
  // TODO: Implement icon <mc-icon theme="trash"></mc-icon>
  return (
    <div className={cls.join(' ')} onClick={handleClick}>
      <div className="button-delete--yes-no">
        <div className="button-delete--yes-no--yes" data-action="do-delete"><span className="button-delete--yes-no--yes--text">Delete</span>
        </div>
        <div className="button-delete--yes-no--no" data-action="cancel-delete"><span
          className="button-delete--yes-no--no--text">Cancel</span></div>
      </div>
    </div>
  );
};