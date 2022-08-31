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

    const workflows: string[] = [];

    if (options.includePushes) {
        const channelId = getChannelId(options.pushChannel);
        const branches =
            options.pushBranches?.length === 0 ? '"*"' : options.pushBranches;
        workflows.push(`# generated with <3 by CodeyBot
name: Log Pushes in Discord

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
          endpoint: https://codey-bot.herokuapp.com/api/workflows/send
          configuration: '{ "method": "POST", "headers": {"Content-Type": "application/json"}, "body": {"channelId": "${channelId}", "message": "${options.pushMessage}", "authId": "${authId}", "secret": "\${{ secrets.CODEYBOT_TOKEN }}"} }'
    `);
    }

    if (options.includeRelease) {
        const channelId = getChannelId(options.releaseChannel);
        workflows.push(`# generated with <3 by CodeyBot
name: Log Releases in Discord

on:
  release:
      types: [published]

jobs:
  discord-message:
    runs-on: ubuntu-latest
    steps:
      - name: Send Release Message
        uses: JamesIves/fetch-api-data-action@v2.1.0
        with:
          endpoint: https://codey-bot.herokuapp.com/api/workflows/send
          configuration: '{ "method": "POST", "headers": {"Content-Type": "application/json"}, "body": {"channelId": "${channelId}", "message": "${options.releaseMessage}", "authId": "${authId}", "secret": "\${{ secrets.CODEYBOT_TOKEN }}"} }'
    `);
    }

    resp.data = {
        secret,
        workflows,
    };
    return res.status(200).send(resp);
});

export { router as workflowRouter };
