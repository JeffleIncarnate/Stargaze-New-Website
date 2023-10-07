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
}

const Item = ({ itemUuid, name, price, img, index }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      pathname: "/catalogue/item",
      search: `?item=${itemUuid}`,
    });
  };

  return (
    <motion.div
      className="Catalogue__Item"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 + index + 0.5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <img src={img} alt={`${name} shirt image`} />
      <h2>{name}</h2>
      <p>{formatCurrency(price)}</p>
    </motion.div>
  );
};

export default Item;
