import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Logo from '../Assets/images/logo.png';
import DiscordLogo from '../Assets/images/discord.png';
import { useNavigate } from 'react-router-dom';
export default function CustomNavbar() {
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    let navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar className="toolbar">
                <div className="d-flex ai-center">
                    <div
                        className="d-flex ai-center home"
                        onClick={() => navigate('/')}
                    >
                        <img src={Logo} alt="CodeyBot" className="logo" />
                        <h1>Codey</h1>
                        <Button
                            className="add-button"
                            variant="contained"
                            onClick={() =>
                                window.open(
                                    'https://discord.com/api/oauth2/authorize?client_id=938649708308623412&permissions=18432&scope=bot',
                                    '_blank'
                                )
                            }
                        >
                            Add me to your server!
                            <img
                                src={DiscordLogo}
                                alt="Discord"
                                className="discord-logo"
                            />
                        </Button>
                    </div>
                </div>
                {isAuthenticated ? (
                    <div className="d-flex">
                        <img
                            src={user?.picture}
                            alt="user"
                            className="circle"
                        />
                        <Button color="inherit" onClick={() => logout()}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button color="inherit" onClick={() => loginWithRedirect()}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
