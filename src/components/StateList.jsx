import State from "./State";

const StateList = ({ states, setStateCode }) => {
  return (
    <>
      {states.map((state) => (
        <State key={state.code} state={state} setStateCode={setStateCode} />
      ))}
    </>
  );
};

export default StateList;
