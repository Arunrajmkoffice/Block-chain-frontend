import axios from 'axios';
import React, { useState, useEffect } from 'react';
function AllUserList() {
  const token = localStorage.getItem('bcToken')
  let userData = JSON.parse(localStorage.getItem('bcUserData'));
  const [selectedVendor, setSelectedVendor] = useState({});
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: "http://localhost:9096/vendor",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setVendors(res.data.vendor)
        console.log("vendor-------", res)
      })
      .catch((err) => { })
  }, [])
  const handleSelect = (event) => {


    // setSelectedVendor(event.target.value)

    let updatedData = {
      "role": userData.role,
      "userId": userData.userId,
      "vendorId": event.target.value
    }

    console.log("updatedData", updatedData)

    localStorage.setItem('bcUserData', JSON.stringify(updatedData));
    window.location.reload()
  }
  // State to keep track of the selected vendor

  // Function to handle dropdown change


  return (
    <div style={{ paddingTop: "0%" }}>
      <label>Select Vendor: </label>
      <select onChange={handleSelect}>
        <option value="">Select an option</option>
        {vendors?.map(item => (
          <option key={item.vendorId} value={item.vendorId}>{item.email}</option>
        ))}
      </select>

    </div>
  );
}

export default AllUserList;
