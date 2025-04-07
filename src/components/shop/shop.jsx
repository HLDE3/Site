import '../account/card.css'
import '../main.css'
import '../variables.css'
import './product.css'
import { useState, useEffect } from 'react';

function makeProduct(product) {
    return (
        <div className="product-card">
            <div className="product-details">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">
                    {product.description || "Описание товара отсутствует"}
                </p>
                <div className="product-footer">
                    <span className="product-price">${product.price || "0.00"}</span>
                    <button className="buy-button">Buy</button>
                </div>
            </div>
        </div>
    );
}
function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:1488/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <div className="card-container">
                <div className="cards">
                    {products.map(product => makeProduct({
                        name: product.name,
                        description: product.description,
                        price: product.price
                    }))}
                </div>
            </div>
        </div>
    );
}

export default Shop