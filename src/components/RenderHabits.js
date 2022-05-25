import { useContext } from "react";
import styled from "styled-components";

import UserContext from "../context/UserContext";
import arrayDays from "../assets/shared/objectDays";

export default function RenderHabits({ deleteHabits }) {
    const { habits } = useContext(UserContext);
    return (
        <>
            {habits.map((value, index) => <Habits key={index}>
                <p>{value.name}</p>
                <Weekdays>
                    {arrayDays.day.map((element, index) => <Days color={value.days.some(day => day === element.num)} key={index} >{element.name}</Days>)}
                </Weekdays>
                <DeleteButton onClick={() => deleteHabits(value.id)}>🗑️</DeleteButton>
            </Habits>)}
        </>
    );
}

const Habits = styled.div`
    position: relative;
    width: 100hw;
    height: 70px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin: 10px;
    padding: 18px 25px 18px 18px;

    p {
        font-size: 20px;
        color: #666666;
    }
`;

const DeleteButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const Weekdays = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0 0 0;
`;

const Days = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: ${props => props.color ? "#CFCFCF" : "#FFFFFF"};
    pointer-events: ${props => props.blockInput ? "none" : ""};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    color: #DBDBDB;
    margin: 0 5px 0 0;
`;