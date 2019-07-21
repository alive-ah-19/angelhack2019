import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
// Get the aws resources configuration parameters
import awsconfig from './aws-exports'; // if you are using Amplify CLI
import Routes from './components/routes/routes.jsx';

Amplify.configure(awsconfig);

function App() {
	return (
		<div>
			<Routes />
		</div>
	);
}

export default withAuthenticator(App);
