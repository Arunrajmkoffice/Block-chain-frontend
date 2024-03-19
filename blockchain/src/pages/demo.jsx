const handlesubmit = async (e) => {
  e.preventDefault();

  let data = {
    productname: productname.trim(),
    batchnumber: batchnumber.trim(),
    sku: sku.trim(),
    countryorigin: countryorigin.trim(),
    inventory: inventory.trim(),
    description: description.trim(),
    tag: tag.trim(),
    price: price.trim(),
    brand: brand.trim(),
    categories: categories.trim(),
    saleprice: saleprice.trim(),
    images: images,
  };

  try {
    const response = await fetch('https://courageous-cow-life-jacket.cyclic.app/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    console.log('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error.message);
  }
};
