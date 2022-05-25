import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "../assets/css/reset.css";

import InitialScreen from "../components/Login/InitialScreen";
import SignupScreen from "../components/Signup/SignupScreen";
import HabitsScreen from "../components/Habits/HabitsScreen";
import TodayScreen from "../components/TodayScreen/TodayScreen";
import HistoryScreen from "../components/HistoryScreen/HistoryScreen";
import UserContext from "../context/UserContext";

export default function App() {
    const [userInfo, setUserInfo] = React.useState("");
    const [habits, setHabits] = React.useState([]);
    const [autoLogin, setAutoLogin] = React.useState({});
    const [control, setControl] = React.useState(true);

    if (control) {
        setControl(false);
        console.log(localStorage.getItem("login"));
        let loginStoraged = localStorage.getItem("login");
        let deserializationData = JSON.parse(loginStoraged);
        setAutoLogin({ ...deserializationData })
    }

    return (
        <Body>
            <UserContext.Provider value={{ userInfo, setUserInfo, habits, setHabits, autoLogin }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<InitialScreen />} />
                        <Route path="/cadastro" element={<SignupScreen />} />
                        <Route path="/habitos" element={<HabitsScreen />} />
                        <Route path="/hoje" element={<TodayScreen />} />
                        <Route path="/historico" element={<HistoryScreen />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </Body>
    );
}

const Body = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    box-sizing: border-box;
`;