import StateList from "./StateList";

const Home = ({ states, setStateCode, isLoading }) => {
  return (
    <main className="Home">
      {isLoading && <p className="loading">Loading items...</p>}
      {!isLoading && states.length === 0 && (
        <p style={{ marginTop: "1rem" }}>No states to display.</p>
      )}
      {states.length > 0 && <StateList states={states} setStateCode={setStateCode} />}
    </main>
  );
};

export default Home;
