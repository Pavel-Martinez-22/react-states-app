import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ContributePage from "./components/ContributePage";
import StatePage from "./components/StatePage";
import FunfactsPage from "./components/FunfactsPage";
import AboutInterface from "./components/AboutInterface";
import AboutAPI from "./components/AboutAPI";
import Missing from "./components/Missing";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api/states";

function App() {
  const [states, setStates] = useState([]);
  const [state, setState] = useState(null);
  const [funFacts, setFunFacts] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postFunFact, setPostFunFact] = useState("");
  const [postCode, setPostCode] = useState("");
  const [editFunFact, setEditFunFact] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //const [refetchKey, setRefetchKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStates = async () => {
      setIsLoading(true);
      try {
        // Axios defines GET as: axios.get(url, config). GET requests do not send a request body, so the data returned by the API is provided entirely in the response object. Once the request succeeds, Axios places the parsed response payload on `response.data`, which we then store in state for use throughout the application.

        const response = await api.get("/states");
        if (response && response.data) setStates(response.data);
      } catch (err) {
        if (err.response) {
          console.log("App.jsx - fetchStates() - data:", err.response.data);
          console.log("App.jsx - fetchStates() - status:", err.response.status);
          console.log("App.jsx - fetchStates() - headers:", err.response.headers);
        } else {
          console.log("App.jsx - fetchStates() - Errormessage:", err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchState = async () => {
      if (!stateCode) return;
      setIsLoading(true);
      try {
        const response = await api.get(`/states/${stateCode}`);
        if (response && response.data) {
          setState(response.data);
          setFunFacts(response.data.funfacts || []); // Assuming fun facts are part of the state data, adjust if they are separate
        }
      } catch (err) {
        if (err.response) {
          console.log("App.jsx - fetchState() - data:", err.response.data);
          console.log("App.jsx - fetchState() - status:", err.response.status);
          console.log("App.jsx - fetchState() - headers:", err.response.headers);
        } else {
          console.log("App.jsx - fetchState() - Errormessage:", err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchState();
  }, [stateCode]); // [stateCode, refetchKey] removed it for now but can be used, refetchKey is included to allow re-fetching the state data after adding a new fun fact, ensuring the UI updates with the latest information

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
    <div className="App">
      <Header title="States App" />
      <Nav search={search} setSearch={setSearch} />

      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Home states={searchResults} isLoading={isLoading} setStateCode={setStateCode} />
            }
          />
        </Route>

        <Route path="/contribute">
          <Route
            index
            element={
              <ContributePage
                handleSubmit={handleSubmit}
                postFunFact={postFunFact}
                setPostFunFact={setPostFunFact}
                postCode={postCode}
                setPostCode={setPostCode}
              />
            }
          />
        </Route>

        <Route path="/state">
          <Route index element={<Navigate to="/" replace />} />
          <Route
            path=":code"
            element={
              <StatePage
                state={state}
                funFacts={funFacts}
                isLoading={isLoading}
                setStateCode={setStateCode}
              />
            }
          />
          <Route
            path=":code/funfacts"
            element={
              <FunfactsPage
                funFacts={funFacts}
                isLoading={isLoading}
                setStateCode={setStateCode}
                editingIndex={editingIndex}
                editFunFact={editFunFact}
                setEditFunFact={setEditFunFact}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            }
          />
        </Route>

        <Route path="/about-interface" element={<AboutInterface />} />
        <Route path="/about-api" element={<AboutAPI />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
