import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <Nav>
        <Logo />
      </Nav>
      <Page>
        <Info>
          <Title>
            Job <span>Tracking</span> App
          </Title>
          <Description>
            Stay organized and keep track of your job applications effortlessly.
            Our app helps you monitor your job search progress, set reminders
            for follow-ups, and stay ahead in your career journey.
          </Description>
          <ButtonGroup>
            <StyledLink to="/register" className="btn register-link">
              Register
            </StyledLink>
            <StyledLink to="/login" className="btn">
              Login / Demo User
            </StyledLink>
          </ButtonGroup>
        </Info>
        <Image src={main} alt="job hunt" />
      </Page>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  background-color: #f8f9fa;
`;

const Nav = styled.nav`
  width: 100%;
  max-width: var(--max-width);
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const Page = styled.div`
  width: 100%;
  max-width: var(--max-width);
  min-height: calc(100vh - var(--nav-height));
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0 1rem;
  margin-top: -3rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;

  span {
    color: var(--primary-500);
  }
`;

const Description = styled.p`
  line-height: 1.8;
  color: var(--text-secondary-color);
  margin-bottom: 1.5rem;
  max-width: 600px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  color: #fff;
  background-color: var(--primary-500);
  border: none;
  border-radius: 0.25rem;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--primary-700);
  }
`;

const Image = styled.img`
  display: none;
  width: 100%;
  max-width: 500px;

  @media (min-width: 992px) {
    display: block;
  }
`;

export default Landing;
