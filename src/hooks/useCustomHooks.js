import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useData = () => {
    return useContext(DataContext);
};
