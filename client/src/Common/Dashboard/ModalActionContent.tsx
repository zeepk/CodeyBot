import { Paper } from '@mui/material';
import AddSecret from '../../Assets/images/addSecret.png';
import AddAction from '../../Assets/images/addAction.png';

export default function ModalActionContent() {
    return (
        <div className="help-action d-flex flex-column ai-center jc-center">
            <Paper
                elevation={3}
                className="d-flex flex-column ai-center jc-between help-container"
            >
                <h1 className="title">What now?</h1>
                <div className="d-flex flex-row ai-start jc-between">
                    <h3>Github Secret</h3>
                    <div className="d-flex flex-column">
                        <p>
                            {
                                'Add this secret to your Github repository in Settings > Security > Secrets > Actions > New Repository Secret'
                            }
                        </p>
                        <p>
                            {
                                'The Name should be CODEYBOT_TOKEN and the value should be the secret provided.'
                            }
                        </p>
                    </div>
                </div>
                <img
                    src={AddSecret}
                    alt="Add secret to Github"
                    className="help-image add-secret"
                />
                <div className="d-flex flex-row ai-start jc-between">
                    <h3>Github Action</h3>
                    <div className="d-flex flex-column">
                        <p>
                            {
                                'For EACH workflow, create a new Github Action in your repository and paste the yml code shown.'
                            }
                        </p>
                        <p>
                            {
                                'Create a new Action from your repository page in Actions > New Workflow Set Up a Workflow Yourself > Delete example code in the "Edit new file" section and replace with the provided yml. Save using the green "Start commit" button and selection "Commit new file"'
                            }
                        </p>
                    </div>
                </div>
                <img
                    src={AddAction}
                    alt="Add new Github Action"
                    className="help-image add-secret"
                />
            </Paper>
        </div>
    );
}
