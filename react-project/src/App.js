// App.js
import { useEffect, useState } from "react";
import Calculator from "./compoents/Calcultor";

function App(props) {
  console.log("Props in App comming from angular:", props);
  const [userId, setUserId] = useState(null);

  // Safely destructure routeParams with a default empty object
  const { routeParams = {} } = props || {};

  console.log("route params: ", routeParams)

  useEffect(() => {
    console.log("Route params in effect:", routeParams);
    if (routeParams?.id) {
      setUserId(routeParams.id);
    }
  }, [routeParams]);

  console.log("userId in state:", userId);





  const urlParams = window.location.pathname.split('/');
  console.log('URL params by location and programatically:', urlParams); 
  

  return (
    <div className="App">
      {userId && (
        <div>User ID: {userId}</div>
      )}
      <Calculator />
    </div>
  );
}

export default App;






















