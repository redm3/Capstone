import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      marginTop="10px"
      padding="40px 0"
      borderTop="1px solid black" // Add a 1px black line above the box
      bgcolor="rgba(128, 128, 128, 0.2)" 
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        {/* Wrap each content block in a Box with flexGrow: 1 */}
        <Box flexGrow={1} maxWidth="clamp(200px, 100%, 400px)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Metro
          </Typography>
          <div>
            Metro is a cutting-edge eCommerce store that offers an unparalleled shopping experience for customers who value quality, variety, and convenience. As a one-stop-shop for all your needs.
          </div>
        </Box>

        <Box flexGrow={1} maxWidth="clamp(200px, 100%, 400px)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        <Box flexGrow={1} maxWidth="clamp(200px, 100%, 400px)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>

        <Box flexGrow={1} maxWidth="clamp(200px, 100%, 400px)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            50 Country Road. Auckland, New Zealand
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: 'break-word' }}>
            Email: Metro@gmail.com
          </Typography>
          <Typography mb="30px">(222)333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
