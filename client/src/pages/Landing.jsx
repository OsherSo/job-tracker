import { Link } from "react-router-dom";

import { Logo } from "../components";

import main from "../assets/images/main.svg";

import Wrapper from "../assets/wrappers/LandingPage";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Welcome to our job tracking app, where you can organize your job
            hunt like a pro. Discover and apply for opportunities seamlessly
            while staying on top of your applications. Gain insights and manage
            your career path effectively with our intuitive tools and resources.
          </p>

          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
