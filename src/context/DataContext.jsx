import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const [states, setStates] = useState([]);
  const [funFacts, setFunFacts] = useState([]);
  const [stateCode, setStateCode] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        statesFetchError,
        statesLoading,
        stateCode,
        setStateCode,
        fetchedState,
        funFacts,
        setFunFacts,
        stateFetchError,
        stateLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
