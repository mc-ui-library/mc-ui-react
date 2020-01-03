import React, { useState, useEffect } from 'react';
import './list-basic.scss';
import { Action, ScrollData } from '../model';
import { addThemeCls, getEl } from '../../util/util';
import { Scroll } from '../scroll/scroll';
import { ListBasic } from './list-basic';

export interface ListProps {
  theme?: string[]; // theme class
  data: any | ScrollData;
  idField: string;
  nameField: string;
  rowHeight: number;
  multiSelect: boolean;
  selectedItems: any[];
  hasDelete: boolean;
  emptyText: string;
  itemTpl: (data: any) => void;
  onAction: (action: Action) => void;
};

// TODO: scroll async logic needs to be re-used for Grid component also.
export const List = ({
  theme,
  data,
  idField,
  nameField,
  rowHeight,
  multiSelect,
  selectedItems,
  hasDelete,
  emptyText,

  itemTpl,
  onAction,
}: ListProps) => {

  let page1Data: any[] = [];
  let page2Data: any[] = [];
  let page1IsFirst = false;
  let page1IsLast = false;
  let page2IsFirst = false;
  let page2IsLast = false;
  let rowCount = 0;
  let isLoading = true;
  let originHeight = 0;
  let neededPageIndex = 1;
  let neededDataIndex = -1;
  let height = 0;

  let page1Indexes = {
    start: -1,
    end: -1
  };
  let page2Indexes = {
    start: -1,
    end: -1
  };

  // ***** init and hooks *****
  const elRef = React.useRef<HTMLDivElement>(null);

  const [state, setState] = useState({ height, isLoading, page1Data, page2Data });
  let rendered = false;
  useEffect(() => {
    if (!rendered) {
      rendered = true;
      updateHeight();
    }
  });

  const updateState = () => setState({ height: 0, isLoading, page1Data, page2Data });

  // ***** init data *****

  const updateData = (indexes: any, pageIndex: number) => {
    const start = indexes.start;
    const end = indexes.end;
    if (rowCount && !data.rows[start]) {
      neededPageIndex = pageIndex;
      // skip the same request.
      if (neededDataIndex !== start) {
        isLoading = true;
        neededDataIndex = start;
        onAction({
          index: neededDataIndex,
          type: 'append'
        });
      }
    } else {
      const pageData = data.rows.slice(start, end + 1);
      if (pageIndex === 1) {
        page1Data = pageData;
      } else {
        page2Data = pageData;
      }
    }
  }

  if (Array.isArray(data)) {
    data = {
      action: 'initialize',
      rows: data,
      start: 0,
      rowCount: data.length
    };
  }
  if (!data.columns) {
    data.columns = data.rows[0] ? Object.keys(data.rows[0]).map(key => {
      return {
        field: key
      };
    }) : null;
  }
  rowCount = data.rowCount;

  data.action = data.action ? data.action : 'initialize';

  isLoading = false;
  if (data.action === 'initialize') {
    // init page
    page1Indexes = { start: -1, end: -1 };
    page2Indexes = { start: -1, end: -1 };
  } else {
    updateData(neededPageIndex === 1 ? page1Indexes : page2Indexes, neededPageIndex);
  }

  // ***** handle event *****
  const onUpdatePage = (e: any) => {
    if (e.page1StartIndex < 0) {
      page1Indexes.start = e.page1StartIndex;
      page1Indexes.end = e.page1EndIndex;
      page1Data = [];
    } else {
      if (page1Indexes.start !== e.page1StartIndex || page1Indexes.end !== e.page1EndIndex) {
        page1Indexes.start = e.page1StartIndex;
        page1Indexes.end = e.page1EndIndex;
        updateData(page1Indexes, 1);
      }
    }
    if (e.page2StartIndex < 0) {
      page2Indexes.start = e.page2StartIndex;
      page2Indexes.end = e.page2EndIndex;
      page2Data = [];
    } else {
      if (page2Indexes.start !== e.page2StartIndex || page2Indexes.end !== e.page2EndIndex) {
        page2Indexes.start = e.page2StartIndex;
        page2Indexes.end = e.page2EndIndex;
        updateData(page2Indexes, 2);
      }
    }
    page1IsLast = e.page1IsLast;
    page2IsLast = e.page2IsLast;
    page1IsFirst = e.page1IsFirst;
    page2IsFirst = e.page2IsFirst;

    updateState();
  };
  const handleAction = (e: Action) => {
    onAction(e);
  };

  // ***** init className and style *****
  const cls = ['mc-list'];

  addThemeCls(cls, theme);

  const updateHeight = () => {
    const el = getEl<HTMLDivElement>(elRef);
    // when the items height are smaller than container height.
    height = rowCount === 0 ? rowHeight : rowHeight * rowCount;
    if (!originHeight) {
      originHeight = el.clientHeight;
    }
    updateState();
  }
  // ***** render *****

  const renderPage1 = () => (
    <ListBasic itemTpl={itemTpl} idField={idField} nameField={nameField} rowHeight={rowHeight} data={page1Data} multiSelect={multiSelect} selectedItems={selectedItems} hasDelete={hasDelete} isScrollPage={true} isFirstPage={page1IsFirst} isLastPage={page1IsLast} onAction={handleAction} />
  );

  const renderPage2 = () => (
    <ListBasic itemTpl={itemTpl} idField={idField} nameField={nameField} rowHeight={rowHeight} data={page2Data} multiSelect={multiSelect} selectedItems={selectedItems} hasDelete={hasDelete} isScrollPage={true} isFirstPage={page2IsFirst} isLastPage={page2IsLast} onAction={handleAction} />
  );

  return (
    <div className={cls.join(' ')} style={{ height: state.height + 'px' }}>
      <Scroll page1Tpl={renderPage1} page2Tpl={renderPage2} rowHeight={rowHeight} emptyText={emptyText} rowCount={rowCount} isLoading={isLoading} onUpdatePage={onUpdatePage} />
    </div>
  );
};

List.defaultProps = {
  idField: 'id',
  nameField: 'name',
  rowHeight: 45,
  data: [],
  multiSelect: false,
  selectedItems: [],
  hasDelete: false,
  emptyText: 'No Data',
  itemTpl: null,
  onAction: null
};
