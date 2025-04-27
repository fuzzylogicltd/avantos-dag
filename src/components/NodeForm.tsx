import { Form } from "../types/graphData";

import style from "./NodeForm.module.css";

interface FormProps {
  form: Form;
}

export const NodeForm = ({ form }: FormProps) => {
  const formFields = Object.entries(form?.field_schema.properties || {});

  console.log({ formFields });

  const handleFieldClick = () => {};

  return (
    <div className={style.form}>
      Form for {form.name}
      {formFields.map((field) => (
        <div key={field[0]} onClick={handleFieldClick}>
          {field[1].title}
        </div>
      ))}
    </div>
  );
};
