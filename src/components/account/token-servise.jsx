import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const updateTokens = async () => {
    try {
        const response = await axios.post('http://localhost:1488/auth/token', null, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setAuthTokens(response.data.access_token, response.data.refresh_token)
        
        return response.data;
    } catch (e) {
        console.error('Token refresh failed:', e);
        throw e;
    }
};

export const checkAccess = async () => {
    try {
        const token = Cookies.get('access_token');
        if (!token) {
            return false;
        }

        let decoded;
        try {
            decoded = jwtDecode(token);
        } catch (e) {
            console.error("Invalid JWT:", e);
            return false;
        }

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.log("Token expired or near expiry, refreshing...");
            await updateTokens();
            return true;
        }

        return true;
    } catch (e) {
        console.error("Access check failed:", e);
        return false;
    }
};

export const setAuthTokens = (accessToken, refreshToken) => {
    Cookies.set('access_token', accessToken, {
        path: '/',
        secure: true,
        sameSite: 'strict'
    });
    
    Cookies.set('refresh_token', refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'strict'
    });
};