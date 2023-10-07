import "./search.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <main>
      <div>
        <input type="search" />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </main>
  );
};

export default Search;
