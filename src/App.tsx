import { useEffect, useState } from "react";

import { Node, Form } from "./types/graphData";
import { FormFieldLink, FormField } from "./types/customTypes";
import { FlowChart } from "./components/FlowChart";
import { NodeForm } from "./components/NodeForm";

import { useGetGraphData } from "./hooks/useGetGraphData";
import { DataElementMapModal } from "./components/DataElementMapModal";
import { getFormFieldsForNode } from "./data/utils";

export default function App() {
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [currentForm, setCurrentForm] = useState<Form | null>(null);
  const [currentField, setCurrentField] = useState<FormField | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [fieldLinks, setFieldLinks] = useState<FormFieldLink[]>([]);

  const { data, loading, error, currentNodeHierarchy } =
    useGetGraphData(currentNode);

  useEffect(
    function setCurrentFormOnNodeSelection() {
      if (!currentNode || !data) {
        return;
      }

      const formToSet = data.forms.find(
        (form) => form.id === currentNode.data.component_id
      );

      setCurrentForm(formToSet ?? null);
    },
    [currentNode, data]
  );

  useEffect(
    function setDataWhenReady() {
      if (loading || error || !data) {
        return;
      }
    },
    [data, error, loading]
  );

  const addFieldLink = (sourceField: FormField) => {
    if (!currentNode || !currentField) {
      return;
    }

    const fieldLink: FormFieldLink = {
      source: sourceField,
      target: {
        node_id: currentNode?.id,
        field: currentField.field,
      },
    };

    setFieldLinks((fieldLinks) => [...fieldLinks, fieldLink]);
  };

  const removeFieldLink = (targetField: FormField) => {
    setFieldLinks((fieldLinks) =>
      fieldLinks.filter(
        (link) =>
          link.target.field !== targetField.field ||
          link.target.node_id !== targetField.node_id
      )
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (data)
    return (
      <>
        <FlowChart
          openFormHandler={setCurrentNode}
          nodes={data.nodes}
          edges={data.edges}
          handlePaneClick={() => setCurrentNode(null)}
        />
        {currentForm && (
          <NodeForm
            form={currentForm}
            onFormElementClick={setModalIsOpen}
            setCurrentField={setCurrentField}
            fieldLinks={fieldLinks}
            currentNode={currentNode}
            nodes={data.nodes}
            removeFieldLink={removeFieldLink}
          />
        )}

        <DataElementMapModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          currentNodeHierarchy={currentNodeHierarchy}
          fields={getFormFieldsForNode(data.forms, currentNode)}
          addFieldLink={addFieldLink}
        />
      </>
    );
}
