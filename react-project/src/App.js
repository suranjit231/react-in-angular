// App.js
import { useEffect, useState } from "react";
import Calculator from "./compoents/Calcultor";

function App(props) {
  const [userId, setUserId] = useState(null);

  console.log("props in react app components: ", props);
  const { routeParams, onCalculate } = props;

  console.log(" routeParams, onCalculate : ", routeParams, onCalculate)

  useEffect(() => {
    if (routeParams?.id) {
      setUserId(routeParams.id);
    }
  }, [routeParams]);

  return (
    <div className="App">
      {userId && (
        <div>User ID: {userId}</div>
      )}
      <Calculator onCalculate={onCalculate} />
    </div>
  );
}

export default App;
