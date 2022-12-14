
import Grid from "@mui/material/Grid";
import * as React from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Fab, TextField, MenuItem, Select,FormControl,InputLabel } from "@mui/material";
import MDSnackbar from "../../components/MDSnackbar";


function Dashboard() {

  const [userName, setUserName] = React.useState("");
  const [preference, setPreference] = React.useState("");
  const [consultantName, setConsultantName] = React.useState("");
  const [type, setType] = React.useState("");
  const [speciality, setSpeciality] = React.useState("");
  const [rate, setRate] = React.useState(0);

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    color: "success",
  });

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePreferenceChange = (event) => {
    setPreference(event.target.value);
  };
  const handleConsultantNameChange = (event) => {
    setConsultantName(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleSpecialityChange = (event) => {
    setSpeciality(event.target.value);
  };
  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handleCreateUser = async () => {
    const user = {
      name: userName,
      specialityPreference: preference,
    }

    console.log(JSON.stringify(user));

    fetch("http://localhost:9000/customer-management-service/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(user),

    })
      .then(res => res.json())
      .then(body => {
        console.log(body);

        setSnackbar({
          open: true,
          message: `User ${body["uuid"]} Creation Successfully`,
          color: "success",
        });
      }
      )
      .catch(err => {
        setSnackbar({
          open: true,
          message: `User ${err} Creation Failed`,
          color: "error",
        });
      }
      );


  };


  const handleCreateConsultant = async () => {
    const consultant = {
      value: {
        uuid: null,
        name: consultantName,
        type: type,
        speciality: speciality,
        rate: rate,
      }
    }

    console.log(JSON.stringify(consultant));

    fetch("http://localhost:9000/resource-management-service/new_consultant", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(consultant),

    })
      .then(res => res.json())
      .then(body => {
        console.log(body);

        setSnackbar({
          open: true,
          message: `Consultant ${body["consultantId"]} Creation Successfully`,
          color: "success",
        });
      })
      .catch(err => {
        setSnackbar({
          open: true,
          message: `Consultant ${err} Creation Failed`,
          color: "error",
        });
      });
  };





  return (
    <DashboardLayout>
      <MDSnackbar
        open={snackbar.open}
        title={snackbar.message}
        color={snackbar.color}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    
      <MDBox py={3}>
        CREATE USER
        <Grid container spacing={3} direction={'column'} sx={{ marginBottom: '5%' }}>
          <Grid item xs={12} md={6}>

            <TextField label=" Name" variant="outlined" fullWidth value={userName} onChange={(e) => handleUserNameChange(e)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Preference" variant="outlined" fullWidth value={preference} onChange={(e) => handlePreferenceChange(e)} />
          </Grid>
          <Fab
            onClick={handleCreateUser}
            variant="extended"
            sx={
              {
                color: "#fff",
                width: 300,
                height: 35,
                borderRadius: 2,
                alignSelf: "center",
                marginTop: "5%",
                fontSize: "1rem",
                backgroundColor: "#000",
                transition: 'all 0.3s ease-in-out',
                ": hover": {
                  backgroundColor: "#FFF",
                  color: "#000",
                  border: "1px solid black",
                  transform: 'scale(1.05)'
                },
              }

            }

          >
            Submit
          </Fab>
        </Grid>
        CREATE CONSULTANT
        <Grid container spacing={3} direction={'column'} sx={{ marginBottom: '5%' }}>

          <Grid item xs={12} md={6}>

            <TextField label=" Name" variant="outlined" fullWidth value={consultantName} onChange={(e) => handleConsultantNameChange(e)} />
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={(e) => handleTypeChange(e)}
          style={{ height: 45 }}
        >
          <MenuItem value={'Senior'}>Senior</MenuItem>
          <MenuItem value={'Executive'}>Executive</MenuItem>
          <MenuItem value={'Junior'}>Junior</MenuItem>
        </Select>
      </FormControl>

          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Speciality" variant="outlined" fullWidth value={speciality} onChange={(e) => handleSpecialityChange(e)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Rate" variant="outlined" fullWidth type={'number'} value={rate} onChange={(e) => handleRateChange(e)} />
          </Grid>
          <Fab
            onClick={handleCreateConsultant}
            variant="extended"
            sx={
              {
                color: "#fff",
                width: 300,
                height: 35,
                borderRadius: 2,
                alignSelf: "center",
                marginTop: "5%",
                fontSize: "1rem",
                backgroundColor: "#000",
                transition: 'all 0.3s ease-in-out',
                ": hover": {
                  backgroundColor: "#FFF",
                  color: "#000",
                  border: "1px solid black",
                  transform: 'scale(1.05)'
                },
              }

            }

          >
            Submit
          </Fab>
        </Grid>
       
      </MDBox>

    </DashboardLayout>
  );
}

export default Dashboard;
