import express, { Request, Response } from 'express';
import { Profile } from '../models/profile';
import { ApiResponse } from '../utils/customTypes';
import { randomUUID } from 'crypto';
const router = express.Router();

router.post('/api/workflows/generate', async (req: Request, res: Response) => {
	const { authId } = req.body;
	const resp: ApiResponse = {
		success: true,
		message: '',
	};

	if (!authId) {
		const message = 'AuthID not correctly provided';
		resp.message = message;
		console.error(message);
		return res.status(500).send(resp);
	}

	const profile = await Profile.findOne({ authId: authId });
	if (!profile) {
		// not logged in
		const message = 'Profile not created yet';
		resp.message = message;
		console.error(message);
		return res.status(404).send(resp);
	}

	if (!profile.githubSecret) {
		// generate a uuid
		const uuid = randomUUID();
		profile.githubSecret = uuid;
		await profile.save();
	}

	resp.data = {
		profile,
	};
	return res.status(200).send(resp);
});

export { router as workflowRouter };
