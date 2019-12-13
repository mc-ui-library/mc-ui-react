// ************ Data Model ************
export interface Column {
  field?: string; // field name;
  name?: string; // column name
  tpl?: any; // column template
  headerTpl?: any; // column header template
  width?: number;
}

export interface ScrollData {
  columns?: Column[];
  action: "append" | "insert" | "initialize";
  rows: any[];
  start: number;
  rowCount: number;
}
