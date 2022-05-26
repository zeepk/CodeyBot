import Button from "@mui/material/Button";
import { useState } from "react";
import { generateWorkflow } from "../../ClientServer";
import LoadingScreen from "../../Common/LoadingScreen";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  authId: string;
};

export default function Dashboard({ authId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [workflow, setWorkflow] = useState<string | undefined>(undefined);

  const handleGenerate = async () => {
    setIsLoading(true);
    const { data } = await generateWorkflow({ authId });
    setWorkflow(data.workflow);
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="d-flex flex-column ai-center jc-center">
      <Button variant="contained" onClick={() => handleGenerate()}>
        Generate
      </Button>
      {workflow && (
        <SyntaxHighlighter
          customStyle={{ textAlign: "left" }}
          language="yaml"
          style={a11yDark}
          showLineNumbers
        >
          {workflow}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
