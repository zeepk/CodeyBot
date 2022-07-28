import { Paper } from '@mui/material';

export default function ModalHelpContent() {
    return (
        <div className="help d-flex flex-column ai-center jc-center">
            <Paper
                elevation={3}
                className="d-flex flex-column ai-center jc-between help-container flex-wrap"
            >
                <div className="d-flex flex-row ai-center jc-between">
                    <h3>Branches</h3>
                    <p>
                        Enter a comma separated list of the branches this action
                        should act on. Or leave it blank to run for all
                        branches. Ex. "main, dev"
                    </p>
                </div>
                <div className="d-flex flex-row ai-center jc-between">
                    <h3>Message</h3>
                    <p>
                        The message which should be sent when the action is
                        triggered. Ex. "A new release has been created for this
                        repo!"
                    </p>
                </div>
                <div className="d-flex flex-row ai-center jc-between">
                    <h3>Channel</h3>
                    <p>
                        Paste the channel ID for the Discord channel in which
                        the message should be sent. You can also enter the full
                        channel link, which you can find by right clicking on
                        the desired text channel in Discord and selecting "Copy
                        Link". It should look something like this:
                        "https://discord.com/channels/906334456661561454/933990639178252308"
                    </p>
                </div>
            </Paper>
        </div>
    );
}
