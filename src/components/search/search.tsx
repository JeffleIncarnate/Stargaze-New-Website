import "./search.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");

  return (
    <main className="Search">
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        className="Search__Container"
      >
        <input
          onChange={(e) => {
            setSearchParams(
              (prev) => {
                prev.set("q", e.target.value);
                return prev;
              },
              { replace: true }
            );
          }}
          type="text"
          value={q ?? ""}
          placeholder="SEARCH"
        />
        <FontAwesomeIcon
          className="Search__Container__Icon"
          icon={faArrowRight}
        />
      </motion.div>
    </main>
  );
};

export default Search;
