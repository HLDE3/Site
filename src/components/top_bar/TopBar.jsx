import '../variables.css'
import '../main.css'
import './TopBar.css'
import logo from '../../assets/person.svg';
import { useNavigate } from 'react-router-dom';


function TopBar() {
    const navigate = useNavigate();

    return (
        <>
        <div className="top-bar-container">
            <div className="top-bar">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px"
                }}>
                    <button onClick = {() => navigate("/login")} className="account-button"><img src={logo} alt='logo'/></button>
                </div>
            </div>
        </div>
        </>
    )
}

export default TopBar