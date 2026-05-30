import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Nav = () => {
  const { search, setSearch } = useContext(DataContext);

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="search">Search States</label>
        <input
          id="search"
          type="text"
          placeholder="Search States"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contribute">Contribute</Link>
        </li>
        <li>
          <Link to="/about-interface">Interface</Link>
        </li>
        <li>
          <Link to="/about-api">API</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
