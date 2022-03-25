import { CircularProgress } from '@mui/material';

export default function LoadingScreen() {
	return (
		<div className="loading-screen d-flex ai-center jc-center">
			<CircularProgress size={'5rem'} />
		</div>
	);
}
