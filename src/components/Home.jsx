import StateList from "./StateList";

const Home = ({ states, fetchError, isLoading, setStateCode }) => {
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
