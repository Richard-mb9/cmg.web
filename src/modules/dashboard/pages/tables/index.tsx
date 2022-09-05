import React, {useState} from 'react';
import CardTables from './components/CardTables';
import Button from '@mui/material/Button';
import ModalAddTables from './components/ModalAddTables';
import ModalPrintAllQrCodes from './components/ModalPrintAllQrCodes';

const tables = [
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
    {tableName: 'Mesa 1', contentQrCode:'https://www.nomedaaplicacao/1/mesas/1'},
]

export default function(){
    const [openModalAddTables, setOpenModalAddTables] = useState(false);
    const [openModalAllQrCodes, setOpenModalAllQrCodes] = useState(false)

    return (
        <>
            <ModalAddTables open={openModalAddTables} setOpen={setOpenModalAddTables}/>
            <ModalPrintAllQrCodes open={openModalAllQrCodes} setOpen={setOpenModalAllQrCodes} qrCodes={tables}/>
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#eeeeef' }}>
                <div>
                    <div style={{display: 'flex', margin: 10}}>
                        <Button 
                            onClick={()=>setOpenModalAddTables(!openModalAddTables)} 
                            style={{margin: 10}} 
                            variant='contained'
                        >
                            Cadastrar Mesa
                        </Button>
                        <Button
                            style={{margin: 10}} 
                            variant='contained'
                            onClick={()=> setOpenModalAllQrCodes(!openModalAllQrCodes)}
                        >
                            Imprimir todos QRCodes
                        </Button>
                    </div>
                    <div style={{ margin: 30, color: '#666' }}>
                        <h2>Mesas</h2>
                    </div>
                    <CardTables />
                    <CardTables />
                    <CardTables />
                    <CardTables />
                    <CardTables />
                    <CardTables />
                    <CardTables />
                    <CardTables />
                    <CardTables />
                    <CardTables />
                </div>
            </div>
        </>
    )
}