import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressBar() {
    const percentage = 66;

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