import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logo, FormRow } from "../components";

const Login = () => {
  return (
    <Wrapper>
      <LoginForm>
        <StyledLogo />
        <FormTitle>Login</FormTitle>
        <Form>
          <FormRow
            type="email"
            name="email"
            defaultValue="john@gmail.com"
            labelText="Email"
          />
          <FormRow
            type="password"
            name="password"
            defaultValue="secret123"
            labelText="Password"
          />
          <SubmitButton type="submit">Submit</SubmitButton>
          <ExploreButton type="button">Explore the App</ExploreButton>
        </Form>
        <MembershipLink>
          Not a member yet? <StyledLink to="/register">Register</StyledLink>
        </MembershipLink>
      </LoginForm>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  padding: 1rem;
`;

const LoginForm = styled.div`
  background-color: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const StyledLogo = styled(Logo)`
  display: block;
  margin: 0 auto 1.5rem;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #343a40;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-500);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-700);
  }
`;

const ExploreButton = styled(SubmitButton)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

const MembershipLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #6c757d;
  font-size: 0.875rem;
`;

const StyledLink = styled(Link)`
  color: var(--primary-500);
  margin-left: 0.25rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
