import '../variables.css'
import '../main.css'
import './TopBar.css'
import person from '../../assets/person.svg';
import shop from '../../assets/shop.svg';
import { useNavigate } from 'react-router-dom';


function TopBar() {
    const navigate = useNavigate();

    return (
        <>
            <div className="top-bar-container">
                <div className="top-bar">
                    <div className="center-menus">
                        <button onClick={() => navigate("/shop")} className="account-button">
                            <img src={shop} alt='shop'/>
                        </button>
                    </div>
                    <div className="menu right-menu">
                        <button onClick={() => navigate("/login")} className="account-button">
                            <img src={person} alt='person'/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar