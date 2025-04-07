import './card.css'
import '../main.css'
import '../variables.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { updateTokens, checkAccess, setAuthTokens } from './token-servise';

function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isCheckingAccess, setIsCheckingAccess] = useState(true);

    useEffect(() => {
        // Проверяем доступ при монтировании компонента
        const checkAuth = async () => {
            try {
                const hasAccess = await checkAccess();
                if (hasAccess) {
                    const decoded = jwtDecode(Cookies.get('access_token'));
                    const username = decoded.preferred_login;
                    navigate(`/user/${username}`);
                }
            } catch (error) {
                console.error("Auth check error:", error);
            } finally {
                setIsCheckingAccess(false);
            }
        };

        checkAuth();
    }, [navigate]);

    const handleNameChange = (e) => setLogin(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!login || !password) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        try {
            const response = await axios.post('http://localhost:1488/auth/login', {
                login: login,
                password: password,
            });

            setAuthTokens(response.data.access_token, response.data.refresh_token)

            const decoded = jwtDecode(response.data.access_token);
            navigate(`/user/${decoded.preferred_login}`);
            
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || 'Ошибка при входе. Проверьте данные и попробуйте снова.');
        }
    };

    useEffect(() => {
        document.title = "Login";
    }, []);

    if (isCheckingAccess) {
        return <div className="card-container">Loading...</div>;
    }

    return (
        <div className="card-container">
            <div className="card main" style={{width: "250px"}}>
                <h1 className="title">Log in</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            onChange={handleNameChange}
                            type="text"
                            id="login"
                            name="login"
                            placeholder="login"
                            value={login}
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <input
                            onChange={handlePasswordChange}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            value={password}
                            autoComplete="current-password"
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div>
                    <button onClick={() => navigate("/register")}>First time here?</button>
                </div>
            </div>
        </div>
    );
}

export default Login;