import '../main.css'
import '../variables.css'
import './card.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { updateTokens, checkAccess, setAuthTokens } from './token-servise';


function SignIn() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckingAccess, setIsCheckingAccess] = useState(true);

    const handleNameChange = (e) => setLogin(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        if (!login || !password) {
            setError('Пожалуйста, заполните все поля');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:1488/auth/register', {
                login: login,
                password: password,
            });

            if (response.data.access_token) {
                
                setAuthTokens(response.data.access_token, response.data.refresh_token)

                // Перенаправляем на страницу пользователя
                navigate('/user/' + login);
            } else {
                // Если нужно подтверждение, перенаправляем на логин
                navigate('/login', { state: { registrationSuccess: true } });
            }
            
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.response?.data?.message || 
                   error.response?.data || 
                   'Ошибка при регистрации. Попробуйте другой логин или проверьте данные.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
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
    

    useEffect(() => {
        document.title = "Sign up";
    }, []);

    if (isCheckingAccess) {
        return <div className="card-container">Loading...</div>;
    }

    return (
        <div className="card-container">
            <div className="card main" style={{width: "250px"}}>
                <h1 className="title">Sign up</h1>
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
                            required
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
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : 'Register'}
                        </button>
                    </div>
                </form>
                <div>
                    <button 
                        onClick={() => navigate("/login")}
                        disabled={isSubmitting}
                    >
                        I already have an account
                    </button>
                </div> 
            </div>
        </div>
    );
}

export default SignIn;