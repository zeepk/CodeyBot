import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated || !user) {
		return <div>You are not logged in.</div>;
	}

	return (
		<div>
			<img src={user.picture} alt={user.name} />
			<h2>{user.name}</h2>
		</div>
	);
}
