import './TopBar.css'
import '../main.css'

function TopBar() {

    return (
        <>
        <div className="top-bar">
            <h1>Sign in</h1>
            <div>
                <input onChange={handleNameChange} type="text" id="login" name="login" placeholder="login" />
            </div>
            <div>
                <input onChange={handlePasswordChange} type="password" id="password" name="password" placeholder="password" />
            </div>
            <div>
                <button>login</button>
            </div>
        </div>
        </>
    )
}

export default TopBar