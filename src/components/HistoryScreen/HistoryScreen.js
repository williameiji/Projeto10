import styled from "styled-components";

import BottomBar from "../../shared/BottomBar";
import TopBar from "../../shared/TopBar";

export default function HistoryScreen() {
    const textHistory = "Em breve você poderá ver o histórico dos seus hábitos aqui!";

    return (
        <Box>
            <TopBar />
            <Title>
                <p>Histórico</p>
                <Text>
                    {textHistory}
                </Text>
            </Title>
            <BottomBar />
        </Box>
    );
}

const Box = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: #F2F2F2;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    margin: 100px 0 0 0;
    padding: 0 18px;
    p {
        font-size: 23px;
        color: #126BA5;
    }
`;

const Text = styled.div`
    font-size: 17.976px;
    color: #666666;
    margin: 17px 0 0 0;
`;