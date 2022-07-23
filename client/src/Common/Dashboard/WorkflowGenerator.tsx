import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
    secret: string;
    workflow: string;
    handleBack: () => void;
};

export default function WorkflowGenerator({
    secret,
    workflow,
    handleBack,
}: Props) {
    return (
        <div className="d-flex flex-column ai-center jc-center workflow">
            <Button variant="contained" onClick={() => handleBack()}>
                Back to config
            </Button>
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
        </div>
    );
}
