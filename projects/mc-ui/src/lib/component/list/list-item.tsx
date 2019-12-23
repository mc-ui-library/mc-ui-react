import React from 'react';
import './list.scss';
import { Action } from '../model';
import { getEl } from '../../util/util';
import { ButtonDelete } from '../button/button-delete';

interface ListItemProps {
  theme?: string[]; // theme class
  data: any;
  idField: 'id';
  nameField: 'name';
  hasCheckBox: boolean;
  hasDeleteButton: boolean;
  selected: boolean;
  tpl?: (data: any) => void;
  onAction: (action: Action) => void;
}

export const ListItem = ({
  theme,
  data,
  idField,
  nameField,
  hasCheckBox,
  hasDeleteButton,
  selected,
  tpl,
  onAction,
}: ListItemProps) => {
  // init ref
  const elRef = React.useRef<HTMLDivElement>(null);

  // init className
  const cls = ['mc-list-item'];
  if (theme) {
    cls.push(...theme);
  }
  if (selected) {
    cls.push('selected');
  }

  // handle event
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const el = getEl<HTMLDivElement>(elRef);
    const selected = el.classList.contains('selected');
    let checkboxEl: HTMLInputElement | null = null;
    if (hasCheckBox) {
      const dom = el.querySelector('.list-item--checkbox');
      if (dom) {
        checkboxEl = dom as HTMLInputElement;
      }
    }
    if (selected) {
      el.classList.remove('selected');
      if (checkboxEl) {
        checkboxEl.checked = false;
      }
    } else {
      el.classList.add('selected');
      if (checkboxEl) {
        checkboxEl.checked = true;
      }
    }
    onAction({
      target: el,
      type: selected ? 'unselect' : 'select',
      value: data,
      event: e
    });
  }

  const handleButtonDeleteAction = (e: Action) => {
    onAction({
      target: getEl<HTMLDivElement>(elRef),
      type: 'delete',
      value: data,
      event: e
    });
  };

  // renderer
  const renderCheckbox = () => {
    if (hasCheckBox) {
      return (
        <div className="list-item--header"><input type="checkbox" className="list-item--checkbox" /></div>
      );
    }
    return '';
  };

  const renderContent = () => {
    if (tpl) {
      return tpl(data);
    }
    return data[nameField];
  };

  const renderDeleteButton = () => {
    if (hasDeleteButton) {
      return (<ButtonDelete onAction={handleButtonDeleteAction}></ButtonDelete>)
    }
    return '';
  };

  return (<div ref={elRef} className={cls.join(' ')} data-id={data[idField]} onClick={handleClick}>{renderCheckbox()}{renderContent()}{renderDeleteButton()}</div>);
};
