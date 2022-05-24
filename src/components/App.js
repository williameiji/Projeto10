import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "../assets/css/reset.css";

import InitialScreen from "./InitialScreen";
import SignupScreen from "./SignupScreen";
import HabitsScreen from "./HabitsScreen";
import TodayScreen from "./TodayScreen";
import HistoryScreen from "./HistoryScreen";


export default function App () {
    const [userToken, setUserToken] = React.useState("")

    return (
        <Body>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<InitialScreen />} />
                    <Route path="/cadastro" element={<SignupScreen />} />
                    <Route path="/habitos" element={<HabitsScreen />} />
                    <Route path="/hoje" element={<TodayScreen />} />
                    <Route path="/historico" element={<HistoryScreen />} />
                </Routes>
            </BrowserRouter>
        </Body>
    );
}

const Body = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    box-sizing: border-box;
`;