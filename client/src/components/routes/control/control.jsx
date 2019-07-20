import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		display: 'block'
	},
	textField: {
		display: 'block'
	},
	updateBtn: {
		marginTop: theme.spacing(3)
	}
}));

export default function Control() {
	const classes = useStyles();

	const [values, setValues] = React.useState({
		startAddress: {
			vehicleName: '',
			street: '',
			city: '',
			state: '',
			zipCode: '',
			country: ''
		},
		numVehicles: '',
		obstaclesCoord: ''
	});

	const handleChange = (outer, inner) => event => {
		if (outer && inner) setValues({ ...values, [outer]: { [inner]: event.target.value } });
	};

	return (
		<Grid item xs={12} sm={12} md={6} lrg={6}>
			<Paper className={classes.paper}>
				<Typography variant="h5">Enter Fleet Start Address</Typography>
				<form noValidate autoComplete="off">
					<TextField
						id="standard-name"
						label="Street"
						className={classes.textField}
						value={values.startAddress.street}
						onChange={e => handleChange('startAddress', 'street')}
						margin="normal"
					/>
					<TextField
						id="standard-name"
						label="City"
						className={classes.textField}
						value={values.startAddress.city}
						onChange={e => handleChange('startAddress', 'city')}
						margin="normal"
					/>
					<TextField
						id="standard-name"
						label="State"
						className={classes.textField}
						value={values.startAddress.state}
						onChange={e => handleChange('startAddress', 'state')}
						margin="normal"
					/>
					<TextField
						id="standard-name"
						label="Zip Code"
						className={classes.textField}
						value={values.startAddress.zipCode}
						onChange={e => handleChange('startAddress', 'zipCode')}
						margin="normal"
					/>
					<TextField
						id="standard-name"
						label="Country"
						className={classes.textField}
						value={values.startAddress.country}
						onChange={e => handleChange('startAddress', 'country')}
						margin="normal"
					/>
					<TextField
						id="standard-name"
						label="Number of Vehicles"
						className={classes.textField}
						value={values.numVehicles}
						onChange={e => handleChange('numVehicles')}
						margin="normal"
					/>
					<TextField
						id="standard-name"
						label="Obstacles Coordinates"
						className={classes.textField}
						value={values.obstaclesCoord}
						onChange={e => handleChange('obstaclesCoord')}
						margin="normal"
						multiline
						rows="6"
					/>
				</form>
				<Button variant="contained" color="primary" type="submit" className={classes.updateBtn}>
					Update Routes
				</Button>
			</Paper>
		</Grid>
	);
}
