import styles from "./form.styles.module.scss";
import axios from "axios";
import { Button, Input } from "../formElements/FormElements";

const URL = "http://localhost:3000";

const Form = ({ handleRequestData, components }) => {

  const submitResult = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const result = {};
    formData.forEach((value, key) => {
      result[key] = value;
    });

    const { req, func } = handleRequestData(URL, result);

    try {
      const { data } = await axios.post(req.url, req.data, req.config);
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
    <section className={styles.formContainer}>
      <form onSubmit={submitResult}>

        {components.inputs.map((input) => (
          <Input key={input.id} input={input} />
        ))}

        <div className={styles.buttonsContainer}>
          {components.buttons.map((button) => (
            <Button key={button.id} button={button} />
          ))}
        </div>

      </form>
    </section>
  );
};

export default Form;
