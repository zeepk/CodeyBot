import { useAuth0 } from '@auth0/auth0-react';
import './App.scss';
import './Common/Common.scss';
import CustomNavbar from './Common/CustomNavbar';
import ExistingUser from './Common/ExistingUser';
import LoadingScreen from './Common/LoadingScreen';
import NewUser from './Common/NewUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    const { isLoading, isAuthenticated } = useAuth0();
    return (
        <div className="App">
            <BrowserRouter>
                <CustomNavbar />
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isAuthenticated ? <ExistingUser /> : <NewUser />
                            }
                        ></Route>
                    </Routes>
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
