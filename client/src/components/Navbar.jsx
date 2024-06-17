import styled from "styled-components";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <NavCenter>
        <ToggleButton type="button" onClick={toggleSidebar}>
          <FaAlignLeft />
        </ToggleButton>
        <LogoContainer>
          <Logo />
          <LogoText>Dashboard</LogoText>
        </LogoContainer>
        <ButtonContainer>
          <ThemeToggle />
          <LogoutContainer />
        </ButtonContainer>
      </NavCenter>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
`;

const NavCenter = styled.div`
  display: flex;
  width: 90vw;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.75rem;
  color: var(--primary-500);
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.h4`
  display: none;
  margin-left: 1rem;
  color: var(--text-primary-color);

  @media (min-width: 992px) {
    display: block;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default Navbar;
