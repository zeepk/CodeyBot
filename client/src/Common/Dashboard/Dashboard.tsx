import {
    Profile,
    WorkflowOptions,
    defaultOptions,
} from '../../utils/constants';
import { useAuth0 } from '@auth0/auth0-react';
import WorkflowGenerator from './WorkflowGenerator';
import WorkflowConfig from './WorkflowConfig';
import { useState } from 'react';
import { generateWorkflow } from '../../ClientServer';
import LoadingScreen from '../../Common/LoadingScreen';

type Props = {
    profile: Profile;
};

export default function Dashboard({ profile }: Props) {
    const { user } = useAuth0();
    const authId = user?.sub;
    const [isLoading, setIsLoading] = useState(false);
    const [workflows, setWorkflows] = useState<string[] | undefined>(undefined);
    const [secret, setSecret] = useState<string | undefined>(undefined);
    const [options, setOptions] = useState<WorkflowOptions>(defaultOptions);

    if (!authId) {
        return <h1>Error pulling auth id from Auth0</h1>;
    }

    const handleGenerate = async (options: WorkflowOptions) => {
        setOptions(options);
        setIsLoading(true);
        const { data } = await generateWorkflow({ authId, options });
        setWorkflows(data.workflows);
        setSecret(data.secret);
        setIsLoading(false);
    };

    const handleBack = () => setWorkflows(undefined);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="d-flex flex-column ai-center jc-center">
            {workflows && secret ? (
                <WorkflowGenerator
                    secret={secret}
                    workflows={workflows}
                    handleBack={() => handleBack()}
                />
            ) : (
                <WorkflowConfig
                    generateWorkflow={(data: WorkflowOptions) =>
                        handleGenerate(data)
                    }
                    initialOptions={options}
                />
            )}
        </div>
    );
}
