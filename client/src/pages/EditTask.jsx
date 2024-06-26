import { toast } from "react-toastify";
import { Form, useNavigation, redirect, useLoaderData } from "react-router-dom";

import customFetch from "../utils/customFetch";

import Wrapper from "../assets/wrappers/DashboardFormPage";

import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";

import { FormRow, SubmitBtn, FormRowCheckbox } from "../components";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/tasks/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/to-do-list");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.completed = data.completed === "on";
  console.log(data);
  try {
    await customFetch.patch(`/tasks/${params.id}`, data);
    toast.success("Task edited successfully");
    return redirect("/dashboard/to-do-list");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditJob = () => {
  const { task } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit task</h4>
        <FormRow
          type="text"
          name="description"
          defaultValue={task.description}
        />
        <FormRowCheckbox
          name="completed"
          labelText="completed"
          checked={task.completed}
        />
        <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  );
};

export default EditJob;
