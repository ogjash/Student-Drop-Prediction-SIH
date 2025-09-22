import axios from 'axios';

const API_BASE = import.meta.env.VITE_APP_API_BASE;
const OWNER_BASE = import.meta.env.VITE_APP_OWNER_BASE;
const Admin_BASE = import.meta.env.VITE_APP_ADMIN_BASE;

export const registerUniversity = async (data) => {
    return axios.post(`${API_BASE}/registerUniversity`, data, { withCredentials: true });
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

//OWNER
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

export const transferOwner = async (data) => {
return axios.post(`${OWNER_BASE}/transferOwner`, data, { withCredentials: true });
};

//ADMINS
export const sendfile=async(data)=>{
return axios.post(`${Admin_BASE}/storedatalinks`,data,{ withCredentials: true });
}

export const predictDropout = async () => {
return axios.get(`${Admin_BASE}/predictdropout`, { withCredentials: true });
};

export const refreshPrediction = async () => {
return axios.get(`${Admin_BASE}/refreshPrediction`, { withCredentials: true });
};