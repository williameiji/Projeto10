import styled from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";

import BottomBar from "../../shared/BottomBar";
import date from "../../shared/day";
import TopBar from "../../shared/TopBar";
import UserContext from "../../context/UserContext";
import url from "../../services/api";

export default function TodayScreen() {
    const { userInfo, todayTrack, setTodayTrack, setCounter, counter } = useContext(UserContext);
    const [control, setControl] = useState(true);

    const config = {
        headers: {
            "Authorization": `Bearer ${userInfo.token}`
        }
    }

    if (control) {
        setControl(false);
        const promise = axios.get(url.today, config);
        promise.then(response => {
            setTodayTrack(response.data);
            checkDone(response.data);
        });
    }

    function checkHabit(id, done) {
        if (done === false) {
            const promise = axios.post(`${url.habit}/${id}/check`, {}, config);
            promise.then(response => {
                setControl(true);
                setCounter(counter + 1);
            });
        }
        if (done === true) {
            const promise = axios.post(`${url.habit}/${id}/uncheck`, {}, config);
            promise.then(response => {
                setControl(true);
                setCounter(counter - 1);
            });
        }
    }

    function checkDone (data) {
        let count = data.map(check => check.done).filter(check => check === true);
        if(count.length > 0){
            setCounter(count.length);
        }
    }

    let percentageHabits = (counter * 100) / todayTrack.length;
    const text = "Nenhum hábito concluído ainda";

    return (
        <Box>
            <TopBar />
            <Date>{date}</Date>
            {percentageHabits > 0 ? <PercentageDone>{percentageHabits}% dos hábitos concluídos</PercentageDone> : <Text>{text}</Text>}
            {todayTrack.map((value, index) =>
                <Habits key={index}>
                    <p>{value.name}</p>
                    <div><div>Sequência atual:</div><TextActual color={value.done}> {value.currentSequence} {value.currentSequence > 1 || value.currentSequence === 0 ? "dias" : "dia"}</TextActual></div>
                    <div><div>Seu recorde:</div><TextRecord color={(value.currentSequence === value.highestSequence && value.highestSequence !== 0)}>{value.highestSequence} {value.highestSequence > 1 || value.currentSequence === 0  ? "dias" : "dia"}</TextRecord></div>
                    <CheckBox background={value.done} onClick={() => checkHabit(value.id, value.done)}><ion-icon name="checkmark-outline"></ion-icon></CheckBox>
                </Habits>)}
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
    padding: 5px 18px;
`;

const Date = styled.div`
    margin: 90px 0 0 0;
    font-size: 23px;
    color: #126BA5;
`;

const Text = styled.div`
    font-size: 18px;
    color: #666666;
    margin: 28px 0 0 0;
`;

const Habits = styled.div`
    position: relative;
    width: 100hw;
    height: 70px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin: 25px 0 0 0;
    padding: 18px 25px 18px 18px;

    p:first-child {
        font-size: 20px;
        color: #666666;
        margin: 0 0 10px 0;
    }

    div {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #666666;
        margin: 3px 0 0 0;
    }
`;

const TextActual = styled.p`
    font-size: 13px;
    padding: 2px 0 0 3px;
    color: ${props => props.color ? "#8FC549" : "#666666"};
`;

const TextRecord = styled.p`
    font-size: 13px;
    padding: 2px 0 0 3px;
    color: ${props => props.color ? "#8FC549" : "#666666"};
`;

const CheckBox = styled.div`
    position: absolute;
    bottom: 25px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: ${props => props.background ? "#8FC549" : "#EBEBEB"};
    border: 1px solid #E7E7E7;
    border-radius: 5px;

    ion-icon {
        font-size: 50px;
        color: white;
        --ionicon-stroke-width: 60px;
    }
`;

const PercentageDone = styled.div`
    font-size: 18px;
    color: #8FC549;
    margin: 28px 0 0 0;
`;

