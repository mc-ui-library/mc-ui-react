import React, { useState, useEffect } from 'react';
import './list-basic.scss';
import { addThemeCls, getEl } from '../../util/util';
import { Loader } from '../loader/loader';

export interface ScrollProps {
  theme?: string[]; // theme class
  emptyText: string;
  rowHeight: number;
  rowCount: number;
  isLoading: boolean;
  page1Tpl: any;
  page2Tpl: any;
  onUpdatePage: (data: any) => void;
};

export const Scroll = ({
  theme,
  emptyText,
  rowHeight,
  rowCount,
  isLoading,
  page1Tpl,
  page2Tpl,
  onUpdatePage
}: ScrollProps) => {
  // private
  let scrollTop: number = 0;
  let oldScrollTop = -1;
  let page1Index = -2;
  let page2Index = -1;
  let ticking = false;
  // ***** init and hooks *****
  const elRef = React.useRef<HTMLDivElement>(null);

  const [state, setState] = useState({
    contentHeight: 0,
    page1Top: 0,
    page2Top: -1,
    page1StartIndex: -1,
    page1EndIndex: -1,
    page2StartIndex: -1,
    page2EndIndex: -1
  });
  useEffect(() => {
    // update size
    updateState();
  });

  const updateState = (refresh = false) => {
    const el = getEl<HTMLDivElement>(elRef);
    const isDown = oldScrollTop < scrollTop;
    const containerHeight = el.clientHeight;
    const pageRowCount = Math.round((containerHeight / rowHeight) * 1.5);
    const pageHeight = pageRowCount * rowHeight;
    const contentHeight = rowCount === 0 ? rowHeight : rowHeight * rowCount;
    const pageLastIndex = Math.floor((contentHeight - 1) / pageHeight); // -1 for if it is the same as with the pageHeight, the page can be +1.
    const nextPageIndex = isDown ? Math.ceil(scrollTop / pageHeight) : Math.floor(scrollTop / pageHeight);
    // console.log(nextPageIndex, pageLastIndex, page1Index, page2Index);
    if (refresh || (nextPageIndex <= pageLastIndex && page1Index !== nextPageIndex && page2Index !== nextPageIndex)) {
      // It may not have two pages at all. keep the full logic for readability.
      if (page1Index === -2) {
        // init
        page1Index = 0;
        page2Index = 1;
      } else if (page1Index < page2Index) {
        // asc and down, move page1 to the bottom of page2 and load the next page
        // asc and up, move page2 to the top of page1 and load the next page into page2
        page1Index = isDown ? nextPageIndex : nextPageIndex + 1;
        page2Index = page1Index - 1;
      } else {
        // desc and down / up, reverse upper logic.
        page1Index = isDown ? nextPageIndex - 1 : nextPageIndex;
        page2Index = page1Index + 1;
      }

      let page1StartIndex = page1Index * pageRowCount;
      let page2StartIndex = page2Index * pageRowCount;
      let page1EndIndex = page1StartIndex + pageRowCount - 1;
      let page2EndIndex = page2StartIndex + pageRowCount - 1;

      if (page1StartIndex >= rowCount) {
        page1StartIndex = -1;
        page1EndIndex = -1;
        page1Index = -2;
      } else if (page1EndIndex >= rowCount) {
        page1EndIndex = rowCount - 1;
      }

      if (page2StartIndex >= rowCount) {
        page2StartIndex = -1;
        page2EndIndex = -1;
        page2Index = -1;
      } else if (page2EndIndex >= rowCount) {
        page2EndIndex = rowCount - 1;
      }

      const page1Top = page1StartIndex * rowHeight;
      const page2Top = page2StartIndex * rowHeight;
      page1Index = page1Index;
      page2Index = page2Index;
      // It may not have two pages.
      setState({
        contentHeight,
        page1Top,
        page2Top,
        page1StartIndex,
        page1EndIndex,
        page2StartIndex,
        page2EndIndex
      });
      // console.log(state, page1Index, page2Index);
      onUpdatePage({
        page1StartIndex,
        page1EndIndex,
        page2StartIndex,
        page2EndIndex,
        page1Index,
        page2Index,
        rowCount,
        pageLastIndex,
        page1IsFirst: page1Index === 0,
        page2IsFirst: page2Index === 0,
        page1IsLast: page1Index !== -1 && page1Index === pageLastIndex,
        page2IsLast: page2Index !== -1 && page2Index === pageLastIndex,
        refresh
      });
    }
    oldScrollTop = scrollTop;
  }

  // ***** init data *****

  // ***** handle event *****
  const onScroll = (e: any) => {
    scrollTop = e.target.scrollTop;
    if (!ticking) {
      requestAnimationFrame(() => {
        // for direction: up / down
        updateState();
        ticking = false;
      });
      ticking = true;
    }
  }
  // ***** init className and style *****
  const cls = ['mc-scroll'];
  addThemeCls(cls, theme);
  // ***** render *****
  const renderEmptyText = () => {
    return !rowCount ? (<div className="scroll--empty" style={{lineHeight: rowHeight + 'px'}}>{emptyText}</div>) : '';
  }
  const renderLoader = () => {
    return isLoading ? <Loader theme={['ring', 'small']} /> : '';
  };
  return (
    <div className={cls.join(' ')}>
      <div className="scroll" onScroll={onScroll}>
        <div className="scroll--content" style={{height: state.contentHeight + 'px'}}>
          <div className="scroll--content--page1" style={{top: state.page1Top + 'px'}}>
            {page1Tpl(state)}
          </div>
          <div className="scroll--content--page2" style={{top: state.page2Top}}>
            {page2Tpl(state)}
          </div>
        </div>
      </div>
      {renderEmptyText()}{renderLoader()}
    </div>
  );
};

Scroll.defaultProps = {
  emptyText: 'No Data',
  rowHeight: 45,
  rowCount: 0,
  isLoading: false
};
