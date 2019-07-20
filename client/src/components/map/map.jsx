import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));
const classes = useStyles();

class Map extends Component {
	state = {
		startAddress: {
			street: '',
			city: ''
		}
	};
	render() {
		return (
			<Grid container spacing={0}>
				<Grid item xs={12} sm={12} md={6} lrg={6}>
					<Paper className={classes.paper}>
						<form noValidate autoComplete="off">
							<TextField
								id="standard-name"
								label="Name"
								className={classes.textField}
								value={this.state.name}
								// onChange={handleChange('name')}
								margin="normal"
							/>
						</form>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={12} md={6} lrg={6}>
					{/* MAP GOES HERE */}
				</Grid>
			</Grid>
		);
	}
}
export default Map;
