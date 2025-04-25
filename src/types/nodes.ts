type ComponentType = "form" | ""; // probably other ones as well?

export type Node = {
  id: string;
  type: ComponentType;
  data: {
    id: string;
    component_key: string;
    component_type: ComponentType;
    component_id: string;
    name: string;
  };
  position: {
    x: number;
    y: number;
  };
};

export type Edge = {
  id: string;
  source: string;
  target: string;
};
