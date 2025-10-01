import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const registerUniversity = async (data) => {
    return axios.post(`${BACKEND_URL}/auth/registerUniversity`, data, { withCredentials: true });
};
export const login = async (data) => {

    return axios.post(`${BACKEND_URL}/auth/login`, data, { withCredentials: true });
};

export const logout = async () => {
    return axios.post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
};

export const verify = async () => {
    return axios.get(`${BACKEND_URL}/auth/verify`, { withCredentials: true });
};

//OWNER
export const registerUser = async (data) => {
    return axios.post(`${BACKEND_URL}/owner/registerUser`, data, { withCredentials: true });
};

export const removeUser = async (data) => {
    return axios.post(`${BACKEND_URL}/owner/removeUser`, data, { withCredentials: true });
};

export const userList = async () => {
return axios.get(`${BACKEND_URL}/owner/listUsers`, { withCredentials: true });
};

export const transferOwner = async (data) => {
return axios.post(`${BACKEND_URL}/owner/transferOwnership`, data, { withCredentials: true });
};

//ADMINS
export const sendfile=async(data)=>{
return axios.post(`${BACKEND_URL}/admin/storedatalinks`,data,{ withCredentials: true });
}

export const predictDropout = async () => {
return axios.get(`${BACKEND_URL}/admin/predictdropout`, { withCredentials: true });
};

export const refreshPrediction = async () => {
return axios.get(`${BACKEND_URL}/admin/refreshPrediction`, { withCredentials: true });
};

export const sendemail=async(data)=>{
return axios.post(`${BACKEND_URL}/email/send`,data,{ withCredentials: true });
}

