/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../../context/UserContext";
import BottomBar from "../../shared/BottomBar";
import TopBar from "../../shared/TopBar";
import arrayDays from "../../shared/objectDays";
import RenderHabits from "./RenderHabits";
import AddHabit from "./AddHabit";
import url from "../../services/api";

export default function HabitsScreen() {
  const { userInfo, habits, setHabits } = useContext(UserContext);
  const [callHabits, setCallHabits] = useState(true);
  const [newHabits, setNewHabits] = useState({
    name: "",
    days: [],
  });
  const [blockInput, setBlockInput] = useState(false);
  const [renderDays, setRenderDays] = useState({ ...arrayDays });
  const [renderNewHabits, setRenderNewHabits] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  if (callHabits) {
    const promise = axios.get(url.habit, config);
    promise.then((response) => {
      setHabits(response.data);
      setCallHabits(false);
    });
  }

  function handleFormChange(e) {
    let data = { ...newHabits };
    data[e.target.name] = e.target.value;
    setNewHabits(data);
  }

  function selectDays(index, num, color) {
    if (index === num && color === "#FFFFFF") {
      let data = [...renderDays.day];
      data[index] = {
        ...data[index],
        color: "#CFCFCF",
      };
      newHabits.days.push(index);
      setRenderDays({ ...renderDays, day: data });
    }
    if (index === num && color === "#CFCFCF") {
      let data = [...renderDays.day];
      data[index] = {
        ...data[index],
        color: "#FFFFFF",
      };
      for (let i = 0; i < newHabits.days.length; i++) {
        if (newHabits.days[i] === num) {
          newHabits.days.splice(i, 1);
        }
      }
      setRenderDays({ ...renderDays, day: data });
    }
  }

  function submit() {
    if (newHabits.name.length > 0 && newHabits.days.length > 0) {
      setBlockInput(true);
      const promise = axios.post(url.habit, newHabits, config);
      promise.then(() => {
        setBlockInput(false);
        setRenderNewHabits(false);
        setCallHabits(true);
        setNewHabits({
          name: "",
          days: [],
        });
        setRenderDays({ ...arrayDays });
      });

      promise.catch((err) => {
        alert(err.response.data.message);
        setBlockInput(false);
        setNewHabits({
          name: "",
          days: [],
        });
        setRenderDays({ ...arrayDays });
      });
    } else {
      alert("Preencha e selecione os campos!");
    }
  }

  const noHabits =
    "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!";

  function deleteHabits(id) {
    if (window.confirm("Deseja remover esse hábito?") === true) {
      axios.delete(`${url.deleteHabit}${id}`, config);
      setCallHabits(true);
    }
  }

  return (
    <Box>
      <TopBar />
      <Title>
        <p>Meus hábitos</p>
        <div onClick={() => setRenderNewHabits(true)}>+</div>
      </Title>
      {renderNewHabits ? (
        <AddHabit
          blockInput={blockInput}
          handleFormChange={handleFormChange}
          newHabits={newHabits}
          selectDays={selectDays}
          renderDays={renderDays}
          submit={submit}
          setRenderNewHabits={setRenderNewHabits}
        />
      ) : null}
      {habits.length !== 0 ? (
        <RenderHabits deleteHabits={deleteHabits} />
      ) : (
        <Text>{noHabits}</Text>
      )}
      <BottomBar />
    </Box>
  );
}

const Box = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: #f2f2f2;
  padding-bottom: 80px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin: 90px 0 0 0;
  justify-content: space-between;
  padding: 0 18px;

  p {
    font-size: 23px;
    color: #126ba5;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;
    background: #52b6ff;
    border-radius: 4.63636px;
    color: white;
    font-size: 26px;
  }
`;

const Text = styled.div`
  font-size: 18px;
  color: #666666;
  padding: 5px 18px;
  margin: 28px 0 0 0;
`;
