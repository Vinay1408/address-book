import Grid from "@mui/material/Unstable_Grid2";
import AddressCard from "./AddressCard";
import {useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";

function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAddresses([])
    fetchAddresses();
  }, [])

  const fetchAddresses = () => {
    setLoading(true);
    fetch('https://randomuser.me/api/?results=50')
        .then(res => res.json())
        .then(data => {
          setAddresses(prevAddresses => [...prevAddresses, ...data.results]);
          setLoading(false);
        });
  };

  const handleLoadMore = () => {
    fetchAddresses();
  };

  return (
    <Grid container alignItems={'flex-start'} direction={'column'} maxWidth={'xl'}>
      {addresses.map(address => {
        return (
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} container maxWidth={'xl'} data-testid="address-card">
            <AddressCard
                title = {address.name.title}
                firstName={address.name.first}
                lastName={address.name.last}
                img={address.picture.thumbnail}
                phoneNumber={address.phone}
                cell={address.cell}
                address = {address.location.street.number + " " + address.location.street.name+ ", " + address.location.city + " " + address.location.state + ", " + address.location.country}
                email = {address.email}
                imgBg={address.picture.large}
            />
          </Grid>
        )
      })}
      {loading ? (
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} container justifyContent="center" sx={{paddingTop: '20px', paddingBottom: '20px'}}>
            <Button disableRipple={true}><Typography variant={'h6'} textAlign={true}>Loading...</Typography></Button>
          </Grid>
      ) : (
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} container justifyContent="center" sx={{paddingTop: '20px', paddingBottom: '20px'}}>
            <Button disableRipple={true} onClick={handleLoadMore} ><Typography variant={'h6'}>Load More</Typography></Button>
          </Grid>
      )}
    </Grid>
  );
}

export default AddressPage