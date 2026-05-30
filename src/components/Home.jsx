import StateList from "./StateList";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Home = () => {
  const {
    searchResults: states,
    statesFetchError: fetchError,
    statesLoading: isLoading,
    setStateCode,
  } = useContext(DataContext);
  return (
    <main className="Home">
      {isLoading && <p className="loading">Loading items...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}

      {!isLoading &&
        !fetchError &&
        (states.length === 0 ? (
          <p style={{ marginTop: "1rem" }}>No states to display.</p>
        ) : (
          <StateList states={states} setStateCode={setStateCode} />
        ))}
    </main>
  );
};

export default Home;
