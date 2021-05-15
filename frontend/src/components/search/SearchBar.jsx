// NPM Packages
import Reach from "react";
import { useHistory } from "react-router-dom";

export default function SearchBar(){
    // Local State
    const [query, setQuery] = useState("");

    // Constants
    const history = useHistory();

    // Methods
    function searchUser(event) {
        event.preventDefault();
        history.push(`/results/${query}`);
    }

    return (
        <div>
          <form onSubmit={searchUser} className="SearchUser">
            <label htmlFor="sender-search" className="search-label" id="search-label">
              Search by user's name
            </label>
            <div className="search-input">
              <input
                type="text"
                id="sender-search"
                placeholder="Enter name of user"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="search-box"
              />
              <input type="submit" value="Search" className="search-button" />
            </div>
          </form>
        </div>
      );
}