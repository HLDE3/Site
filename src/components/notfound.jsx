import './account/card.css'
import './main.css'
import './variables.css'

function NotFound() {
    
    return (
        <div>
            <div className="card-container">
                <div className="card main" style={{width: "250px", height: "100px"}}>
                    <h3 className="title">404</h3>
                </div>
            </div>
        </div>
    );
}

export default NotFound