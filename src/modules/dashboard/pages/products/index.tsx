import React, {useState} from 'react';
import Filters from './components/filters';
import ProductCard from './components/productCard';
import Button from '@mui/material/Button';
import InputSearch from '../../components/inputSearch';
import ModalEditProduct from './components/modalEditProduct';

const PRODUCTNAME = 'Nome do Produto que pode ser bem grande'
const DESCRIPTION = `a descrição do produto tambem pode ser bem grande, ja que devera conter a maioria dos igrendientes do produto,
no hamburger por exemplo quantas carnes, e os tipos, a mesma coisa nos outros produtos, como pratos, e sobremesas`

export default function Products() {
    const [modalOpen, setModalOpen] = useState(false);

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
                    value=''
                />
                <div style={{display: 'flex',textAlign: 'right', alignItems: "center" }}>
                    <Button 
                        variant="contained" 
                        onClick={()=> setModalOpen(!modalOpen)}
                    >
                        NOVO PRODUTO
                    </Button>
                    <Filters />
                </div>
            </div>
            
            <ProductCard price={50.99} productName={PRODUCTNAME} productDescription={DESCRIPTION} availableStore={true} availableDelivery={true}/>
            <ProductCard price={34.50} productName={PRODUCTNAME} productDescription={DESCRIPTION} availableStore={true} availableDelivery={true}/>
            <ProductCard price={49.00} productName={PRODUCTNAME} productDescription={DESCRIPTION} availableStore={true} availableDelivery={true}/>
            <ProductCard price={10.00} productName={PRODUCTNAME} productDescription={DESCRIPTION} availableStore={true} availableDelivery={true}/>
            <ProductCard price={3.00} productName={PRODUCTNAME} productDescription={DESCRIPTION} availableStore={true} availableDelivery={true}/>
            <ProductCard price={5.90} productName={PRODUCTNAME} productDescription={DESCRIPTION} availableStore={true} availableDelivery={true}/>
            <ProductCard price={38.90} productName={PRODUCTNAME} productDescription={DESCRIPTION} availableStore={true} availableDelivery={true}/>
        
        </div>

    )

}