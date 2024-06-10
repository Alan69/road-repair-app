// utils/api.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchRoadRepairData = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                apiKey: API_KEY,
                page: page,
                limit: limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при запросе данных:', error);
        throw error;
    }
};
