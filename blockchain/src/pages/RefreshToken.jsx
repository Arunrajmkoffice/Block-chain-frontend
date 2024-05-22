import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RefreshToken() {
    const navigate = useNavigate();
    const userDataString = localStorage.getItem('bcUserData');
    const userData = JSON.parse(userDataString);
    const refresh = userData?.refreshToken;
    const [refreshToken, setRefreshToken] = useState('');

    const handlerefresh = () => {
        axios({
            method: "POST",
            url: "http://localhost:9096/refresh",
            data: {
                refreshToken: refresh,
            },
        })
            .then((res) => {
                if (res.data.token !== undefined) {
                    localStorage.setItem('bcToken', res.data.token); // Move this line here
                    let updatedUserData = {
                        role: res.data.role,
                        userId: res.data.userId,
                        vendorId: res.data.vendorId,
                        refreshToken: res.data.refreshToken,
                    };
                    localStorage.setItem('bcUserData', JSON.stringify(updatedUserData));
                    setRefreshToken(res.data.refreshToken);
                }
                // Remove or keep the console.log as needed
                console.log("res---", res.data.accessToken);
                console.log("res---", res);
            })
            .catch((err) => {
                console.error('Error:', err);
                // Optionally handle the error state
            });
    };

    return (
        <>
         <Button sx={{ padding: '20%' }} onClick={handlerefresh}>
                Submit
            </Button>
        </>
    );
}

export default RefreshToken;
