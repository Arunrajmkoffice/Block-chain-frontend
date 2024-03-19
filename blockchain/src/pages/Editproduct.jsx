import React, { useState, useEffect } from 'react';

function Editproduct() {
  const [productData, setProductData] = useState([]);
  let token = localStorage.getItem('bcToken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://courageous-cow-life-jacket.cyclic.app/product', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log('Data type:', typeof data); 
        console.log('get data', data);
        setProductData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {productData?.products?.map((product, index) => (
        <div key={index}>
          <h2>{product.product}</h2>
          <p>Price: ${product.price}</p>
          <p>SKU: {product.sku}</p>
          <p>Branch Number: {product.branchNumber}</p>
          <p>Country of Origin: {product.countryOfOrigin}</p>
          <p>Inventory: {product.inventory}</p>
          <p>Description: {product.description}</p>
          <p>Tag: {product.tag}</p>
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
          <p>Sales Price: ${product.salesPrice}</p>
          <img src={`https://courageous-cow-life-jacket.cyclic.app/${product.image[0].imageData}`} alt="Product" />

        </div>
      ))}
    </div>
  );
}

export default Editproduct;
