import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Control from './control/control.jsx';
import { forwardGeocode } from '../../utilities/mapbox.js';
import { getAliveGeoJson } from '../../utilities/alive.js';

// eslint-disable-next-line no-unused-vars
const MapGL = ReactMapboxGl({
	accessToken: 'pk.eyJ1IjoibWFqZXNzdGljOCIsImEiOiJjanZ1NHJ4MzAwanoxNGJwMWM0MXZvODV6In0.yV5e_tj1bYPyQGnbJmMKBw'
});
const circleLayout = (MapboxGL.CircleLayout = { visibility: 'visible' });
const circlePaint = (MapboxGL.CirclePaint = {
	'circle-color': 'black'
});

const linePaint = (MapboxGL.LinePaint = { 'line-color': ['get', 'color'] });

class Map extends Component {
	state = {
		startAddressGeoJSON: '',
		startAddressGeoJSONError: '',
		snackbarOpen: false,
		routesGeoJson: {},
		stepsGeoJson: {},
		fitBounds: []
	};
	getStartAddressGeoJson = async address => {
		try {
			if (this.state.startAddressLatLongError) this.setState({ startAddressLatLongError: '' });
			const response = await forwardGeocode(address);
			if (response && response.status === 200) {
				const { data } = response;
				if (data) {
					// set the latlong of the highest relevance feature returned from MapBox's forward geocode API
					this.setState({ startAddressGeoJSON: data }, () => console.log(this.state.startAddressGeoJSON));
				}
			} else {
				this.setState({ startAddressGeoJSON: '', startAddressGeoJSONError: 'Invalid start address.' }, () =>
					console.log(this.state.startAddressGeoJSON)
				);
			}
		} catch (e) {
			this.setState({
				snackbarOpen: true,
				startAddressGeoJSONError: 'Invalid start address.'
			});
		}
	};
	getEndAddressesGeoJson = async (...addresses) => {
		try {
			if (this.state.startAddressLatLongError) this.setState({ startAddressLatLongError: '' });
			const endAddressesGeoJSONs = [];
			await addresses.forEach(async address => {
				const response = await forwardGeocode(address);
				if (response && response.status === 200) {
					const { data } = response;
					if (data) endAddressesGeoJSONs.push(data);
				}
			});
			this.setState({ endAddressesGeoJSONs: endAddressesGeoJSONs });
		} catch (e) {
			// there was an error
		}
	};

	closeSnackbar = () => this.setState({ snackbarOpen: false });

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.closeSnackbar();
	};

	renderInnerMap = demoNum => {
		const rawMockData = getAliveGeoJson(demoNum);
		const routesGeoJson = {
			type: 'geojson',
			data: rawMockData.routes
		};
		const stepsGeoJson = {
			type: 'geojson',
			data: rawMockData.steps
		};
		this.setState({ routesGeoJson: routesGeoJson, stepsGeoJson: stepsGeoJson });
	};

	render() {
		return (
			<Grid container spacing={0}>
				<Grid item>
					<Control
						getStartAddressGeoJson={this.getStartAddressGeoJson}
						getEndAddressesGeoJson={this.getEndAddressesGeoJson}
						startAddressLatLongError={this.state.startAddressLatLongError}
						renderInnerMap={this.renderInnerMap}
					/>
				</Grid>
				<Grid item>
					<div style={{ marginTop: '16px' }}>
						<MapGL
							// eslint-disable-next-line react/style-prop-object
							style="mapbox://styles/mapbox/streets-v9"
							containerStyle={{
								height: '85vh',
								width: '100vw'
							}}
							center={[-76.98834, -12.157583]}
							fitBounds={Array.isArray(this.state.fitBounds) && this.state.fitBounds.length ? this.state.fitBounds : null}
							zoom={[12]}>
							{this.state.stepsGeoJson && this.state.stepsGeoJson.data && (
								<Layer type="circle" paint={circlePaint} layout={circleLayout} geoJSONSourceOptions={this.state.stepsGeoJson}>
									{this.state.stepsGeoJson.data.features.map(feature => (
										<Feature
											coordinates={feature.geometry.coordinates}
											properties={feature.properties}
											key={`feature-${feature.geometry.coordinates}`}
										/>
									))}
								</Layer>
							)}
							{this.state.routesGeoJson && this.state.routesGeoJson.data && (
								<Layer type="line" paint={linePaint} geoJSONSourceOptions={this.state.routesGeoJson}>
									{this.state.routesGeoJson.data.features.map(feature => {
										console.log(feature);
										return (
											<Feature
												coordinates={feature.geometry.coordinates}
												properties={feature.properties}
												paint={linePaint}
												key={`feature-${feature.geometry.coordinates}`}
											/>
										);
									})}
								</Layer>
							)}
						</MapGL>
					</div>
				</Grid>
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center'
					}}
					open={this.state.snackbarOpen}
					autoHideDuration={6000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{this.state.startAddressLatLongError}</span>}
					action={[
						<IconButton key="close" aria-label="Close" color="inherit" onClick={this.closeSnackbar}>
							<Close />
						</IconButton>
					]}
				/>
			</Grid>
		);
	}
}
export default Map;
