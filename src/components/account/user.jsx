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
        <div>
            <div className="card-container">
                <div className="card main" style={{ width: "250px", height: "100px" }}>
                    <h3 className="title">{user.login}</h3>
                </div>
            </div>
        </div>
    );
}

export default User;