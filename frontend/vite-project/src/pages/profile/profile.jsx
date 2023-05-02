import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Tab, Tabs } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import jwt_decode from 'jwt-decode';



const fetchUserProfile = async (userId) => {
  const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`);
  const data = await response.json();
  return data;
};


function Profile() {
  const [value, setValue] = React.useState('1');
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    city: '',
    street: '',
    number: '',
    zipcode: '',
    lat: '',
    long: '',
    phone: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      const userId = decoded.user_id;

      fetchUserProfile(userId).then((response) => {
        const data = response.data;
        setUserProfile({
          username: data.username || '',
          email: data.email || '',
          firstname: data.name.firstname || '',
          lastname: data.name.lastname || '',
          city: data.address.city || '',
          street: data.address.street || '',
          number: data.address.number || '',
          zipcode: data.address.zipcode || '',
          lat: data.address.geolocation.lat || '',
          long: data.address.geolocation.long || '',
          phone: data.phone || '',
        });
      });
    }
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const saveUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      const userId = decoded.user_id;
      /* http://127.0.0.1:8000/api/users/update/11 */
      const response = await fetch(`http://127.0.0.1:8000/api/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });
      const data = await response.json();
      console.log('Profile updated:', data);
    }
  };


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 10 }}>
      <Box sx={{ maxWidth: '80%' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 2, borderColor: 'divider', p: 1 }}>
            <Tabs value={value} onChange={handleChange} aria-label="Profile tabs">
              <Tab label="Profile" value="1" />
              {/* <Tab label="Orders" value="2" /> */}
            </Tabs>
          </Box>
          <Box sx={{ minHeight: 300 }}>
            <TabPanel value="1">
              <Box sx={{ width: '100%', margin: '0 auto' }}>


                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Edit Profile
                    </Typography>
                    <TextField
                      label="Username"
                      name="username"
                      value={userProfile.username}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={userProfile.email}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="First Name"
                      name="firstname"
                      value={userProfile.firstname}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Last Name"
                      name="lastname"
                      value={userProfile.lastname}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="City"
                      name="city"
                      value={userProfile.city}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Street"
                      name="street"
                      value={userProfile.street}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Number"
                      name="number"
                      value={userProfile.number}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Zip Code"
                      name="zipcode"
                      value={userProfile.zipcode}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Latitude"
                      name="lat"
                      value={userProfile.lat}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Longitude"
                      name="long"
                      value={userProfile.long}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="phone"
                      name="phone"
                      value={userProfile.phone}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <Button onClick={saveUserProfile} variant="contained" color="primary">
                      Save
                    </Button>
                  </CardContent>
                </Card>
                </Box>
            </TabPanel>
            <TabPanel value="2">
            
{/*               <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Orders
                  </Typography>
                  <TextField
                    label="Field 1"
                    name="field1"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Field 2"
                    name="field2"
                    fullWidth
                    margin="normal"
                  />
                  <Button variant="contained" color="primary">
                    Submit
                  </Button>
                </CardContent>
              </Card> */}
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Profile