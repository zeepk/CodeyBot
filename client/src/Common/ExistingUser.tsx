import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { createProfile, getProfile } from '../ClientServer';
import {
	Profile,
	minUserNameLength,
	maxUserNameLength,
} from '../utils/constants';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dashboard from './Dashboard/Dashboard';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

export default function ExistingUser() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
	const [username, setUsername] = useState<string | undefined>(undefined);
	const usernameError =
		username !== undefined &&
		(username.length < minUserNameLength ||
			username.length > maxUserNameLength);

	useEffect(() => {
		if (user?.sub) {
			getProfile({ authId: user.sub }).then(({ data }) => {
				if (data.success === false) {
					setProfile(null);
				} else {
					setProfile(data.data);
				}
			});
		}
	}, [user?.sub]);

	const handleCreateProfile = () => {
		if (username && !usernameError && user?.sub) {
			setProfile(undefined);
			createProfile({
				username,
				authId: user.sub,
			}).then(({ data }) => {
				setProfile(data.data);
			});
		}
	};

	const loading = isLoading || profile === undefined;
	if (loading) {
		return <LoadingScreen />;
	}

	if (!isAuthenticated || !user?.sub) {
		return <ErrorScreen />;
	}

	if (profile === null) {
		return (
			<div className="d-flex flex-column ai-center container--signup">
				<div className="container--input">
					<h1>Welcome!</h1>
					<div>Just a username, please:</div>
					<TextField
						value={username}
						onChange={(e: any) => setUsername(e.target.value)}
						className="username"
						label="Username"
						variant="outlined"
						error={usernameError}
					/>
					<div className="error">
						{usernameError &&
							`Let's keep it between ${minUserNameLength} and ${maxUserNameLength} characters`}
					</div>
				</div>
				<Button
					disabled={usernameError}
					variant="contained"
					onClick={() => handleCreateProfile()}
				>
					Let's go!
				</Button>
			</div>
		);
	}

	return (
		<div>
			<Dashboard profile={profile} />
		</div>
	);
}
