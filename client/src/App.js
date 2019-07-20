import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
// Get the aws resources configuration parameters
import awsconfig from './aws-exports'; // if you are using Amplify CLI
import Map from './components/map/map.jsx';

Amplify.configure(awsconfig);

function App() {
	return (
		<Container className="App">
			<Router>
				<Route path="/map" exact component={Map} />
			</Router>
		</Container>
	);
}

export default withAuthenticator(App);
