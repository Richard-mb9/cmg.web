import React from "react";

import CardPhoto from "./components/CardPhoto";
import CardAddress from "./components/CardAddress";
import CardPersonalData from "./components/CardPersonalData";
import CardTelephones from "./components/CardTelephones";

export default function Profile() {
    return (
        <div>
            <CardPhoto storeName="Retaurante do Dodô" storeDescription="Breve Descrição do Estabelecimento"/>
            <CardAddress />
            <CardPersonalData />
            <CardTelephones />
        </div>
    );
}
