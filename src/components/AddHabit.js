import styled from "styled-components";


import Loading from "./Loading";

export default function AddHabit({ blockInput, handleFormChange, newHabits, selectDays, renderDays, submit, setRenderNewHabits }) {
    return (
        <BoxNewHabit>
            <Input blockInput={blockInput} type="text" name="name" placeholder="nome do hábito" onChange={(e) => handleFormChange(e)} value={newHabits.name} required />
            <Weekdays>
                {renderDays.day.map((value, index) => <Days blockInput={blockInput} color={value.color} key={index} index={index} onClick={() => selectDays(index, value.num, value.color)} >{value.name}</Days>)}
            </Weekdays>
            <Button blockInput={blockInput} onClick={submit} >{blockInput ? <Loading /> : "Salvar"}</Button>
            <ButtonCancel onClick={() => setRenderNewHabits(false)}>Cancelar</ButtonCancel>
        </BoxNewHabit>
    );
}

const BoxNewHabit = styled.div`
    position: relative;
    width: 100hw;
    height: 140px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin: 20px;
    padding: 18px 25px 18px 18px;
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
    background: ${props => props.color};
    pointer-events: ${props => props.blockInput ? "none" : ""};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    color: #DBDBDB;
    margin: 0 5px 0 0;
`;

const Input = styled.input`
    width: 295px;
    height: 45px;
    pointer-events: ${props => props.blockInput ? "none" : ""};
    background-color: ${props => props.blockInput ? "#F2F2F2" : "#FFFFFF"};
    color: ${props => props.blockInput ? "#AFAFAF" : ""};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 0 0 0 10px;

    ::placeholder{
        font-size: 20px;
        color: #DBDBDB;
    }
`;

const Button = styled.button`
    position: absolute;
    bottom: 15px;
    right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    border: none;
    pointer-events: ${props => props.blockInput ? "none" : ""};
`;

const ButtonCancel = styled.button`
    position: absolute;
    bottom: 15px;
    right: 115px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 35px;
    background: white;
    color: #52B6FF;
    font-size: 16px;
    border: none;
`;