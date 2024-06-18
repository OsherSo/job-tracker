import day from "dayjs";
import { Link, Form } from "react-router-dom";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

import JobInfo from "./JobInfo";

import Wrapper from "../assets/wrappers/Job";

day.extend(advancedFormat);

const Job = ({ _id, position, company, location, type, createdAt, status }) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={location} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={type} />
          <div className={`status ${status}`}>{status}</div>
        </div>

        <footer className="actions">
          <Link to={`../edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
