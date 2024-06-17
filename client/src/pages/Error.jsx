import styled from "styled-components";
import { Link, useRouteError } from "react-router-dom";

import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  return (
    <Wrapper>
      <Content>
        {error.status === 404 ? (
          <>
            <Image src={img} alt="Page not found" />
            <Title>Oh no! Page not found</Title>
            <Message>
              We can't seem to find the page you're looking for.
            </Message>
            <StyledLink to="/dashboard">Back home</StyledLink>
          </>
        ) : (
          <Title>Something went wrong</Title>
        )}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f8f9fa;
  padding: 2rem;
`;

const Content = styled.div`
  max-width: 600px;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.75rem;
  color: #333;
`;

const Message = styled.p`
  margin-bottom: 1.5rem;
  color: #6c757d;
  font-size: 1.125rem;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-transform: capitalize;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Error;
