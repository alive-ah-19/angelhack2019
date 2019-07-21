// import axios from 'axios';
import mockDemo1 from './mock-demo1.js';
import mockDemo2 from './mock-demo2.js';

export const getAliveGeoJson = demoNum => {
	// return JSON.parse(mockResponse);
	if (demoNum === 1) return mockDemo1;
	if (demoNum === 2) return mockDemo2;
};
