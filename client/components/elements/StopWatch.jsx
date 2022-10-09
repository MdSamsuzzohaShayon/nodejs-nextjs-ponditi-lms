/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGenerateBill } from '../../redux/reducers/scheduledclassReducer';

function StopWatch(props) {
  const dispatch = useDispatch();
  // Date offset
  const prevDate = new Date(props.startedat);
  const nowDate = new Date();

  const [dateToStart, setDateToStart] = useState(
    Math.abs(nowDate.getDate() - prevDate.getDate())
  );
  const [hourToStart, setHourToStart] = useState(
    Math.abs(nowDate.getHours() - prevDate.getHours())
  );
  const [minuteToStart, setMinuteToStart] = useState(
    Math.abs(nowDate.getMinutes() - prevDate.getMinutes())
  );
  const [secondsToStart, setSecondsToStart] = useState(
    Math.abs(nowDate.getSeconds() - prevDate.getSeconds())
  );

  // console.log('Date to start ', prevDate.getDate() - nowDate.getDate());
  // console.log('Get hours ', prevDate.getHours() - nowDate.getHours());
  // // console.log("prev ", prevDate);
  // // console.log("now", nowDate);
  // console.log('Get Minuts ', prevDate.getMinutes() - nowDate.getMinutes());
  // console.log('Get Seconds ', prevDate.getSeconds() - nowDate.getSeconds());

  useEffect(() => {
    // const intervalTime = setInterval(() => this.setState({ time: Date.now() }), 1000);
    const intervalTime = setInterval(() => {
      if (minuteToStart === 60) {
        setHourToStart((prevState) => (prevState += 1));
        setMinuteToStart(0);
        setSecondsToStart(0);
      } else if (secondsToStart === 60) {
        // Set bill
        const perMinRate = props.perHourRate / 60;
        const rateOfHours = hourToStart * props.perHourRate;
        dispatch(setGenerateBill(rateOfHours + minuteToStart * perMinRate));

        setMinuteToStart((prevState) => (prevState += 1));
        setSecondsToStart(0);
      } else {
        setSecondsToStart((prevState) => (prevState += 1));
      }
    }, 1000);
    return () => clearInterval(intervalTime);
  }, [secondsToStart]);

  useEffect(() => {
    const perMinRate = props.perHourRate / 60;
    dispatch(
      setGenerateBill(
        props.perHourRate * hourToStart + minuteToStart * perMinRate
      )
    );
  }, []);

  return (
    <div>
      <p>{`${hourToStart}:${minuteToStart}:${secondsToStart}`}</p>
      {/* <p>Date: {dateToStart} </p>
      <p>Hour: {hourToStart} </p>
      <p>Minute: {minuteToStart} </p>
      <p>Seconds: {secondsToStart} </p> */}
    </div>
  );
}

export default StopWatch;
