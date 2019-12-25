import React, { useState, useEffect } from 'react';
import './list-basic.scss';
import { Action } from '../model';
import { ListItem } from './list-item';

export interface ListBasicProps {
  theme?: string[]; // theme class
  data: any | any[];
  idField: string;
  nameField: string;
  rowHeight: number;
  multiSelect: boolean;
  selectedItems: any[];
  hasDelete: boolean;
  isLastPage: boolean;
  isFirstPage: boolean;
  isScrollPage: boolean;
  horizontal: boolean;
  horizontalLineHeight: string;
  itemTpl: (data: any) => void;
  onAction: (action: Action) => void;
};

export const ListBasic = ({
  theme,
  data,
  idField,
  nameField,
  rowHeight,
  multiSelect,
  selectedItems,
  hasDelete,
  isLastPage,
  isFirstPage,
  isScrollPage,
  horizontal,
  horizontalLineHeight,
  itemTpl,
  onAction,
}: ListBasicProps) => {
  // ***** init and hooks *****
  const [items, setItems] = useState(data);
  let rendered = false;
  // useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined
  useEffect(() => {
    if (!rendered) {
      rendered = true;
      // for sending the first select event.
      if (selectedItems.length) {
        if (onAction) {
          onAction({
            type: 'select',
            value: selectedItems[0],
            values: selectedItems
          });
        }
      }
    }
    return () => {
      // useEffect return a function that is the same as the ngDestroy method (clean up).
    };
  });

  // ***** init data *****
  // data may not be an array.
  if (!Array.isArray(data)) {
    data = [data];
  }
  // data may be a string array
  if (typeof data[0] === 'string') {
    data = data.map((d: string, idx: number) => {
      return { id: idx, name: d };
    });
  }
  // create a map for quick searching a selected item
  const selectedItemsMap = new Map();
  selectedItems.forEach((item: any) => selectedItemsMap.set('' + item[idField], item));

  const getSelectedItems = () => {
    const items: any[] = [];
    selectedItemsMap.forEach(value => items.push(value));
    return items;
  }

  // ***** handle event *****
  const handleListItemAction = (e: Action) => {
    switch (e.type) {
      case 'select':
        selectedItemsMap.set(e.value[idField] + '', e.value);
        break;
      case 'unselect':
        selectedItemsMap.delete(e.value[idField] + '');
        break;
      case 'delete':
        selectedItemsMap.delete(e.value[idField] + '');
        const id = e.value[idField];
        // rerender
        setItems(items.filter((item: any) => item[idField] !== id));
        break;
    }
    if (onAction) {
      onAction({
        type: e.type,
        value: e.value,
        values: getSelectedItems()
      });
    }
  };

  // ***** init className and style *****
  const cls = ['mc-list-basic'];
  if (theme) {
    cls.push(...theme);
  }
  if (isScrollPage) {
    cls.push('is-scroll-page');
  }
  if (horizontal) {
    cls.push('horizontal');
  }

  // ***** render *****
  const renderItems = () => data.map((item: any) => <ListItem key={item[idField]} data={item} height={horizontal ? '100%' : rowHeight + 'px'} lineHeight={horizontal ? horizontalLineHeight : (rowHeight - 2) + 'px'} tpl={itemTpl} idField={idField} nameField={nameField} hasCheckBox={multiSelect} hasDeleteButton={hasDelete} selected={selectedItemsMap.has('' + item[idField])} horizontal={horizontal} isScrollPageItem={isScrollPage} isFirstPageItem={isFirstPage} isLastPageItem={isLastPage} theme={item.theme} onAction={handleListItemAction} />);

  return (
    <div className={cls.join(' ')}>{renderItems()}</div>
  );
};

ListBasic.defaultProps = {
  idField: 'id',
  nameField: 'name',
  rowHeight: 45,
  data: [],
  multiSelect: false,
  selectedItems: [],
  hasDelete: false,
  isLastPage: false,
  isFirstPage: false,
  isScrollPage: false,
  horizontal: false,
  horizontalLineHeight: '43px',
  itemTpl: null,
  onAction: null
};
