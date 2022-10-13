import React, {CSSProperties} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface IProps<T = any> {
    data: T[];
    columns: GridColDef[];
    pageSize?: number;
    checkboxSelection?: boolean;
    style?: CSSProperties;
    isLoading?: boolean
}

export default function Table(props: IProps) {
    const { data, columns, checkboxSelection, isLoading} = props;
    const pageSize = props.pageSize || 20
    const style = { height: 'calc(100vh - 220px)', width: '100%', ...(props.style || {})}
  return (
    <div style={style}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        checkboxSelection={checkboxSelection}
        loading={isLoading}
      />
    </div>
  );
}
