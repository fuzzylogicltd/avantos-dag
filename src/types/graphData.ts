// https://app.quicktype.io/

export interface GraphData {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  category: string;
  nodes: Node[];
  edges: Edge[];
  forms: Form[];
  branches: any[];
  triggers: any[];
}

export interface Edge {
  source: string;
  target: string;
}

export interface Form {
  id: string;
  name: string;
  description: string;
  is_reusable: boolean;
  field_schema: FieldSchema;
  ui_schema: UISchema;
  dynamic_field_config: DynamicFieldConfig;
}

export interface DynamicFieldConfig {
  button: DynamicCheckboxGroupClass;
  dynamic_checkbox_group: DynamicCheckboxGroupClass;
  dynamic_object: DynamicCheckboxGroupClass;
}

export interface DynamicCheckboxGroupClass {
  selector_field: string;
  payload_fields: PayloadFields;
  endpoint_id: string;
}

export interface PayloadFields {
  userId: UserID;
}

export interface UserID {
  type: string;
  value: string;
}

export interface FieldSchema {
  type: ButtonType;
  properties: Field[];
  required: string[];
}

export interface Field {
  [key: string]: FieldDetails;
}

export interface FieldDetails {
  avantos_type: AvantosType;
  type: ButtonType;
  title?: string;
  enum?: EnumClass[] | null;
  format?: string;
  uniqueItems?: boolean;
  items: Items;
}

export enum AvantosType {
  Button = "button",
  MultiLineText = "multi-line-text",
  ObjectEnum = "object-enum",
  ShortText = "short-text",
}

export interface EnumClass {
  title: string;
}

export enum ButtonType {
  Object = "object",
  String = "string",
}

export interface Items {
  enum: EnumEnum[];
  type: ButtonType;
}

export enum EnumEnum {
  Bar = "bar",
  Foo = "foo",
  Foobar = "foobar",
}

export interface UISchema {
  type: string;
  elements: Element[];
}

export interface Element {
  type: ElementType;
  scope: string;
  label: string;
  options?: Options;
}

export interface Options {
  format: string;
}

export enum ElementType {
  Button = "Button",
  Control = "Control",
}

export interface Node {
  id: string;
  type: string;
  position: Position;
  data: Data;
}

export interface Data {
  id: string;
  component_key: string;
  component_type: string;
  component_id: string;
  name: string;
  prerequisites: string[];
  permitted_roles: any[];
  input_mapping: InputMapping;
  sla_duration: SlaDuration;
  approval_required: boolean;
  approval_roles: any[];
}

export interface InputMapping {}

export interface SlaDuration {
  number: number;
  unit: string;
}

export interface Position {
  x: number;
  y: number;
}
