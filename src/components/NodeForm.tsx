import { Dispatch, SetStateAction } from "react";
import { Form } from "../types/graphData";

import style from "./NodeForm.module.css";

interface FormProps {
  form: Form;
  onFormElementClick: Dispatch<SetStateAction<boolean>>;
}

export const NodeForm = ({ form, onFormElementClick }: FormProps) => {
  const formFields = Object.entries(form?.field_schema.properties || {});

  console.log({ formFields });

  const handleFieldClick = () => {
    onFormElementClick(true);
  };

  return (
    <div className={style.form}>
      Form for {form.name}
      {formFields.map((field) => (
        <div key={field[0]} onClick={handleFieldClick}>
          {field[0]}
        </div>
      ))}
    </div>
  );
};
