import { Profile } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import WorkflowGenerator from "./WorkflowGenerator";

type Props = {
  profile: Profile;
};

export default function Dashboard({ profile }: Props) {
  const { user } = useAuth0();
  const authId = user?.sub;

  if (!authId) {
    return <h1>Error pulling auth id from Auth0</h1>;
  }

  return (
    <div className="d-flex flex-column ai-center jc-center">
      <h2>Hey, {profile.username}!</h2>
      <WorkflowGenerator authId={authId} />
    </div>
  );
}
