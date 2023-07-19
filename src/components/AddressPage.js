import Grid from "@mui/material/Unstable_Grid2";
import AddressCard from "./AddressCard";
import {useEffect, useState} from "react";
import axios from "axios";

function AddressPage() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    console.log("IM HERE")
    setAddresses([])
    axios.get('https://randomuser.me/api/?results=50').then((res) => {
      setAddresses((prevAddresses) => [...prevAddresses, ...res.data.results]);
    });
  }, [])
  return (
    <Grid container alignItems={'flex-start'} direction={'column'} maxWidth={'xl'}>
      {addresses.map(address => {
        return (
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} container maxWidth={'xl'}>
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
    </Grid>
  );
}

export default AddressPage