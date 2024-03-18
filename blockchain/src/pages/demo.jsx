import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';

const ProductImporter = () => {
  const [importedProducts, setImportedProducts] = useState([]);

  const handleCSVUpload = (data) => {
    const headers = data[0];
    const productData = data.slice(1);
    const products = productData.map(row => {
      let product = {};
      headers.forEach((header, index) => {
        product[header] = row[index];
      });
      return product;
    });
    setImportedProducts(products);
  };

  return (
    <div>
      <h1>Product Importer</h1>
      <CSVReader
        onFileLoaded={handleCSVUpload}
        parserOptions={{ header: true }}
      />
      <h2>Imported Products</h2>
      <ul>
        {importedProducts.map((product, index) => (
          <li key={index}>{JSON.stringify(product)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductImporter;
