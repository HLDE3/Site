import './card.css'
import '../main.css'
import '../variables.css'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleNameChange = (e) => setLogin(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        setError("")
        e.preventDefault();

        if (!login || !password) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        try {
            await axios.post('http://localhost:1488/auth/login', {
                login: login,
                password: password,
            });

            navigate("/user/test")
            
        } catch (error) {
            setError(error.response.data);
        }

        setLogin('');
        setPassword('');
    };

    document.title = "Login";

    return (
        <div className="card-container">
            <div className="card main" style={{width: "250px"}}>
                {<h1 className="title">Log in</h1>}
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