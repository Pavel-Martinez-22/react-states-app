import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";

const FunfactsPage = ({
  funFacts,
  fetchError,
  isLoading,
  setStateCode,
  editingIndex,
  editFunFact,
  setEditFunFact,
  handleEdit,
  handleDelete,
}) => {
  const { code } = useParams();

  useEffect(() => {
    setStateCode(code);
  }, [code, setStateCode]);

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
                <input
                  type="text"
                  id={`funfact-${index}`}
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
