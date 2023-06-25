import axios from 'axios';

export default function actionGetData() {
  return (dispatch) => {
    axios
    .get("http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd")
    .then(({ data }) => {
      dispatch({ type: 'SET_DATA', payload: data });
    })
    .catch(error => {
      console.log(error);
    });
  }
}
