import styled from "styled-components";

const Wrapper = styled.section`
  /* margin-top: 4rem; */
  text-align: center;
  background-color: var(--background-third-color);
  padding: 2rem;
  font-family: "Plus Jakarta Sans", sans-serif;

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
    font-family: "Plus Jakarta Sans", sans-serif;
  }

  @media (max-width: 740px) {
    padding: 0;
  }
`;

export default Wrapper;
