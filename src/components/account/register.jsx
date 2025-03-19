import './Login.css'
import '../main.css'
import { useState } from 'react'
import axios from 'axios';

function SignIn() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleNameChange = (e) => setLogin(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!login || !password) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        try {
            await axios.post('http://localhost:1488/users/register', {
                login: login,
                password: password,
            });
        } catch (error) {
            setError('Ошибка при регистрации: ' + error.message);
        }

        setLogin('');
        setPassword('');
        setError('');
    };

    document.title = "Sign in";

    return (
        <div className="card">
            <h1>Sign in</h1>
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
                    <button type="submit">ok</button>
                </div>
            </form>
        </div>
    );
}

export default SignIn