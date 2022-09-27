export interface IAddress {
    id: number;
    user_id: number;
    street: string;
    number?: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    cep: string;
    country: string;
}

export interface IPersonalData {
    id: number;
    user_id: number;
    cnpj?: string;
    corporate_name?: string;
    description?: string;
    image_url?: string;
    name?: string;
}

export interface IAddress {
    id: number;
    user_id: number;
    street: string;
    number?: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    cep: string;
    country: string;
}

export interface TelephoneType {
    id: number;
    ddd: string;
    number: string;
}

