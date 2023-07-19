import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useState} from "react";

function AddressCard(props) {
  const {firstName, lastName, img, phoneNumber, address, title, cell, email, imgBg} = props;
  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
  }

  const closeDialog = () => {
    setOpen(false)
  }
  return (
    <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}   maxWidth={'xl'} alignItems={"center"} justifyContent={"center"} direction={'row'} spacing={2}>
      <Button sx={{justifyContent: 'flex-start', textTransform: 'none'}} fullWidth={true} ripple={false} onClick = {openDialog}>
        <Grid item>
          <img alt={"thumbnail"} src={img}/>
        </Grid>
        <Grid item>
          <Typography variant={'h4'}>{firstName}</Typography>
        </Grid>
        <Grid item>
          <Typography variant={'h4'}>{lastName}</Typography>
        </Grid>
      </Button>
      <Dialog open={open} onClose = {closeDialog}>
        <DialogTitle>
          <Typography textAlign={'center'} variant={'h4'}>{title} {firstName} {lastName}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction={'row'}>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={6} >
              <img width={'150px'} alt={'thumbnailBig'} src={imgBg}/>
            </Grid>
            <Grid item xl={8} lg={8} md={8} sm={8} xs={6}>
              <Typography variant={'h6'}>Address: {address}</Typography>
              <Typography variant={'h6'}>Phone Number: {phoneNumber}</Typography>
              <Typography variant={'h6'}>Cellphone Number: {cell}</Typography>
              <Typography variant={'h6'}>Email: {email}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            <Typography variant={'h6'}>Close</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default AddressCard