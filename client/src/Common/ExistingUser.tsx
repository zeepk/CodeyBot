import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { createProfile, getProfile } from "../ClientServer";
import {
  Profile,
  minUserNameLength,
  maxUserNameLength,
} from "../utils/constants";
import TextField from "@mui/material/TextField";

export default function ExistingUser() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [username, setUsername] = useState<string | null>(null);
  const usernameError =
    username !== null &&
    (username.length < minUserNameLength ||
      username.length > maxUserNameLength);

  useEffect(() => {
    if (user?.sub) {
      getProfile({ authId: user.sub }).then(({ data }) => {
        if (data.success === false) {
          setProfile(null);
        } else {
          setProfile(data.profile);
        }
      });
    }
  }, [user?.sub]);

  const loading = isLoading || profile === undefined;
  if (loading) {
    return <div>Loading.......</div>;
  }

  if (!isAuthenticated || !user?.sub) {
    return <div>Error</div>;
  }

  if (profile === null) {
    return (
      <div className="d-flex flex-column ai-center container--signup">
        <div>
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
      </div>
    );
  }

  return (
    <div>
      <h2>Hey, {user.given_name}!</h2>
    </div>
  );
}
