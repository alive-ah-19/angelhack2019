import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';
import { codes } from 'iso-country-codes';

const useStyles = makeStyles(theme => ({
	panelContainer: {
		width: '100vw'
	},
	summary: {
		display: 'inline-block'
	},
	details: {
		display: 'block'
	},
	groupTextField: {
		display: 'inline-block'
	},
	formControl: {
		marginBottom: theme.spacing(1),
		minWidth: 120
	},
	selectCountry: {
		width: 90
	},
	singleTextField: {
		display: 'block'
	},
	demoButtonsContainer: {
		display: 'flex',
		alignContent: 'flex-end'
	},
	demoButtons: {
		margin: theme.spacing(1)
	}
}));

export default function Control(props) {
	const classes = useStyles();

	const [values, setValues] = React.useState({
		panelExpanded: true,
		startAddress: '',
		numVehicles: '',
		obstaclesCoord: '',
		countryCodes: null,
		numEndAddresses: 1,
		endAddress0: '',
		activeDemoData: null,
		activeDemoIncidents: null
	});

	React.useEffect(() => {
		if (!values.countryCodes) setValues({ ...values, countryCodes: codes });
	}, [values]);
	const handleChange = key => event => {
		// console.log(key);
		setValues({ ...values, [key]: event.target.value });
	};
	const getEndAddresses = () => {
		const endAddresses = [];
		const stateKeys = Object.keys(values);
		stateKeys.forEach(key => {
			if (key.includes('endAddress')) endAddresses.push(values[key]);
		});
		return endAddresses;
	};
	const togglePanel = state => setValues({ ...values, panelExpanded: state });
	const handleSubmit = async event => {
		// submit the things to the server here
		const { startAddress, activeDemoData, activeDemoIncidents } = values;
		const endAddresses = getEndAddresses();
		await props.getStartAddressGeoJson(startAddress);
		await props.getEndAddressesGeoJson(endAddresses);
		props.renderInnerMap(activeDemoData, activeDemoIncidents);
		togglePanel(false);
		event.preventDefault();
	};
	const addNewEndAddress = () => {
		const key = `endAddress${values.numEndAddresses + 1}`;
		setValues({ ...values, numEndAddresses: values.numEndAddresses + 1, [key]: '' });
	};
	const populateDemoOne = () => {
		setValues({
			...values,
			startAddress: 'Av. Camino Real 111 Of. 117 San Isidro 15073',
			numVehicles: '',
			obstaclesCoord: '',
			numEndAddresses: 1,
			endAddress0: 'Calle Coronel Odriozola 237-103 San Isidro',
			activeDemoData: 1
		});
	};
	const populateDemoTwo = version => {
		setValues({
			...values,
			startAddress: 'Av. Camino Real 111 Of. 117 San Isidro 15073',
			numVehicles: 3,
			obstaclesCoord: '',
			numEndAddresses: 5,
			endAddress0: 'Calle Conde de la Monclova 101 San Isidro 15073',
			endAddress1: 'Parque Ernesto Alayza Grundy Calle Mariscal Blas Cerdeña Cdra. 2, San Isidro 15073',
			endAddress2: 'Calle Paul Harris 200-298 San Isidro 15076',
			endAddress3: 'Av Malecón Cercado de Lima 15076',
			endAddress4: 'Jirón Diego Ferre 220 Magdalena del Mar 15086',
			activeDemoData: 2,
			activeDemoIncidents: version === 'b' ? true : false
		});
	};
	return (
		<ExpansionPanel className={classes.panelContainer} defaultExpanded expanded={values.panelExpanded}>
			<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon />}
				onClick={() => togglePanel(!values.panelExpanded)}
				aria-controls="panel1c-content"
				id="panel1c-header">
				<div className={classes.summary}>Viewing routes for {values.numVehicles || '0'} vehicles.</div>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails className={classes.details}>
				<div className={classes.demoButtonsContainer}>
					<Button variant="contained" color="tertiary" type="submit" onClick={populateDemoOne} size="small" className={classes.demoButtons}>
						Get Demo 1 Data
					</Button>
					<Button
						variant="contained"
						color="tertiary"
						type="submit"
						onClick={() => populateDemoTwo('a')}
						size="small"
						className={classes.demoButtons}>
						Get Demo 2a Data
					</Button>
					<Button
						variant="contained"
						color="tertiary"
						type="submit"
						onClick={() => populateDemoTwo('b')}
						size="small"
						className={classes.demoButtons}>
						Get Demo 2b Data
					</Button>
				</div>

				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<div>
						<Typography variant="subtitle2" component="label" htmlFor="startAddress">
							Start Address
						</Typography>
						<TextField
							id="startAddress"
							label="Street, City, State, Zip Code"
							value={values.startAddress}
							onChange={handleChange('startAddress')}
							margin="dense"
							fullWidth
						/>
					</div>
					<div>
						<Typography variant="subtitle2" component="label" htmlFor="numVehicles">
							Number of Available Vehicles
						</Typography>
						<TextField
							id="numVehicles"
							className={classes.singleTextField}
							value={values.numVehicles}
							onChange={handleChange('numVehicles')}
							margin="dense"
						/>
					</div>
					<div>
						<div>
							<Typography variant="subtitle2" component="label" htmlFor="endAddress">
								End Addresses
							</Typography>
							<IconButton key="addEndAddress" aria-label="Add An End Address" color="inherit" onClick={addNewEndAddress}>
								<Add />
							</IconButton>
						</div>
						{[...Array(values.numEndAddresses)].map((obj, i) => {
							const key = `endAddress${i}`;
							return (
								<TextField
									id={`endAddress-${i}`}
									key={`endAddress-${i}`}
									label="Street, City, State, Zip Code"
									value={values[key]}
									onChange={handleChange(key)}
									margin="dense"
									fullWidth
								/>
							);
						})}
					</div>
					<div>
						<Typography variant="subtitle2" component="label" htmlFor="obstaclesCoord">
							<Check /> <span>Obstacles Uploaded</span>
						</Typography>
						{/* <TextField
							id="obstaclesCoord"
							className={classes.singleTextField}
							value={values.obstaclesCoord}
							onChange={handleChange('obstaclesCoord')}
							margin="dense"
							multiline
							rows="6"
						/> */}
					</div>
				</form>
			</ExpansionPanelDetails>
			<Divider />
			<ExpansionPanelActions>
				<Button size="small">Cancel</Button>
				<Button variant="contained" color="primary" type="submit" onClick={handleSubmit} size="small">
					Update Routes
				</Button>
			</ExpansionPanelActions>
		</ExpansionPanel>
	);
}
