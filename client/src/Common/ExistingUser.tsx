import { useAuth0 } from '@auth0/auth0-react';

export default function ExistingUser() {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading || !isAuthenticated || !user) {
		return <div>Error</div>;
	}

	return (
		<div>
			<h2>Hi, {user.given_name}!</h2>
		</div>
	);
}
