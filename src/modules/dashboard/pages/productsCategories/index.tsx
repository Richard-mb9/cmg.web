import React, { useState, useEffect } from 'react';
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { IProductCategories } from '../../../../utils/interfaces';
import Table from '../../../../shared/components/Table';
import ModalDelete from '../../../../shared/components/ModalDelete';
import useContextData from '../../../../context/hooks/useContextData';
import PageLoading from '../../../../shared/components/PageLoading';
import ModalCreateProductCategory from './components/ModalCreateProductCategory';
import { useProductCategoriesApi } from '../../../../context/hooks/integrations';
import ModalEditProductCategory from './components/ModalEditProductCategory';
import InputSearch from '../../components/inputSearch';



export default function ProductsCategories(){

    const { productCategories, setProductCategories} = useContextData();

    const { deleteProductCategory } = useProductCategoriesApi();

    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalCreateOpen, setModalCreateOpen] = useState(false);
    const [idForDelete, setIdForDelete] = useState<number | undefined>();
    const [productCategoryForUpdate, setProductCategoryForUpdate] = useState<IProductCategories>({} as IProductCategories);
    const [isLoading, setIsLoading] = useState(false);
    const [productCategoriesForShow, setProductCategoriesForShow] = useState<IProductCategories[]>([]);
    const [search, setSearch] = useState('');


    const handleModalEditOpen = (productCategory: IProductCategories) => {
        setProductCategoryForUpdate(productCategory);
        setModalEditOpen(true);
    };

    const handleModalDeleteOpen = (productCategoryId: number) => {
        setModalDeleteOpen(!modalDeleteOpen)
        setIdForDelete(productCategoryId)
    }

    const handleDeleteProductCategory = async () =>{
        setIsLoading(true);
        if(idForDelete){
            const response = await deleteProductCategory(idForDelete);
            if(response){
                const newCategories = productCategories.filter((c)=>c.id !== idForDelete)
                setProductCategories(newCategories)
            }
        }
        setIdForDelete(undefined);
        setIsLoading(false);
    }

    const handleSearch = ()=>{
        const newShow = productCategories.filter((category)=>category.name.toLowerCase().includes(search.toLowerCase()));
        setProductCategoriesForShow(newShow);
    }

    useEffect(()=>{
        handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productCategories])

    const columns: GridColDef<IProductCategories>[] = [
        {field: 'id', headerName: "ID", width: 70 },
        {field: "name", headerName: "Nome", width: 130 },
        {
            width: 50,
            field: "editar",
            renderCell: (params: GridRenderCellParams) => (
              <IconButton onClick={() => handleModalEditOpen(params.row)}>
                <ModeEditOutlineOutlinedIcon color="primary" />
              </IconButton>
            ),
        },
        {
            field: "excluir",
            width: 60,
            renderCell: (params: GridRenderCellParams) => (
              <IconButton onClick={() => handleModalDeleteOpen(params.row.id)}>
                <DeleteForeverIcon color="primary" />
              </IconButton>
            ),
        },
    ]

    


    return (<>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    margin: '20px 0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Button sx={{margin: '10px 10px 10px 0', height: '40px'}} variant='contained' onClick={()=>setModalCreateOpen(true)}>
                    {'NOVO'} < AddIcon/>
                </Button>
                <InputSearch
                    styles={{margin: "10px 0"}}
                    value={search}
                    onChange={(event)=>setSearch(event.target.value)}
                    onSearch={handleSearch}
                />

            </Box>
            <Table 
                data={productCategoriesForShow}
                columns={columns}
                pageSize={100}
            />
        </Box>
        <ModalDelete 
            message='Tem Certeza que deseja excluir esta categoria?'
            open={modalDeleteOpen}
            setOpen={setModalDeleteOpen}
            action={handleDeleteProductCategory}
        />
        <ModalCreateProductCategory 
            open={modalCreateOpen}
            setOpen={setModalCreateOpen}
        />
        <ModalEditProductCategory 
            open={modalEditOpen}
            setOpen={setModalEditOpen}
            productCategory={productCategoryForUpdate}
        />
        <PageLoading open={isLoading}/>
    </>)
}