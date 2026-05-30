import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import FunFacts from "./Funfacts";
import DataContext from "../context/DataContext";

const StatePage = () => {
  const {
    fetchedState: state,
    funFacts,
    stateFetchError: fetchError,
    stateLoading: isLoading,
    setStateCode,
  } = useContext(DataContext);

  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setStateCode(code);
  }, [code, setStateCode]);

  return (
    <main className="StatePage">
      <article className="state">
        {isLoading && <p className="loading">Loading items...</p>}

        {!isLoading && fetchError && (
          <p className="statusMsg" style={{ color: "red" }}>
            {fetchError}
          </p>
        )}

        {!isLoading && !fetchError && state && (
          <>
            <h2>{state.state}</h2>
            <ul>
              <li>Capital City: {state.capital_city}</li>
              <li>Nick Name: {state.nickname}</li>
              <li>Admission Date: {state.admission_date}</li>
              <li>Admission Number: {state.admission_number}</li>
              <li>Population: {state.population}</li>
              <li>Population Rank: {state.population_rank}</li>
            </ul>
            <h3>Fun Facts</h3>

            {(!funFacts || funFacts.length === 0) && (
              <>
                <p style={{ marginBottom: "0.5rem" }}>
                  Be the first to contribute fun facts about {state.state}.
                </p>
                <button className="modifyButton" onClick={() => navigate(`/contribute`)}>
                  Contribute
                </button>
              </>
            )}

            {funFacts && funFacts.length > 0 && (
              <>
                <ul>
                  {funFacts.map((funfact, index) => (
                    <li key={`fact-${index}`}>
                      <FunFacts funfact={funfact} />
                    </li>
                  ))}
                </ul>
                <button
                  className="modifyButton"
                  onClick={() => navigate(`/state/${state.code}/funfacts`)}
                >
                  Modify FunFacts
                </button>
              </>
            )}
          </>
        )}

        {!isLoading && !fetchError && !state && (
          <>
            <h2>State Not Found</h2>
            <p>
              <Link to="/">Please Visit our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default StatePage;
