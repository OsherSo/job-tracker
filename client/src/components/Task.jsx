import { Link, Form } from "react-router-dom";

import Wrapper from "../assets/wrappers/Job";

const Task = ({ _id, description, completed }) => {
  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          {completed ? (
            <span>
              <i className="far fa-check-circle"></i>
            </span>
          ) : (
            <span>
              <i className="far fa-times-circle"></i>
            </span>
          )}
        </div>
        <div className="info">
          <p>{description}</p>
        </div>
      </header>
      <div className="content">
        <footer className="actions">
          <Link to={`../edit-task/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../complete-task/${_id}`}>
            <button type="submit" className="btn delete-btn">
              {completed ? "Uncomplete" : "Complete"}
            </button>
          </Form>
          <Form method="post" action={`../delete-task/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Task;
