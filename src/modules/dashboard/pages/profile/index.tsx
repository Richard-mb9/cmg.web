import React from "react";

import CardPhoto from "./components/CardPhoto";
import CardAddress from "./components/CardAddress";
import CardPersonalData from "./components/CardPersonalData";
import CardTelephones from "./components/CardTelephones";

export default function Profile() {
    return (
        <div>
            <CardPhoto storeName="Retaurante do Dodô" storeDescription="Breve Descrição do Estabelecimento"/>
            <CardAddress 
                street="Rei Pelé"
                district="Tri Campeão"
                city="Queimados"
                state="RJ"
                cep="12345678"
            />
            <CardPersonalData 
                storeName="Retaurante do Dodô"
                email="restaurante@hotmail.com"
                cnpj="123358478963"
            />
            <CardTelephones telefones={['(21) 98745-3254', '(21) 98745-3254']} />
        </div>
    );
}
