import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


// items
export const getItemsOrCutomers = async (type) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${type}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const addItemsOrCutomers = async (type,item) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${type}`,
            item);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};
 


export const getInvoice = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/invoice`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const submitInvoice = async (item) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/invoice`,
            item);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};
 