import React from 'react'
import './TopBar.css'
// import '../main.css'

function TopBar() {

    var name = ""
    var password = ""

    const handleNameChange = (e) => name = e.target.value
    const handlePasswordChange = (e) => password = e.target.value

    return (
        <>
        <div className="form">
            <h1 className='logo'>Sign in</h1>
            <div id='name'>
                <input onChange={handleNameChange} type="text" id="login" name="login" placeholder="login" />
            </div>
            <div id='password'>
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