import { useState, useEffect } from "react";
import "./App.css";
import background from "./img/moskva.jpg";

function App() {
  const [endPoint, setEndPoint] = useState("");

  const [container, setContainer] = useState([]);

  const [finalPoint, setFinalPoint] = useState("");

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  const fetchMe = () => {
    fetch(
      `  https://online-movie-database.p.rapidapi.com/auto-complete?q=${endPoint}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "f9f49420dfmsha76c1f926b144fbp1701cbjsnc9f8d609b165",
          "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setContainer(data.d))
      .catch((err) => console.error(err));
  };

  const onChangeHandler = (e) => {
    setEndPoint(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  };

  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <form onSubmit={submitHandler}>
        <input type="text" value={endPoint} onChange={onChangeHandler} />
        <button>Submit</button>
      </form>
      <div className="element">
        {container.map((item, index) => {
          return (
            <div key={index} className="element-div">
              <img src={item.i.imageUrl} alt="movie" />
              <p>{item.l}</p>
              <p>{item.y}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
