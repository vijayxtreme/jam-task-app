import styled from "styled-components";

const BaseForm = styled.form`
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 80%;
  max-width: 890px;
`;

const BaseSection = styled.section`
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 80%;
  max-width: 890px;
`;

export const StyledForm = styled(BaseForm)`
  input {
    width: 100%;
    height: 40px;
    padding-left: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background: #fffcdf;
    border: 0;
    border-bottom: 2px solid #8e8e8e;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 1.5rem;
    &:placeholder {
      color: #474747;
    }
  }
`;

export const StyledSection = styled(BaseSection)``;

export const StyledTaskList = styled.ul`
  list-style: none;
  display: block;
  width: 100%;
  padding-inline-start: 0;
  background: #c7fff5;
  border: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  li {
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    height: 40px;
    line-height: 40px;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #8e8e8e;
  }
  span.task {
    input[type="checkbox"] {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      cursor: pointer;
    }
  }
  button {
    font-weight: bold;
    background: transparent;
    text-decoration: none;
    margin-right: 0.5rem;
  }
  .completed {
    background: #dcffc7;
  }

  .completed span.task span {
    text-decoration: line-through;
  }
`;
