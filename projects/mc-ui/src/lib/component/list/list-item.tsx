import React from 'react';
import './list-item.scss';
import { Action } from '../model';
import { getEl } from '../../util/util';
import { ButtonDelete } from '../button/button-delete';

interface ListItemProps {
  theme?: string[]; // theme class
  height: string;
  lineHeight: string;
  data: any;
  idField: string;
  nameField: string;
  hasCheckBox: boolean;
  hasDeleteButton: boolean;
  selected: boolean;
  horizontal: boolean;
  isScrollPageItem: boolean;
  isFirstPageItem: boolean;
  isLastPageItem: boolean;
  tpl: (data: any) => void;
  onAction: (action: Action) => void;
}

export const ListItem = ({
  theme,
  data,
  height,
  lineHeight,
  idField,
  nameField,
  hasCheckBox,
  hasDeleteButton,
  selected,
  horizontal,
  isScrollPageItem,
  isLastPageItem,
  isFirstPageItem,
  tpl,
  onAction,
}: ListItemProps) => {
  // ***** init ref and hooks *****
  const elRef = React.useRef<HTMLDivElement>(null);

  // ***** init className and style *****
  const cls: string[] = ['mc-list-item'];
  if (selected) {
    cls.push('selected');
  }
  if (horizontal) {
    cls.push('horizontal');
  }
  if (isScrollPageItem) {
    cls.push('is-scroll-page-item');
  }
  if (isFirstPageItem) {
    cls.push('is-first-page-item');
  }
  if (isLastPageItem) {
    cls.push('is-last-page-item');
  }
  // last should be theme class, since it can override the style.
  if (theme) {
    cls.push(...theme);
  }

  const style: any = {
    height: height,
    lineHeight: lineHeight 
  };

  // ***** handle event *****
  /**
   In this case, we just change the class by dom.classList. because if it is changed by the parent component with props, the parent needs to update its state and search the child component for update it and update the props for a child. and the child needs to be updated. It needs few Oxn search and rerender a child. It is inefficient and it is not good for the performance.
   * @param e 
   */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const el = getEl<HTMLDivElement>(elRef);
    const selected = el.classList.contains('selected');
    if (selected) {
      el.classList.remove('selected');
    } else {
      el.classList.add('selected');
    }
    onAction({
      type: selected ? 'unselect' : 'select',
      value: data
    });
  }

  const handleButtonDeleteAction = () => {
    onAction({
      type: 'delete',
      value: data
    });
  };

  // ***** render *****
  const renderCheckbox = () => {
    if (hasCheckBox) {
      return (
        <div className="list-item--header"><input type="checkbox" className="list-item--checkbox" checked={selected} /></div>
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
      return (<ButtonDelete onAction={handleButtonDeleteAction}></ButtonDelete>);
    }
    return '';
  };

  return (<div ref={elRef} className={cls.join(' ')} style={style} data-id={data[idField]} onClick={handleClick}>{renderCheckbox()}{renderContent()}{renderDeleteButton()}</div>);
};

// ***** default props *****
ListItem.defaultProps = {
  idField: 'id',
  nameField: 'name',
  height: '45px',
  lineHeight: '43px'
};