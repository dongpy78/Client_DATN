import styled from "styled-components";

const Wrapper = styled.section`
  /* margin-top: 4rem; */
  text-align: center;
  background-color: var(--background-secondary-color);
  padding: 2rem;

  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  span {
    color: var(--text-color);
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
    color: var(--text-color);
    letter-spacing: var(--letter-spacing);
  }
`;

export default Wrapper;
