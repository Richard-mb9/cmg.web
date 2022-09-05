import React from 'react';

import CategoryCard from './categoryCard';

import Alcoolicas from './static/cards/alcoolicas.jpg';
import Sucos from './static/cards/sucos.webp';
import Refrigerantes from './static/cards/refrigerantes.png';
import Bebidas from './static/cards/bebidas.jpeg';
import Petiscos from './static/cards/petiscos.jpeg';
import Sobremesas from './static/cards/sobremesas.png';
import Refeicoes from './static/cards/refeicoes.png';
import Combos from './static/cards/combos.png';
import Pizzas from './static/cards/pizzas.webp';
import Sanduiches from './static/cards/sanduiches.jpeg';

export default function () {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                width: '100%',
                overflowX: 'scroll',
                padding: 2
            }}
        >
            <CategoryCard categoryName='Sanduiches' image={Sanduiches} />
            <CategoryCard categoryName='Pizzas' image={Pizzas} />
            <CategoryCard categoryName='Combos' image={Combos} />
            <CategoryCard categoryName='Refeições' image={Refeicoes} />
            <CategoryCard categoryName='Petiscos' image={Petiscos} />
            <CategoryCard categoryName='Sobremesas' image={Sobremesas} />
            <CategoryCard categoryName='Bebidas' image={Bebidas} />
            <CategoryCard categoryName='Bebidas Alcoolicas' image={Alcoolicas} />
            <CategoryCard categoryName='Refrigerantes' image={Refrigerantes} />
            <CategoryCard categoryName='Sucos' image={Sucos} />
        </div>

    )
}