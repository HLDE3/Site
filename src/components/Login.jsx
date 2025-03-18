import './Login.css'
import {useCookies} from 'react-cookie'

function Login() {
    
    var name = ""
    var password = ""

    const handleNameChange = (e) => name = e.target.value
    const handlePasswordChange = (e) => password = e.target.value


    document.title = "Sign in";

    return (
        <>
        <div className="card">
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

export default Login