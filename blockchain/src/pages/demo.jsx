import React, { useState } from 'react';

function Demo() {
  let data = [
    { "emailid": "uswarehouse@gmail.com", "vendorId": "31b139eb-66e4-49c3-ba71-ab9affb502dd" },
    { "emailid": "china@gmail.com", "vendorId": "5f6e7db4-e893-4e1d-9ff6-a99791c49b83" }
    ,
    { "emailid": "china@gmail.com", "vendorId": "5f6e7db4-e893-4e1d-9ff6-a99791c49b83" }
  ];

  const [selectedVendorId, setSelectedVendorId] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedVendorId(event.target.value);
  };

  return (
    <>
      <div style={{ padding: "20%" }}>
        <select onChange={handleSelectChange}>
          <option value="">Select Vendor</option>
          {data.map((item, index) => (
            <option key={index} value={item.vendorId}>{item.vendorId}</option>
          ))}
        </select>
        {selectedVendorId && (
          <div>
            <p>Selected Vendor ID: {selectedVendorId}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Demo;
