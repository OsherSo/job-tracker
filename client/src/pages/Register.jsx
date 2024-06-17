import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logo, FormRow } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <Form>
        <StyledLogo />
        <Title>Register</Title>
        <FormRow type="text" name="name" labelText="First Name" />
        <FormRow type="text" name="lastName" labelText="Last Name" />
        <FormRow type="text" name="location" labelText="Location" />
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText="Password" />
        <Button type="submit">Submit</Button>
        <Text>
          Already a member?
          <StyledLink to="/login">Login</StyledLink>
        </Text>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  padding: 0 1rem;
`;

const Form = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const StyledLogo = styled(Logo)`
  display: block;
  margin: 0 auto 1.5rem;
`;

const Title = styled.h4`
  margin-bottom: 1.5rem;
  color: var(--text-primary-color);
  font-size: 1.75rem;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: var(--primary-500);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--primary-700);
  }
`;

const Text = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: var(--text-secondary-color);
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  color: var(--primary-500);
  margin-left: 0.25rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Register;
