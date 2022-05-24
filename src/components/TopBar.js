import styled from "styled-components";
import { useContext } from "react";

import UserContext from "../context/UserContext";

export default function TopBar() {
    const { userInfo } = useContext(UserContext);

    return (
        <Box>
            <p>TrackIt</p>
            <img src={userInfo.image} alt="" />
        </Box>
    );
}

const Box = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0;
    top: 0;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    padding: 0 18px;

    p {
        font-size: 40px;
        font-family: 'Playball', cursive;
        color: white;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 98px;
    }
`;