import { useContext } from 'react';
import { DataContext } from '../contextData';


const useContextData = ()=> useContext(DataContext);

export default useContextData;