export interface IAddress {
    id: number;
    userId: number;
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
    userId: number;
    cnpj?: string;
    corporateName?: string;
    description?: string;
    imageUrl?: string;
    name?: string;
}

export interface IAddress {
    id: number;
    userId: number;
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

export interface IProductCategories {
    id: number;
    name: string;
    storeId: number;
}

export interface IProduct {
    id: number;
    storeId: number;
    imageUrl?: string;
    name: string;
    price: number;
    description?: string;
    availableDelivery: boolean;
    availableStore: boolean;
    categories: IProductCategories[];
}

