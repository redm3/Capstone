import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import jwt_decode from 'jwt-decode';

/* // Function to fetch user data by user ID (you need to implement this)
const fetchUserDataById = async (userId) => {
  // Fetch user data from your API or database by user ID
  // This is just a placeholder, replace it with your actual implementation
  const userData = {
    id: userId,
    name: {
      firstname: "John",
      lastname: "Doe"
    },
    address: {
      street: "123 Main St",
      number: "Apt 4B",
      city: "New York",
      zipcode: "10001"
    }
  };
  return userData;
}; */
const fetchUserDataById = async (userId) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }

    const userData = await response.json();
    // Make sure the userData object is in the correct format
    // You might need to adjust the object structure based on your API response
    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function AddressForm() {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      const userId = decoded.user_id;

      fetchUserDataById(userId).then((data) => {
        setUserData(data);
      });
    }
  }, []);

  React.useEffect(() => {
    console.log(userData); // Log the userData
  }, [userData]);
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={userData?.data?.name?.firstname || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={userData?.data?.name?.lastname || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={userData?.data?.address?.number || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={userData?.data?.address?.street || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={userData?.data?.address?.city || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={userData?.data?.address?.zipcode || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}