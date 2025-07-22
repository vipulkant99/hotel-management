import styled, { css } from "styled-components";

const StyledRow = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6;
    `}
`;

function Row({ type = "vertical", ...props }) {
  return <StyledRow type={type} {...props} />;
}

// Row.defaultProps = {
//   type: "vertical",
// };

export default Row;
