import './Login.css'
import '../variables.css'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function User() {
    const navigate = useNavigate();
    
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
            const response = await axios.post('http://localhost:1488/users/register', {
                login: login,
                password: password,
            });
        
        } catch (error) {
            setError(error.response.data);
        }

        setLogin('');
        setPassword('');
    };

    document.title = "Sign in";

    return (
        <div className="card-container">
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
                        <button type="submit">Register</button>
                    </div>
                </form>
                <div>
                    <button onClick={() => navigate("/login")}>I'm already have an account</button>
                </div> 
            </div>
        </div>
    );
}

export default User