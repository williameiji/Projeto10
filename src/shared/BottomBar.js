import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import ProgressBar from "../shared/ProgessBar";

export default function BottomBar() {
  return (
    <Box>
      <Link style={{ textDecoration: "none" }} to="/habitos">
        <p>Hábitos</p>
      </Link>
      <Link to="/hoje">
        <div>
          <ProgressBar />
        </div>
      </Link>
      <Link style={{ textDecoration: "none" }} to="/historico">
        <p>Histórico</p>
      </Link>
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 70px;
  bottom: 0px;
  left: 0px;
  padding: 0 35px;
  background-color: white;

  div {
    position: relative;
    bottom: 25px;
    width: 80px;
    height: 80px;
    background-color: #52b6ff;
    border-radius: 50%;
    padding: 8px;
  }

  p {
    font-size: 17.976px;
    color: #52b6ff;
  }
`;
