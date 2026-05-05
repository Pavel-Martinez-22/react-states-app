import { Link } from "react-router-dom";

const State = ({ state, setStateCode }) => {
  return (
    <article className="state">
      <Link to={`/state/${state.code}`} onClick={() => setStateCode(state.code)}>
        <h2>{state.state}</h2>
        <p className="stateCapital">Capital City: {state.capital_city}</p>
        <p className="stateInfo"> Click for more details about {state.state}</p>
      </Link>
    </article>
  );
};

export default State;
