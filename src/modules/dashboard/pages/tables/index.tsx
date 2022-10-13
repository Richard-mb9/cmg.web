import React, {useState} from 'react';
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import ModalAddTables from './components/ModalAddTables';
import ModalPrintAllQrCodes from './components/ModalPrintAllQrCodes';
import Table from '../../../../shared/components/Table';
import ButtonOpenQrCode from './components/ButtonOpenQrCode';
import IconButtonModalDelete from '../../../../shared/components/IconButtonModalDelete';

interface ITable {
    id: number;
    tableName: string;
    contentQrCode: string;
}

const tables = [
    {id: 1, tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 2, tableName: 'Mesa 2', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 3, tableName: 'Mesa 3', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 4, tableName: 'Mesa 4', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 5, tableName: 'Mesa 5', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 6, tableName: 'Mesa 6', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 7, tableName: 'Mesa 7', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 8, tableName: 'Mesa 8', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 9, tableName: 'Mesa 9', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 10, tableName: 'Mesa 10', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 11, tableName: 'Mesa 11', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 12, tableName: 'Mesa 12', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 13, tableName: 'Mesa 13', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 14, tableName: 'Mesa 14', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {id: 378952, tableName: 'Mesa 15', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
]





export default function Tables(){
    const [openModalAddTables, setOpenModalAddTables] = useState(false);
    const [openModalAllQrCodes, setOpenModalAllQrCodes] = useState(false);

    const handleDelete = async (tableId: number) => {
        console.log(tableId)
    }

    const widthScreen = window.screen.width;

    const columns: GridColDef<ITable>[] = [
        {field: 'id', headerName: "ID", width: 70 },
        {field: "tableName", headerName: "Mesa", width: 90 },
        {
            field: "Ações",
            width: widthScreen > 400 ? 200 : 70,
            renderCell: (params: GridRenderCellParams<ITable, ITable>) => (
                <ButtonOpenQrCode  
                    contentQrCode={`https://www.nomedaaplicacao/1/mesas/${params.row.tableName}`}
                    tableName={params.row.tableName}
                />
            ),
        },
        {
            field: "excluir",
            width: 60,
            renderCell: (params: GridRenderCellParams) => (
                <>
                    <IconButtonModalDelete 
                        message='Tem Certeza que quer apagar esta mesa?'
                        action={()=>handleDelete(params.row.id)}
                    />
                </>
            ),
        },
    ]

    return (
        <>
            <ModalAddTables open={openModalAddTables} setOpen={setOpenModalAddTables}/>
            <ModalPrintAllQrCodes open={openModalAllQrCodes} setOpen={setOpenModalAllQrCodes} qrCodes={tables}/>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <div>
                    <div style={{display: 'flex',flexWrap: 'wrap' ,margin: '10px 0'}}>
                        <Button 
                            onClick={()=>setOpenModalAddTables(!openModalAddTables)} 
                            style={{margin: '10px 10px 10px 0px'}} 
                            variant='contained'
                        >
                            Cadastrar Mesa
                        </Button>
                        <Button
                            style={{margin: '10px 10px 10px 0px'}} 
                            variant='contained'
                            onClick={()=> setOpenModalAllQrCodes(!openModalAllQrCodes)}
                        >
                            Imprimir todos QRCodes
                        </Button>
                    </div>
                    <Table 
                        data={tables}
                        columns={columns}
                        pageSize={100}
                    />
                </div>
            </div>
        </>
    )
}