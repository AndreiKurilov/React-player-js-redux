const initialState = {
  events: [],
  playerRef: null,
  overlayRef: null
}

const setOverlayStyle = (overlayRef, event) => {
  overlayRef.current.style.cssText = `
    top: ${event.zone.top}px;
    left: ${event.zone.left}px;
    width: ${event.zone.width}px;
    height: ${event.zone.height}px;
  `;
}

export default function rootReducer(state = initialState, action) {
  switch(action.type) {

    case 'SET_DATA': return { ...state, events: action.payload };

    case 'SET_REF': 
      const { playerRef, overlayRef } = action.payload;
      return { ...state, playerRef, overlayRef };

    case 'SET_STYLE': 
      setOverlayStyle(state.overlayRef, action.payload);
      return state;

    case 'SET_TIME': 
      const { event, timeSeconds } = action.payload;

      state.playerRef.current.currentTime = timeSeconds;
      state.playerRef.current.play();
      setOverlayStyle(state.overlayRef, event);
    
      let stop = timeSeconds + (event.duration / 1000);
    
      const interval = setInterval(() => {
        if (state.playerRef.current.currentTime >= stop) {
          state.overlayRef.current.style.display = 'none';
          clearInterval(interval);
        }
      }, 100);

      return { ...state };

    default: return state;
  }
}
