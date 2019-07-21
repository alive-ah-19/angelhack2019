// import axios from 'axios';
import mockDemo1 from './mock-demo1.js';
import mockDemo2a from './mock-demo2a.js';
import mockDemo2b from './mock-demo2b.js';

export const getAliveGeoJson = (demoNum, incidents = false) => {
	// return JSON.parse(mockResponse);
	console.log(demoNum, incidents, demoNum == '2' && incidents == false, 'getAliveGeoJson');
	if (demoNum == '1') return mockDemo1;
	if (demoNum == '2' && !incidents) return mockDemo2a;
	if (demoNum == '2' && incidents == true) return mockDemo2b;
};
