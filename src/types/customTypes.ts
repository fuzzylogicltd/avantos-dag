export interface FormField {
  node_id: string;
  field: string;
}

export interface FormFieldLink {
  source: FormField;
  target: FormField;
}
