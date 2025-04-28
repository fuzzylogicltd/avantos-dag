import { useEffect, useState } from "react";

import { Node, Form } from "./types/graphData";
import { FlowChart } from "./components/FlowChart";
import { NodeForm } from "./components/NodeForm";

import { useGetGraphData } from "./hooks/useGetGraphData";
import { DataElementMapModal } from "./components/DataElementMapModal";

export default function App() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [currentForm, setCurrentForm] = useState<Form | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { data, loading, error } = useGetGraphData();

  useEffect(() => {
    if (!selectedNode || !data) {
      return;
    }

    const formToSet = data.forms.find(
      (form) => form.id === selectedNode.data.component_id
    );

    setCurrentForm(formToSet ?? null);
  }, [selectedNode, data]);

  useEffect(
    function setDataWhenReady() {
      if (loading || error || !data) {
        return;
      }
    },
    [data, error, loading]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (data)
    return (
      <>
        <FlowChart
          openFormHandler={setSelectedNode}
          nodes={data.nodes}
          edges={data.edges}
        />
        {currentForm && (
          <NodeForm form={currentForm} onFormElementClick={setModalIsOpen} />
        )}

        <DataElementMapModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      </>
    );
}
