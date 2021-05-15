// NPM Packages
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserApi from "../../api/UserApi";

export default function SearchBar(){
    // Local State
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    // Constants
    const history = useHistory();

    useEffect(() => {
      UserApi.getUserById()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => console.error(err));
    }, [setUsers]);

    // Methods
    function searchUser(event) {
        event.preventDefault();
        //Find out the user by the Id
        history.push(`/profile/${query}`);
    }

    return (
        <div>
          <form onSubmit={searchUser} className="SearchUser">
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