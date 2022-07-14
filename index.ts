import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';
var bodyParser = require('body-parser');
import { profileRouter } from './src/routes/profiles';
import { workflowRouter } from './src/routes/workflows';
import Discord, { TextChannel } from 'discord.js';
dotenv.config();

const connectionString = process.env.MONGO_DB_CONN_STRING;
if (connectionString) {
    mongoose.connect(connectionString);
}

const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    },
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
});

client.on('ready', () => {
    console.log('CodeyBot running...');
});

client.login(process.env.BOT_TOKEN);

// this listens for a message, usefull for !commands

// client.on('messageCreate', async (message) => {
// 	const content = message.content;
// 	if (!content) {
// 		return;
// 	}
// 	const response = await getResponse(content);
// 	if (response) {
// 		message.channel.send(response);
// 	}
// 	// if (content === 'test') {
// 	// }
// 	// if (content === '!commands') {
// 	// 	message.channel.send(commands.commands);
// 	// }

// 	// if (content.indexOf('!villager ') === 0) {
// 	// 	const searchTerm = content.split('!villager ')[1];
// 	// 	message.channel.send(constants.nookipediaUrlPrefix + searchTerm);
// 	// }
// });
const app = express();

const allowedOrigins = [process.env.REACT_APP_BASE_URL, process.env.API_URL];

const getCORSOrigin = (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
    } else {
        callback(new Error(`Origin "${origin}" is not allowed by CORS`));
    }
};

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(json());
app.use(cors({ origin: getCORSOrigin, credentials: true }));

app.use(profileRouter);
app.use(workflowRouter);

app.get('/api/test', (req, res) => {
    res.send('ok');
});

app.post('/api/send', (req, res) => {
    const { channelId, secret, authId, message } = req.body;
    console.log(channelId, secret, message);
    if (!client || !client.channels || !client.channels.cache) {
        const errorMessage = 'Error reading client channels';
        console.error(errorMessage);
        res.status(500).send(errorMessage);
        return;
    }

    const channel = client.channels.cache.get(channelId) as TextChannel;
    if (!channel) {
        const errorMessage = `Error retrieving channel with id: ${channelId}`;
        console.error(errorMessage);
        res.status(500).send(errorMessage);
        return;
    }

    channel.send(message);
    res.send('success');
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('The application is listening on port 8080!');
});
