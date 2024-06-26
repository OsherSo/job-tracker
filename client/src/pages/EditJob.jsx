import { toast } from "react-toastify";
import { Form, useNavigation, redirect, useLoaderData } from "react-router-dom";

import customFetch from "../utils/customFetch";

import Wrapper from "../assets/wrappers/DashboardFormPage";

import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";

import { FormRow, FormRowSelect, SubmitBtn } from "../components";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success("Job edited successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="location"
            labelText="job location"
            defaultValue={job.location}
          />
          <FormRowSelect
            name="status"
            labelText="job status"
            defaultValue={job.status}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="type"
            labelText="job type"
            defaultValue={job.type}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
