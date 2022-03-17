import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Logo from '../Assets/images/logo.png';
export default function CustomNavbar() {
	const { loginWithRedirect } = useAuth0();
	return (
		<AppBar position="static">
			<Toolbar className="toolbar">
				<img src={Logo} alt="CodeyBot" />
				<Button color="inherit" onClick={() => loginWithRedirect()}>
					Login
				</Button>
			</Toolbar>
		</AppBar>
	);
}
