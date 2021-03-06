import express, { Request, Response } from 'express';
import { Profile } from '../models/profile';
import { ApiResponse } from '../utils/customTypes';
import { randomUUID } from 'crypto';
import { getChannelId } from '../utils/helperFunctions';
const router = express.Router();

router.post('/api/workflows/generate', async (req: Request, res: Response) => {
    const { authId, options } = req.body;
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
    const secret = profile.githubSecret;

    let workflow = `# generated with <3 by CodeyBot
name: Discord Log Messages

`;

    if (options.includePushes) {
        const channelId = getChannelId(options.pushChannel);
        const branches =
            options.pushBranches?.length === 0 ? '"*"' : options.pushBranches;
        workflow += `
on:
  push:
      branches: [${branches}]

jobs:
  discord-message:
    runs-on: ubuntu-latest
    steps:
      - name: Send Push Message
        uses: JamesIves/fetch-api-data-action@v2.1.0
        with:
          endpoint: https://codey-bot.herokuapp.com/api/send
          configuration: '{ "method": "POST", "headers": {"Content-Type": "application/json"}, "body": {"channelId": "${channelId}", "message": "${options.pushMessage}", "secret": "\${{ secrets.CODEYBOT_TOKEN }}"} }'
    `;
    }

    resp.data = {
        secret,
        workflow,
    };
    return res.status(200).send(resp);
});

export { router as workflowRouter };
