import { Dispatch, SetStateAction } from "react";
import { Form, Node } from "../types/graphData";

import style from "./NodeForm.module.css";
import { FormField, FormFieldLink } from "../types/customTypes";
import { getLinkedField, getNodeNameFromNodeId } from "../data/utils";

interface FormProps {
  form: Form;
  onFormElementClick: Dispatch<SetStateAction<boolean>>;
  setCurrentField: Dispatch<SetStateAction<FormField | null>>;
  fieldLinks: FormFieldLink[];
  currentNode: Node | null;
  nodes: Node[];
  removeFieldLink: Function;
}

export const NodeForm = ({
  form,
  onFormElementClick,
  setCurrentField,
  fieldLinks,
  currentNode,
  nodes,
  removeFieldLink,
}: FormProps) => {
  const formFields = Object.entries(form?.field_schema.properties || {});

  const handleFieldClick = (field: FormField) => {
    onFormElementClick(true);
    setCurrentField(field);
  };

  const handleRemoveLink = (
    e: React.MouseEvent<HTMLSpanElement>,
    field_name: string
  ) => {
    e.stopPropagation();

    if (!currentNode) {
      return;
    }

    removeFieldLink({
      node_id: currentNode.id,
      field: field_name,
    });
  };

  return (
    <>
      {currentNode && (
        <div className={style.form}>
          <h3>{currentNode?.data.name}</h3>
          {formFields.map((field) => {
            const linkedField = getLinkedField(
              { node_id: currentNode.id, field: field[0] },
              fieldLinks
            );

            return (
              <div
                key={field[0]}
                className={linkedField ? style.populated : style.regular}
                onClick={() =>
                  handleFieldClick({ node_id: currentNode.id, field: field[0] })
                }
              >
                {linkedField ? (
                  <>
                    <span>
                      {field[0]}:{" "}
                      {getNodeNameFromNodeId(linkedField.source.node_id, nodes)}
                      .{linkedField.source.field}
                    </span>
                    <span
                      className={style.removeButton}
                      onClick={(e) => handleRemoveLink(e, field[0])}
                    >
                      &#10006;
                    </span>
                  </>
                ) : (
                  field[0]
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
