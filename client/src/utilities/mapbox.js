import axios from 'axios';

const mbGeocodeURIBase = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const formatPlaceStr = place => {
	if (!place) return null;
	let placeStr = [];
	const pushAndFormat = obj => obj && placeStr.push(obj.split(', ').join('%20'));
	place.forEach(param => {
		if (param) pushAndFormat(param);
	});
	return placeStr.join('%20');
};

export const forwardGeocode = place => {
	return axios.get(mbGeocodeURIBase + formatPlaceStr(place) + '.json?access_token=' + process.env.REACT_APP_MAPBOX_PK);
};
