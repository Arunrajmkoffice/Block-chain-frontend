import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Updateproductpage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('bcToken');
    setToken(storedToken);
  }, []);

  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(`https://courageous-cow-life-jacket.cyclic.app/product/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const productData = await response.json();
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, []);

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Updateproductpage;
