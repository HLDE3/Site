import './Login.css'
import '../colors.css'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [pass, setPass] = useState(false);

    const handleNameChange = (e) => setLogin(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!login || !password) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        try {
            await axios.post('http://localhost:1488/users/login', {
                login: login,
                password: password,
            });

            setPass(true)
        } catch (error) {
            setError('Ошибка при регистрации: ' + error.message);
        }

        setLogin('');
        setPassword('');
    };

    document.title = "Login";

    return (
        <div className="card-container">
            <div className="card">
                {!pass && <h1>Log in</h1>}
                {pass && <h1>Зарегался</h1>}
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

export default Login