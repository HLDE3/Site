import './TopBar.css'
import '../variables.css'

function TopBar() {

    return (
        <>
        <div className="top-bar-container">
            <div className="top-bar">
                <button className="account-button">login</button>
                <button className="account-button">home</button>
            </div>
        </div>
        </>
    )
}

export default TopBar