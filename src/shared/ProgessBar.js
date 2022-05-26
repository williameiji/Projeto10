import { useContext } from 'react';

import UserContext from "../context/UserContext";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressBar() {
    const { counter, todayTrack } = useContext(UserContext);
    let percentage;
    if (todayTrack.length > 0) {
        percentage = (counter * 100) / todayTrack.length;
    } else {
        percentage = 0;
    }

    return (
        <>
            <CircularProgressbar value={percentage} text={'Hoje'} styles={buildStyles({
                pathColor: 'white',
                textColor: 'white',
                trailColor: 'none',
                backgroundColor: '#52B6FF'
            })} />
        </>
    );
}