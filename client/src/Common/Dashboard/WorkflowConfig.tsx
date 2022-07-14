import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { WorkflowOptions, defaultOptions } from '../../utils/constants';
import { useState } from 'react';

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

    return (
        <div className="d-flex flex-column ai-center jc-between config">
            <Button
                variant="contained"
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
                        label="Inclued Pushes"
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
                            label="Message"
                            color="primary"
                            disabled={!options.includePushes}
                            onChange={(e: any) =>
                                setOptions({
                                    ...options,
                                    pushMessage: e.target.value,
                                })
                            }
                        />
                        <TextField
                            id="outlined-required"
                            label="Branches"
                            color="primary"
                            disabled={!options.includePushes}
                            onChange={(e: any) =>
                                setOptions({
                                    ...options,
                                    pushBranches: e.target.value,
                                })
                            }
                        />
                        <TextField
                            id="outlined-required"
                            label="Channel"
                            helperText="Copy link to share your discord channel"
                            color="primary"
                            disabled={!options.includePushes}
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
                        label="Inclued Releases"
                        control={
                            <Checkbox
                                checked={options.includeReleases}
                                onChange={(e: any) =>
                                    setOptions({
                                        ...options,
                                        includeReleases: e.target.checked,
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
                            disabled={!options.includeReleases}
                            onChange={(e: any) =>
                                setOptions({
                                    ...options,
                                    releasesMessage: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </Paper>
        </div>
    );
}
