import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

export const FooterStyled = styled.footer`
  button {
    background: none;
  }
`;
