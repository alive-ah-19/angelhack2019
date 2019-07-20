import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import Grid from '@material-ui/core/Grid';
import Control from './control/control.jsx';

// eslint-disable-next-line no-unused-vars
const MapGL = ReactMapboxGl({
	accessToken: process.env.MAPBOX_PK
});

class Map extends Component {
	render() {
		return (
			<Grid container spacing={0}>
				<Control />
				<Grid item xs={12} sm={12} md={6} lrg={6}>
					Hello
					<Map
						// eslint-disable-next-line react/style-prop-object
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: '50vh',
							width: '50vw'
						}}>
						<Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
							<Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
						</Layer>
					</Map>
				</Grid>
			</Grid>
		);
	}
}
export default Map;
