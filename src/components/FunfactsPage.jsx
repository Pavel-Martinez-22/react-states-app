import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import api from "../api/states";

const FunfactsPage = () => {
  const [editFunFact, setEditFunFact] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    funFacts,
    setFunFacts,
    stateCode,
    setStateCode,
    stateFetchError: fetchError,
    stateLoading: isLoading,
  } = useContext(DataContext);
  const navigate = useNavigate();

  const { code } = useParams();

  useEffect(() => {
    setStateCode(code);
  }, [code, setStateCode]);

  const handleDelete = async (index) => {
    try {
      const apiIndex = index + 1; // backend expects 1-based index

      // Axios defines DELETE as: axios.delete(url, config). Since the second argument is a config object (not the request body), any data that needs to be sent in the body must be provided under the `data` property. This API requires the index of the fun fact to delete to be sent in the request body, so we include it as `config.data`.
      const response = await api.delete(`/states/${stateCode}/funfact`, {
        data: { index: apiIndex }, // The API expects the index in the request body for DELETE requests
      });
      setFunFacts(response.data.funfacts || []); // Assuming fun facts are part of the state data, adjust if they are separate
      if (response.data.funfacts.length === 0) {
        // If there are no fun facts left after deletion, navigate back to the state page without fun facts
        navigate(`/state/${response.data.stateCode}`);
      }
    } catch (err) {
      console.log(`App.jsx - handleDelete() - Error: ${err.message}`);
    }
  };

  const handleEdit = async (index) => {
    if (editingIndex === index) {
      // SAVE
      if (!editFunFact.trim()) return;
      try {
        const apiIndex = index + 1;
        const response = await api.patch(`/states/${stateCode}/funfact`, {
          index: apiIndex,
          funfact: editFunFact.trim(),
        });
        setFunFacts(response.data.funfacts || []);
      } catch (err) {
        console.log(`App.jsx - handleEdit() - Error: ${err.message}`);
      } finally {
        setEditingIndex(null);
        setEditFunFact("");
      }
    } else {
      // ENTER EDIT MODE
      setEditingIndex(index);
      setEditFunFact(funFacts[index]); // load draft for the row being edited
    }
  };

  return (
    <main className="FunFactsPage">
      {isLoading && <p className="loading">Loading items...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}

      {!isLoading &&
        !fetchError &&
        (!funFacts || funFacts.length === 0 ? (
          <>
            <h2>Fun Facts</h2>
            <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              No fun facts available for this state.
            </p>
            <p>
              <Link to="/">Please Visit our Homepage</Link>
            </p>
          </>
        ) : (
          <>
            <h2>Fun Facts</h2>
            {funFacts.map((funfact, index) => (
              <article key={`fact-${index}`} className="state">
                <label htmlFor={`funfact-${index}`}>Fun Fact {index + 1}:</label>
                <textarea
                  id={`funfact-${index}`}
                  rows="2"
                  value={editingIndex === index ? editFunFact : funfact}
                  readOnly={editingIndex !== index}
                  onChange={(e) => {
                    setEditFunFact(e.target.value);
                  }}
                />
                <button
                  className={editingIndex !== index ? "editButton" : "saveButton"}
                  type="button"
                  onClick={() => handleEdit(index)}
                >
                  {editingIndex !== index ? "Edit Post" : "Save Post"}
                </button>
                <button className="deleteButton" onClick={() => handleDelete(index)}>
                  Delete Post
                </button>
              </article>
            ))}
          </>
        ))}
    </main>
  );
};

export default FunfactsPage;
