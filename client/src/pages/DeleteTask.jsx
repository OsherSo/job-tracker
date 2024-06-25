import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

import customFetch from "../utils/customFetch";

export async function action({ params }) {
  try {
    await customFetch.delete(`/tasks/${params.id}`);
    toast.success("Task deleted successfully");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect("/dashboard/to-do-list");
}
