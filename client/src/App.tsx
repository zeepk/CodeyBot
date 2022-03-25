import { useAuth0 } from '@auth0/auth0-react';
import './App.scss';
import './Common/Common.scss';
import CustomNavbar from './Common/CustomNavbar';
import ExistingUser from './Common/ExistingUser';
import LoadingScreen from './Common/LoadingScreen';
import NewUser from './Common/NewUser';

function App() {
	const { isAuthenticated, isLoading } = useAuth0();
	return (
		<div className="App">
			<CustomNavbar />
			{isLoading ? (
				<LoadingScreen />
			) : isAuthenticated ? (
				<ExistingUser />
			) : (
				<NewUser />
			)}
		</div>
	);
}

export default App;
