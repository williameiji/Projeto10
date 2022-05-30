import styled from "styled-components";
import { useState, useContext } from 'react';
import axios from "axios";

import BottomBar from "../../shared/BottomBar";
import TopBar from "../../shared/TopBar";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../../assets/css/styleCalendar.css";
import dayjs from 'dayjs';
import UserContext from "../../context/UserContext";
import url from "../../services/api";

function Popup({ renderPopup, controlRender, setControlRender }) {
    return (
        <>
            <BoxPopup onClick={() => setControlRender(false)}>
                <PopupContent>
                    <p>Seu(s) hábito(s) desse dia:</p>
                    {controlRender ? renderPopup.habits.map((value, index) => <TextPopup key={index} color={value.done}>{value.name}</TextPopup>) : null}
                </PopupContent>
            </BoxPopup>
        </>
    );
}

export default function HistoryScreen() {
    const [value, onChange] = useState(new Date());
    const [control, setControl] = useState(true);
    const { userInfo, trackHistory, setTrackHistory } = useContext(UserContext);
    const [renderPopup, setRenderPopup] = useState({});
    const [controlRender, setControlRender] = useState(false);

    const config = {
        headers: {
            "Authorization": `Bearer ${userInfo.token}`
        }
    }

    if (control) {
        setControl(false);
        const promise = axios.get(url.history, config);
        promise.then(response => {
            setTrackHistory(response.data);
        });
    }

    function tileClassName({ date, view }) {
        if (view === 'month') {
            let dayMark = trackHistory.find(dDate => dDate.day === dayjs(date).format('DD/MM/YYYY'));
            if (dayMark) {
                if (dayMark.habits.some(mark => mark.done === false)) {
                    return 'fail';
                } else {
                    return 'done';
                }
            }
        }
    }

    function click(date) {
        let render = trackHistory.find(track => track.day === dayjs(date).format('DD/MM/YYYY'));
        if(render !== undefined){
            setRenderPopup(render);
            setControlRender(true);
        }
    }

    return (
        <Box>
            <TopBar />
            <Title>
                <p>Histórico</p>
                <Text>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        calendarType={"ISO 8601"}
                        tileClassName={tileClassName}
                        onClickDay={(date) => click(date)}
                    />
                </Text>
            </Title>
            {controlRender ? <Popup renderPopup={renderPopup} controlRender={controlRender} setControlRender={setControlRender} /> : null}
            <BottomBar />
        </Box>
    );
}

const Box = styled.div`
    position: fixed;
    top: 0;
    left: 0;
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

const BoxPopup = styled.div`
    position: fixed;
    top: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const PopupContent = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: white;
    border: solid 5px #126BA5;
    border-radius: 10px;

    p:first-child {
        font-size: 20px;
        margin-bottom: 10px;
    }
`;

const TextPopup = styled.p`
    font-size: 30px;
    color: ${props => props.color ? "green" : "red"};
`;