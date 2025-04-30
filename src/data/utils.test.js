import { describe, it, expect } from "vitest";
import { getFormFieldsForNode, getLinkedField, getNodeNameFromNodeId } from "./utils";

describe("getFormFieldsForNode", () => {
  it("should return an empty array when node is null", () => {
    const forms = [];
    const node = null;

    const result = getFormFieldsForNode(forms, node);

    expect(result).toEqual([]);
  });

  it("should return an empty array when no matching form is found", () => {
    const forms = [
      { id: "form1", field_schema: { properties: {} } },
    ];
    const node = { id: "node1", data: { component_id: "form2" } };

    const result = getFormFieldsForNode(forms, node);

    expect(result).toEqual([]);
  });

  it("should return fields as key-value pairs when a matching form is found", () => {
    const forms = [
      {
        id: "form1",
        field_schema: {
          properties: {
            field1: { type: "string" },
            field2: { type: "number" },
          },
        },
      },
    ];
    const node = { id: "node1", data: { component_id: "form1" } };

    const result = getFormFieldsForNode(forms, node);

    expect(result).toEqual([
      ["field1", { type: "string" }],
      ["field2", { type: "number" }],
    ]);
  });

  it("should return an empty array when the matching form has no fields", () => {
    const forms = [
      { id: "form1", field_schema: { properties: {} } },
    ];
    const node = { id: "node1", data: { component_id: "form1" } };

    const result = getFormFieldsForNode(forms, node);

    expect(result).toEqual([]);
  });
});

describe("getLinkedField", () => {
  it("should return undefined when no matching field link is found", () => {
    const sourceField = { node_id: "node1", field: "field1" };
    const formFieldLinks = [
      { target: { node_id: "node2", field: "field2" } },
    ];

    const result = getLinkedField(sourceField, formFieldLinks);

    expect(result).toBeUndefined();
  });

  it("should return the matching field link when found", () => {
    const sourceField = { node_id: "node1", field: "field1" };
    const formFieldLinks = [
      { target: { node_id: "node1", field: "field1" } },
      { target: { node_id: "node2", field: "field2" } },
    ];

    const result = getLinkedField(sourceField, formFieldLinks);

    expect(result).toEqual({ target: { node_id: "node1", field: "field1" } });
  });
});

describe("getNodeNameFromNodeId", () => {
  it("should return undefined when no matching node is found", () => {
    const nodeId = "node1";
    const nodes = [
      { id: "node2", data: { name: "Node 2" } },
    ];

    const result = getNodeNameFromNodeId(nodeId, nodes);

    expect(result).toBeUndefined();
  });

  it("should return the name of the matching node", () => {
    const nodeId = "node1";
    const nodes = [
      { id: "node1", data: { name: "Node 1" } },
      { id: "node2", data: { name: "Node 2" } },
    ];

    const result = getNodeNameFromNodeId(nodeId, nodes);

    expect(result).toBe("Node 1");
  });
});