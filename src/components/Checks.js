import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[100],
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);


export default function CustomizedSwitches() {
  const [weekCheck, setWeekCheck] = React.useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });

  const handleChange = (event) => {
    setWeekCheck({ ...weekCheck, [event.target.name]: event.target.checked });
  };

  return (
    <FormControl component="fieldset">
    <FormGroup>
      <Typography component="div">
     
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>
            <PurpleSwitch checked={weekCheck.monday} onChange={handleChange} name="monday" />
          </Grid>
          <Grid item>Lunes</Grid>
        </Grid>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>
            <PurpleSwitch checked={weekCheck.tuesday} onChange={handleChange} name="tuesday" />
          </Grid>
          <Grid item>Martes</Grid>
        </Grid>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>
            <PurpleSwitch checked={weekCheck.wednesday} onChange={handleChange} name="wednesday" />
          </Grid>
          <Grid item>Miércoles</Grid>
        </Grid>
      </Typography>
    </FormGroup>
    </FormControl>
  );
}

// export default function SwitchesGroup() {
//     const [state, setState] = React.useState({
//       gilad: true,
//       jason: false,
//       antoine: true,
//     });
  
//     const handleChange = (event) => {
//       setState({ ...state, [event.target.name]: event.target.checked });
//     };
  
//     return (
//       <FormControl component="fieldset">
//         <FormLabel component="legend">Assign responsibility</FormLabel>
//         <FormGroup>
//           <FormControlLabel
//             control={<Switch checked={state.gilad} onChange={handleChange} name="gilad" />}
//             label="Gilad Gray"
//           />
//           <FormControlLabel
//             control={<Switch checked={state.jason} onChange={handleChange} name="jason" />}
//             label="Jason Killian"
//           />
//           <FormControlLabel
//             control={<Switch checked={state.antoine} onChange={handleChange} name="antoine" />}
//             label="Antoine Llorca"
//           />
//         </FormGroup>
//         <FormHelperText>Be careful</FormHelperText>
//       </FormControl>
//     );
//   }