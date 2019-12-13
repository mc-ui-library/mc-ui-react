import React from 'react';
import './list.scss';
import './list.theme.scss';
import { Util } from '../..';

type AdditionalDataInfo = {
    action: 'append' | 'insert';
    data: Object[];
    startIndex: number;
};

type Props = typeof List.defaultProps & {
    // When finding the data of an index and there is no data row, we need to get the data.
    onRequestData?: Function;
    additionalDataInfo?: AdditionalDataInfo; 
};

type State = {
    pageRowCount: number;
    page1Index: number;
    page2Index: number;
    pageHeight: number;
    neededRowIndex: number;
    selectedItems: Object[];
    contentHeight: number;
    containerHeight: number;
    pageLastIndex: number;
    data: Object[];
};

export default class List extends React.Component<Props, State> {

    private elRef = React.createRef<HTMLDivElement>();
    private scrollTop = 0;
    private oldScrollTop = 0;
    private neddedDataIndex = -1;
    private updatePageDebounced: Function;
    private lastPage1Index = -1;
    private lastPage2Index = -1;

    static defaultProps = {
        data: [],
        rowCount: 0,
        idField: 'id',
        nameField: 'name',
        itemHeight: 30,
        itemRender: (name: string, row: Object) => name
    };

    static getDerivedStateFromProps(props: Props, state: State) {
        if (props.additionalDataInfo) {
            const {action, data, startIndex} = props.additionalDataInfo;
            const prevData = state.data.concat();
            if (action === 'append') {
                data.forEach((d, i) => prevData[i + startIndex] = d);
                return { data: prevData };
            }
            if (action === 'insert') {
                const firstData = data.slice(0, startIndex);
                const secondData = data.slice(startIndex);
                return { data: firstData.concat(data).concat(secondData) };
            }
        }
        return null;
    }

    constructor(props : Props) {
        super(props);
        const minHeight = this.props.itemHeight;
        this.state = {
            data: this.props.data,
            containerHeight: minHeight,
            pageRowCount: 0,
            page1Index: 0,
            page2Index: -1,
            pageHeight: minHeight,
            neededRowIndex: -1,
            selectedItems: [],
            contentHeight: minHeight,
            pageLastIndex: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.updatePageDebounced = Util.debounce(this.updatePage, 300);
    }

    componentDidMount() {
        //calculate size
        this.calcSize();
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.data !== this.state.data) {
            this.setState({ page1Index: this.lastPage1Index, page2Index: this.lastPage2Index });
        }
    }

    calcSize() {
        const itemHeight = this.props.itemHeight;
        const rowCount = this.props.rowCount;
        const containerHeight = this.elRef.current ? this.elRef.current.clientHeight : itemHeight; // minimum is itemHeight
        const pageRowCount = Math.round((containerHeight / itemHeight) * 1.5);
        const pageHeight = pageRowCount * itemHeight;
        const contentHeight = rowCount === 0 ? itemHeight : itemHeight * rowCount;
        const pageLastIndex = Math.floor(contentHeight / pageHeight);
        this.setState({ containerHeight: containerHeight, contentHeight: contentHeight, pageHeight: pageHeight, pageRowCount: pageRowCount, pageLastIndex: pageLastIndex });
    }

    renterItems(start: number, end: number) {
        if (end <= 0 ) {
            return '';
        }
        const html: any[] = [];
        const data = this.props.data;
        const idField = this.props.idField;
        const nameField = this.props.nameField;
        for (let i = start; i <= end; i++) {
            const row = data[i];
            html.push(<div className="mc-list--item" key={row[idField]} data-id={row[idField]} data-action="select-item">{this.props.itemRender(row[nameField], row)}</div>);
        }
        return html;
    }

    updatePage() {
        const state = this.state;
        const scrollTop = this.scrollTop;
        const pageHeight = state.pageHeight;
        let page1Index = state.page1Index;
        let page2Index = state.page2Index;
        const pageLastIndex = state.pageLastIndex;
        const containerHeight = state.containerHeight;
        const isDown = this.oldScrollTop < scrollTop;
        const nextPageIndex = isDown ? Math.ceil(scrollTop / pageHeight) : Math.floor((scrollTop + containerHeight) / pageHeight);
        if (nextPageIndex <= pageLastIndex && page1Index !== nextPageIndex && page2Index !== nextPageIndex) {
            // It may not have two pages at all. keep the full logic for readability.
            if (page1Index < page2Index) {
                // asc and down, move page1 to the bottom of page2 and load the next page
                // asc and up, move page2 to the top of page1 and load the next page into page2
                page1Index  = isDown ? nextPageIndex : nextPageIndex + 1;
                page2Index = page1Index - 1;
            } else {
                // desc and down / up, reverse upper logic.
                page1Index = isDown ? nextPageIndex - 1 : nextPageIndex;
                page2Index = page1Index + 1;
            }

            const nextPageStartIndex = nextPageIndex * state.pageRowCount;
            if (this.props.onRequestData && !this.state.data[nextPageStartIndex]) {
                // skip the same request.
                if (this.neddedDataIndex !== nextPageStartIndex) {
                    this.neddedDataIndex = nextPageStartIndex;
                    this.lastPage1Index = page1Index;
                    this.lastPage2Index = page2Index;
                    this.props.onRequestData({ index: this.neddedDataIndex, action: 'append-data' }); // when tree, it needs to insert data
                }
            } else {
                // no need to request the next page data
                this.neddedDataIndex = -1;
                // It may not have two pages.
                this.setState( { page1Index: page1Index, page2Index: page2Index } );
            }
        }
        this.oldScrollTop = scrollTop;
    }

    // need debounce, when stopping, it loads its page.
    handleScroll(e: React.SyntheticEvent<HTMLDivElement>) {
        // for direction: up / down
        this.scrollTop = e.currentTarget.scrollTop;
        this.updatePageDebounced();
    }

    render() {
        // page index
        const state = this.state;
        const pageRowCount = state.pageRowCount;
        const page1StartIndex = state.page1Index * pageRowCount;
        const page2StartIndex = state.page2Index * pageRowCount;
        const page1EndIndex = page1StartIndex + pageRowCount - 1;
        const page2EndIndex = page2StartIndex + pageRowCount - 1;
        // top
        const itemHeight = this.props.itemHeight;
        const page1Top = page1StartIndex * itemHeight;
        const page2Top = page2StartIndex * itemHeight;
        return (
            <div className="mc-list" ref={this.elRef}>
                <div className="mc-list--content" style={{height: this.state.contentHeight}} onScroll={this.handleScroll}>
                    <div className="mc-list--content--page1" style={{height: this.state.pageHeight, top: page1Top}}>
                        {this.renterItems(page1StartIndex, page1EndIndex)}
                    </div>
                    <div className="mc-list--content--page2" style={{height: this.state.pageHeight, top: page2Top}}>
                        {this.renterItems(page2StartIndex, page2EndIndex)}
                    </div>
                </div>
            </div>
        );
    }
}
