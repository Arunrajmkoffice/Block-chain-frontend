import React, { useState, useEffect } from 'react';
function AllUserList() {
  let userData = JSON.parse(localStorage.getItem('bcUserData'));
  let data = [
    { "emailid": "uswarehouse@gmail.com", "vendorId": "31b139eb-66e4-49c3-ba71-ab9affb502dd" },
    { "emailid": "china@gmail.com", "vendorId": "5f6e7db4-e893-4e1d-9ff6-a99791c49b83" }
  ];
  // State to keep track of the selected vendor
  const [selectedVendor, setSelectedVendor] = useState('');
  // Function to handle dropdown change
  const handleDropdownChange = (event) => {
console.log("data", userData)

let updatedData = {
 
    "role": userData.role,
    "userId": userData.userId,
    "vendorId": event.target.value
}

console.log("updatedData",updatedData)

localStorage.setItem('bcUserData', JSON.stringify(updatedData));
window.location.reload()
  };

  return (
    <div style={{paddingTop:"0%"}}>
      <label>Select Vendor: </label>
      <select value={selectedVendor} onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        {data.map(item => (
          <option key={item.vendorId}  value={item.vendorId}>{item.emailid}</option>
        ))}
      </select>
      {selectedVendor && (
        <div>
          <p>Selected Vendor ID: {selectedVendor}</p>
        </div>
      )}
    </div>
  );
}

export default AllUserList;
