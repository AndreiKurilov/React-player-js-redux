import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './EventList.css';

const EventList = () => {

  const { events } = useSelector((state) => state);
  const dispatch = useDispatch();

  const sortedEvents = events ? [...events].sort((a, b) => a.timestamp - b.timestamp) : [];
  
  const convertTimestamp = (timestamp) => {
    const minutes = Math.floor(timestamp / (60 * 1000));
    const seconds = Math.floor((timestamp % (60 * 1000)) / 1000);
    const milliseconds = timestamp % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  }
  
  return (
    <ul className='eventList'>
      {sortedEvents.map((event) => {
        
        const timeString = convertTimestamp(event.timestamp);
        const timeSeconds = event.timestamp / 1000;
        
        return (
          <li key={event.id} onClick={() => dispatch({ type: 'SET_TIME', payload: { event, timeSeconds } }) }>
            {timeString}
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;
