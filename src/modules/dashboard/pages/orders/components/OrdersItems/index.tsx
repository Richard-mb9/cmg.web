import React from 'react';


export default function (){
    const Td = (props: any)=> (
        <td style={{padding: '20px 10px'}}>
            {props.children}
        </td>
    )

    const Th = (props: any)=> (
        <th style={{padding: '20px 10px'}}>
            {props.children}
        </th>
    )

    return (
        <table style={{borderCollapse: 'collapse', maxWidth: '100vw'}}>
            <thead style={{borderBottom: 'solid 1px #ddd'}}>
                <tr>
                    <Th>Nome</Th>
                    <Th>Preço Un.</Th>
                    <Th>Qt.</Th>
                    <Th>Subtotal</Th>
                </tr>
            </thead>
            <tbody>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 61,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 61,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 60,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 60,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 60,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 60,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 60,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 60,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 61,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 61,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 61,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 61,00</Td>
                </tr>
                <tr style={{borderBottom: 'solid 1px #ddd'}}>
                    <Td>qualquer coisa com o nome muito grande</Td>
                    <Td>R$ 30,00</Td>
                    <Td>2</Td>
                    <Td>R$ 61,00</Td>
                </tr>
            </tbody>
        </table>
    );
}