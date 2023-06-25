import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './VideoPlayer.css'

const VideoPlayer = () => {
  
  const playerRef = useRef();
  const overlayRef = useRef();

  const { events } = useSelector((state) => state);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch({ type: 'SET_REF', payload: { playerRef, overlayRef }});
  }, []);

  useEffect(() => {
    if (events.length) {
      events.sort((a, b) => a.timestamp - b.timestamp);
      const times = events.map((el) => el.timestamp / 1000);
      let i = 0;
      const interval = setInterval(() => {
        if (playerRef.current.currentTime > times[i]) {
          dispatch({ type: 'SET_STYLE', payload: events[i] });
        }
  
        if (playerRef.current.currentTime >= times[i] + (events[i].duration / 1000)) {
          overlayRef.current.style.display = 'none';
          

          console.log('test', playerRef.current.currentTime, times[i] + (events[i].duration / 1000))
          i++;
        }
  
        if (i === events.length) {
          clearInterval(interval);
        }
      }, 100);
    }
  }, [ events]);


  return (
    <div className="player">
      <video 
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
        ref={playerRef} 
        style={{ width: '1200px' }}
        controls={true} 
        muted={true}>
      </video>
      <div className="player-overlay" ref={overlayRef}></div>
    </div>
  );
}

export default VideoPlayer;
