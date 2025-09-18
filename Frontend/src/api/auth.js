import axios from 'axios';

const API_BASE = 'http://localhost:5176/api/auth'; 
const OWNER_BASE = 'http://localhost:5176/api/owner';

export const registerUniversity = async (data) => {
    return axios.post(`${API_BASE}/registerUniversity`, data, { withCredentials: true });
};

export const registerUser = async (data) => {

    return axios.post(`${OWNER_BASE}/registerUser`, data, { withCredentials: true });
};

export const removeUser = async (data) => {
    // data: { userId }
    return axios.post(`${OWNER_BASE}/removeUser`, data, { withCredentials: true });
};

export const userList = async () => {
    return axios.get(`${OWNER_BASE}/listUsers`, { withCredentials: true });
};

export const login = async (data) => {
    return axios.post(`${API_BASE}/login`, data, { withCredentials: true });
};

export const logout = async () => {
    return axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
};

export const verify = async () => {
    return axios.get(`${API_BASE}/verify`, { withCredentials: true });
};

export const storeDataLinks = async () => {
    return axios.get(`${API_BASE}/storeDataLinks`, { withCredentials: true });
}

