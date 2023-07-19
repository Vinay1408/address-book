import {AppBar, Box, Typography} from "@mui/material";

function Header() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Typography align={'center'} variant="h2">Address Book</Typography>
        </AppBar>
      </Box>
  )
}
export default Header