import {
    Button,
    Checkbox,
    FormControlLabel,
    Paper,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { defaultOptions, WorkflowOptions } from '../../utils/constants';

type Props = {
    generateWorkflow: (data: WorkflowOptions) => void;
    initialOptions?: WorkflowOptions;
};

export default function WorkflowConfig({
    generateWorkflow,
    initialOptions,
}: Props) {
    const [options, setOptions] = useState<WorkflowOptions>(
        initialOptions ?? defaultOptions
    );

    // validation
    const pushMessageInvalid = options.includePushes && !options.pushMessage;
    const pushChannelInvalid =
        options.includePushes &&
        (!options.pushChannel || options.pushChannel.length < 18);
    const releaseMessageInvalid =
        options.includeRelease && !options.releaseMessage;
    const releaseChannelInvalid =
        options.includeRelease &&
        (!options.releaseChannel || options.releaseChannel.length < 18);

    const noOptionsChecked = !(options.includePushes || options.includeRelease);

    const formInvalid = [
        noOptionsChecked,
        pushMessageInvalid,
        pushChannelInvalid,
        releaseMessageInvalid,
        releaseChannelInvalid,
    ].some(i => i);

    return (
        <div className="d-flex flex-column ai-center jc-between config">
            <Button
                variant="contained"
                disabled={formInvalid}
                onClick={() => generateWorkflow(options)}
            >
                Generate
            </Button>
            <Button
                className="reset"
                variant="contained"
                color="warning"
                onClick={() => setOptions(defaultOptions)}
            >
                Reset
            </Button>
            <Paper
                elevation={3}
                className="d-flex flex-column ai-start jc-start checkbox-container flex-wrap"
            >
                <div className="config-option d-flex flex-row ai-center jc-between">
                    <FormControlLabel
                        label="Include Pushes"
                        control={
                            <Checkbox
                                checked={options.includePushes}
                                onChange={(e: any) =>
                                    setOptions({
                                        ...options,
                                        includePushes: e.target.checked,
                                    })
                                }
                            />
                        }
                    />
                    <div className="d-flex flex-row ai-center jc-end">
                        <TextField
                            id="outlined-required"
                            label="Branches"
                            color="primary"
                            disabled={!options.includePushes}
                            value={options.pushBranches}
                            onChange={(e: any) =>
                                setOptions({
                                    ...options,
                                    pushBranches: e.target.value,
                                })
                            }
                        />
                        <TextField
                            id="outlined-required"
                            label="Message"
                            color="primary"
                            disabled={!options.includePushes}
                            value={options.pushMessage}
                            error={pushMessageInvalid}
                            onChange={(e: any) =>
                                setOptions({
                                    ...options,
                                    pushMessage: e.target.value,
                                })
                            }
                        />
                        <TextField
                            id="outlined-required"
                            label="Channel"
                            color="primary"
                            disabled={!options.includePushes}
                            value={options.pushChannel}
                            error={pushChannelInvalid}
                            onChange={(e: any) =>
                                setOptions({
                                    ...options,
                                    pushChannel: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="config-option d-flex flex-row ai-center jc-between">
                    <FormControlLabel
                        label="Include Releases"
                        control={
                            <Checkbox
                                checked={options.includeRelease}
                                onChange={(e: any) =>
                                    setOptions({
                                        ...options,
                                        includeRelease: e.target.checked,
                                    })
                                }
                            />
                        }
                    />
                    <div className="d-flex flex-row ai-center jc-end">
                        <TextField
                            id="outlined-required"
                            label="Message"
                            color="primary"
                            disabled={!options.includeRelease}
                            value={options.releaseMessage}
                            error={releaseMessageInvalid}
                            onChange={(e: any) =>
                                setOptions({
                                    ...options,
                                    releaseMessage: e.target.value,
                                })
                            }
                        />
                        <TextField
                            id="outlined-required"
                            label="Channel"
                            color="primary"
                            disabled={!options.includeRelease}
                            value={options.releaseChannel}
                            error={releaseChannelInvalid}
                            onChange={(e: any) =>
                                setOptions({
                                    ...options,
                                    releaseChannel: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </Paper>
        </div>
    );
}
