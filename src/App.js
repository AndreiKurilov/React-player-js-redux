import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actionGetData from './actions/actionGetData';

import EventList from './components/EventList/EventList';
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetData());
  }, []);

  return (
    <div>
      <VideoPlayer />
      <EventList />
    </div>
  );
}

export default App;
