import styles from "./form.styles.module.scss";
import axios from "axios";
import { Button, Input } from "../formElements/FormElements";
import { useUtils } from "../../context/Utils";
import { useEffect, useState } from "react";

const Form = ({ handleRequestData, components, formType }) => {
  const { state } = useUtils();
  const URL = state.serverUrl;
  const [comp, setComp] = useState(components);

  useEffect(() => {
    setComp(components);
  }, [components]);

  const submitResult = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const result = {};
    formData.forEach((value, key) => {
      result[key] = value;
    });

    const { req, func } = handleRequestData(URL, result);

    let request;
    switch (req.type) {
      case "GET":
        request = axios.get;
        break;
      case "POST":
        request = axios.post;
        break;
      case "PUT":
        request = axios.put;
        break;
      case "DELETE":
        request = axios.delete;
        break;

      default:
        break;
    }

    try {
      const { data } = await request(req.url, req.data, req.config);
      func.tFunc(form, data.data);
    } catch (error) {
      console.error(error);
      func.eFunc(form);
    } finally {
      func.fFunc();
      form.reset();
    }
  };

  return (
    <section
      className={
        formType === undefined ? styles.formContainer : styles.formContainerTask
      }
    >
      <form onSubmit={submitResult}>
        {formType && <h3>{`${formType}`}</h3>}
        {comp.inputs.map((input) => (
          <Input
            key={input.id}
            input={input}
            defaultValue={input.defaultValue}
          />
        ))}

        <div className={styles.buttonsContainer}>
          {comp.buttons.map((button) => (
            <Button key={button.id} button={button} />
          ))}
        </div>
      </form>
    </section>
  );
};

export default Form;
