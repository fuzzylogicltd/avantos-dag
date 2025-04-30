import Modal from "react-modal";

import styles from "./DataElementMapModal.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { Node, Field } from "../types/graphData";
import { FormField } from "../types/customTypes";

interface DataElementMapModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentNodeHierarchy: Node[];
  fields: [string, Field][];
  addFieldLink: Function;
}

export const DataElementMapModal = ({
  isOpen,
  setIsOpen,
  currentNodeHierarchy,
  fields,
  addFieldLink,
}: DataElementMapModalProps) => {
  Modal.setAppElement("#root");

  const [expandedNode, setExpandedNode] = useState<Node>();

  const handleFieldClick = (field: FormField) => {
    if (!expandedNode) {
      return;
    }

    const sourceField: FormField = {
      node_id: expandedNode?.id,
      field: field.field,
    };

    addFieldLink(sourceField);
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} className={styles.modal}>
        <button onClick={() => setIsOpen(false)}>X</button>
        <hr />
        {currentNodeHierarchy
          .slice()
          .reverse()
          .map((node) => {
            return (
              <details key={node.id}>
                <summary onClick={() => setExpandedNode(node)}>
                  {node.data.name}
                </summary>
                {expandedNode &&
                  fields.map((field) => (
                    <div
                      key={field[0]}
                      onClick={() =>
                        handleFieldClick({
                          node_id: expandedNode?.id,
                          field: field[0],
                        })
                      }
                    >
                      {field[0]}
                    </div>
                  ))}
              </details>
            );
          })}
      </Modal>
    </>
  );
};
