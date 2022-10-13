import React, {useContext, useState, useEffect} from 'react';
import Filters from './components/filters';
import ProductCard from './components/productCard';
import Button from '@mui/material/Button';
import InputSearch from '../../components/inputSearch';
import ModalEditProduct from './components/modalEditProduct';
import {Link} from 'react-router-dom';
import { DataContext } from '../../../../context/contextData';


export default function Products() {
    const { products } = useContext(DataContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [productCategoryFiltered, setProductCategoryFiltered] = useState<string>('all');

    const [previewProducts, setPreviewProducts] = useState(products || []);

    const handleSearch = ()=>{
        const newPreview = products.filter((p)=>p.name.toLowerCase().includes(search.toLowerCase()));
        setPreviewProducts(newPreview);
        setProductCategoryFiltered('all');
    }

    useEffect(()=>{
        handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    useEffect(()=>{
        if(!previewProducts.length && products.length){
            setPreviewProducts(products)
            return;
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    useEffect(()=>{
        if(productCategoryFiltered === 'all'){
            setPreviewProducts(products);
            return;
        }
        const newPreviewProducts = products.filter(
            (product) => !!product.categories.find(
                (category)=>category.name === productCategoryFiltered
            )
        );
        setSearch('');
        setPreviewProducts(newPreviewProducts);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productCategoryFiltered]);

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <ModalEditProduct setOpen={setModalOpen} open={modalOpen} />
            <div 
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%', 
                    justifyContent: 'space-between',
                    margin: "0 14px",
                }}
            >
                <InputSearch
                    styles={{margin: "10px 0"}}
                    value={search}
                    onChange={(event)=>setSearch(event.target.value)}
                    onSearch={handleSearch}
                />
                <div style={{display: 'flex',textAlign: 'right', alignItems: "center" }}>
                    <Link to='/products/create' 
                        style={{
                            textDecoration: 'none', 
                        }} 
                    >
                        <Button 
                            variant="contained" 
                        >
                            NOVO PRODUTO
                        </Button>
                    </Link>
                    <Filters 
                        onSelect={(categoryName)=>setProductCategoryFiltered(categoryName)}
                    />
                </div>
            </div>
            {
                previewProducts.map((product)=><ProductCard  key={product.id} product={product}/>)
            }
        </div>

    )

}