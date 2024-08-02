import "./item.scss";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";

interface Props {
  itemUuid: string;
  name: string;
  price: number;
  img: string;
  index: number;
  showOnShop: boolean;
  isNew: boolean;
}

const Item = ({
  itemUuid,
  name,
  price,
  img,
  index,
  isNew,
  showOnShop,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      pathname: "/catalogue/item",
      search: `?item=${itemUuid}`,
    });
  };

  return (
    <>
      {showOnShop ? (
        <motion.div
          className="Catalogue__Item"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: (index + 1) / 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          {isNew && (
            <div className="Catalogue__Item__New">
              <h3>NEW COLLECTION 🎉</h3>
            </div>
          )}
          <img src={img} alt={`${name} shirt image`} />
          <h2>{name}</h2>
          <p>{formatCurrency(price)}</p>
        </motion.div>
      ) : null}
    </>
  );
};

export default Item;
