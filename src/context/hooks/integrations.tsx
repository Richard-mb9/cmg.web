import { useContext } from 'react';
import { TelephonesIntegrationContext } from '../integrationsContext/telephones';
import { AddressIntegrationContext } from '../integrationsContext/adresses';
import { PersonalDataIntegrationContext } from '../integrationsContext/personalData';
import { AuthIntegrationContext } from '../integrationsContext/auth';
import { ProductsIntegrationContext } from '../integrationsContext/products';
import { ProductCategoriesIntegrationContext } from '../integrationsContext/productCategories';


export const useTelephoneApi = () => useContext(TelephonesIntegrationContext);

export const useAddressApi = () => useContext(AddressIntegrationContext);

export const usePersonalDataApi = () => useContext(PersonalDataIntegrationContext);

export const useAuthApi = () => useContext(AuthIntegrationContext);

export const useProductsApi = () => useContext(ProductsIntegrationContext);

export const useProductCategoriesApi = () => useContext(ProductCategoriesIntegrationContext);

