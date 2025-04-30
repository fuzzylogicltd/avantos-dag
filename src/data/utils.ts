import { FormField, FormFieldLink } from "../types/customTypes";
import { Field, Form, Node } from "../types/graphData";

export function getFormFieldsForNode(
  forms: Form[],
  node: Node | null
): [string, Field][] {
  const nodeForm = forms.find((form) => form.id === node?.data.component_id);
  const fields = nodeForm?.field_schema.properties;

  return Object.entries(fields || {});
}

export function getLinkedField(
  sourceField: FormField,
  formFieldLinks: FormFieldLink[]
): FormFieldLink | undefined {
  const linkedField = formFieldLinks.find(
    (fieldLink) =>
      fieldLink.target.node_id === sourceField.node_id &&
      fieldLink.target.field === sourceField.field
  );

  return linkedField;
}

export function getNodeNameFromNodeId(nodeId: string, nodes: Node[]) {
  const targetNode = nodes.find((node) => node.id === nodeId);

  return targetNode?.data.name;
}
