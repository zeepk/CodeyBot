import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Modal } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ModalActionContent from './ModalActionContent';

type Props = {
    secret: string;
    workflows: string[];
    handleBack: () => void;
};

export default function WorkflowGenerator({
    secret,
    workflows,
    handleBack,
}: Props) {
    const [open, setOpen] = useState(false);
    return (
        <div className="d-flex flex-column ai-center jc-center workflow">
            <div className="d-flex flex-row ai-center jc-around buttons">
                <Button variant="contained" onClick={() => handleBack()}>
                    Back to config
                </Button>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    What do I do with this?
                </Button>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalActionContent />
            </Modal>
            <Paper
                elevation={3}
                className="secret d-flex flex-row ai-center jc-between"
            >
                <h3>Github Secret:</h3>
                <div className="d-flex flex-row ai-center jc-between">
                    <TextField
                        className="secret-input"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={secret}
                    />
                    <IconButton
                        aria-label="copy"
                        onClick={() => navigator.clipboard.writeText(secret)}
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </div>
            </Paper>

            <h1>Github Workflows</h1>
            {workflows.map(workflow => (
                <div className="highlighter">
                    <IconButton
                        className="copy"
                        aria-label="copy"
                        onClick={() => navigator.clipboard.writeText(workflow)}
                    >
                        <ContentCopyIcon />
                    </IconButton>
                    <SyntaxHighlighter
                        customStyle={{ textAlign: 'left' }}
                        language="yaml"
                        style={a11yDark}
                        showLineNumbers
                    >
                        {workflow}
                    </SyntaxHighlighter>
                </div>
            ))}
        </div>
    );
}
