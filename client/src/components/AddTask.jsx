import { Form } from "react-router-dom";

import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";

const AddTask = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add task</h4>
        <FormRow type="text" name="description" />
        <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  );
};

export default AddTask;
