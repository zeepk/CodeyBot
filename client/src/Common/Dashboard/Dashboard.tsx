import { Profile } from '../../utils/constants';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import { generateWorkflow } from '../../ClientServer';

type Props = {
	profile: Profile;
};

export default function Dashboard({ profile }: Props) {
	const { user } = useAuth0();

	const handleGenerate = () => {
		generateWorkflow({ authId: user?.sub ?? '' }).then(({ data }) => {
			console.log(data);
		});
	};

	return (
		<div className="d-flex flex-column ai-center jc-center">
			<h2>Hey, {profile.username}!</h2>
			<Button variant="contained" onClick={() => handleGenerate()}>
				Generate
			</Button>
		</div>
	);
}
