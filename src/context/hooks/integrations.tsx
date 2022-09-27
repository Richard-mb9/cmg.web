import { useContext } from 'react';
import { TelephonesIntegrationContext } from '../integrationsContext/telephones';
import { AddressIntegrationContext } from '../integrationsContext/adresses';
import { PersonalDataIntegrationContext } from '../integrationsContext/personalData';
import { AuthIntegrationContext } from '../integrationsContext/auth';


export const useTelephoneApi = () => useContext(TelephonesIntegrationContext);

export const useAddressApi = () => useContext(AddressIntegrationContext);

export const usePersonalDataApi = () => useContext(PersonalDataIntegrationContext);

export const useAuthApi = () => useContext(AuthIntegrationContext);

