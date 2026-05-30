import { createContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import api from "../api/states";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [states, setStates] = useState([]);
  const [funFacts, setFunFacts] = useState([]);
  const [stateCode, setStateCode] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postFunFact, setPostFunFact] = useState("");
  const [postCode, setPostCode] = useState("");
  const [editFunFact, setEditFunFact] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  //const [refetchKey, setRefetchKey] = useState(0);
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const {
    data: fetchedStates,
    fetchError: statesFetchError,
    isLoading: statesLoading,
  } = useAxiosFetch("https://full-stack-api-states.onrender.com/states");

  const stateUrl = stateCode
    ? `https://full-stack-api-states.onrender.com/states/${stateCode}`
    : null;

  const {
    data: fetchedState,
    fetchError: stateFetchError,
    isLoading: stateLoading,
  } = useAxiosFetch(stateUrl);

  useEffect(() => {
    setStates(fetchedStates || []); // Ensure states is always an array, even if fetchedStates is null or undefined
  }, [fetchedStates]);

  useEffect(() => {
    setFunFacts(fetchedState?.funfacts || []); // Assuming fun facts are part of the state data, adjust if they are separate
  }, [fetchedState]);

  useEffect(() => {
    const filteredStates = states.filter(
      (individualState) =>
        individualState.state.toLowerCase().includes(search.toLowerCase()) ||
        individualState.code.toLowerCase().includes(search.toLowerCase()) ||
        individualState.nickname.toLowerCase().includes(search.toLowerCase()) ||
        individualState.capital_city.toLowerCase().includes(search.toLowerCase()),
    );

    setSearchResults(filteredStates);
  }, [states, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //A Guard against empty input (prevents adding blank fun facts)
    if (!postFunFact.trim()) return;
    if (!postCode) return;

    try {
      // Axios POST signature: axios.post(url, requestBody, config) The second argument is treated as the request body and is automatically serialized to JSON. The state code is part of the URL path per the API design. Since we don’t need custom headers or other options, the config argument is omitted.

      const response = await api.post(`/states/${postCode}/funfact`, {
        funfacts: [postFunFact.trim()], // The API expects an array of fun facts, we wrap the single fun fact in an array.
      });
      setFunFacts(response.data.funfacts || []); // Assuming fun facts are part of the state data, adjust if they are separate
      setPostCode("");
      setPostFunFact("");
      navigate(`/state/${response.data.stateCode}`); // Navigate to the state page of the newly added fun fact
      // setRefetchKey((prev) => prev + 1); // Trigger re-fetch of state data to update the UI with the new fun fact
    } catch (err) {
      console.log("App.jsx - handleSubmit() - Errormessage:", err.message);
    }
  };

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
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        statesFetchError,
        statesLoading,
        setStateCode,
        handleSubmit,
        postFunFact,
        setPostFunFact,
        postCode,
        setPostCode,
        fetchedState,
        funFacts,
        stateFetchError,
        stateLoading,
        editingIndex,
        editFunFact,
        setEditFunFact,
        handleEdit,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
