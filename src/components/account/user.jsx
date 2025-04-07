import './card.css';
import '../main.css';
import './user.css';
import '../variables.css';
import NotFound from '../notfound';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const getUser = async (name) => {
    try {
        const response = await axios.get(`http://localhost:1488/users/search?name=${name}`);
        return response.data;
    } catch (error) {
        return null;
    }
};

function User() {
    const navigate = useNavigate();
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser(username);
            if (userData) {
                setUser(userData);
            }
            setLoading(false);
        };

        fetchUser();
    }, [username, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <NotFound />;
    }

    return (
        <>
            <div>
                <div className="card-container" style={{flexDirection: "column", gap: "10px"}}>
                    <div className="card main user-card">
                        <div>
                            <div className="avatar-container">                    
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${user.login}&background=0D8ABC&color=fff&font-size=0.5&bold=true`} 
                                    alt="User avatar" 
                                />
                                <div className="username-container">
                                    <h2 className="username">{user.login}</h2>
                                    <h2 className="uid">id: {user.id}</h2>
                                </div>
                            </div>                     
                        </div>
                    </div>
                    <div className="card main user-card">
                        <div className="user-details">
                            <div className="detail-item">
                                <span className="detail-label">Дата регистрации: </span>
                                <span className="detail-value">{new Date(user.registerDate).toLocaleDateString()}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Роль: </span>
                                <span className="detail-value">{user.role || 'Пользователь'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Статус: </span>
                                <span className={`status-badge ${user.active ? 'active' : 'inactive'}`}>
                                    {user.ban ? 'Заблокирован' : user.active ? 'Активен' : 'Неактивен'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;