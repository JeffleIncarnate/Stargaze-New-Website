import "./catalogueItem.scss";

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CMWYSG_SHIRT,
  HEART_SHIRT,
  FRONT_OF_SHIRTS,
} from "../../assets/__img__";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../../context/shoppingCartContext";
import toast, { Toaster } from "react-hot-toast";
import { formatCurrency } from "../../utils/formatCurrency";
import { items } from "../../data/items";

interface Item {
  itemUuid: string;
  name: string;
  price: number;
  backOfShirt: string;
  frontOfShirt: string;
  description: string;
}

const notify = () =>
  toast.success("Added Item To Cart", {
    duration: 2000,
    position: "top-center",
  });

const itemsInComponent = {
  "1": {
    itemUuid: "1",
    name: "CMWYSG TEE",
    price: 45,
    backOfShirt: CMWYSG_SHIRT,
    frontOfShirt: FRONT_OF_SHIRTS,
    description:
      "Introducing our premium oversized box tee, crafted from 100% cotton for unparalleled comfort. Designed with street wear in mind, it features a high ribbed neck and slouched shoulders for a relaxed fit. The tee boasts both puff and screen print detailing perfect for a night out stargazing",
  },
  "2": {
    itemUuid: "2",
    name: "STRGZE OG TEE",
    price: 45,
    backOfShirt: HEART_SHIRT,
    frontOfShirt: FRONT_OF_SHIRTS,
    description:
      "Premium oversized box tee, includes puff and screen print. designed in mind for anyone trying to rizz up that special someone",
  },
};

const CatalogueItem = () => {
  const [searchParams] = useSearchParams();
  const itemUuid = searchParams.get("item");

  const navigate = useNavigate();

  const [item, setItem] = useState<Item | null>(null);
  const [image, setImage] = useState([true, false]);
  const [size, setSize] = useState<string>("medium");

  const { increaseCartQuantity } = useShoppingCart();

  useEffect(() => {
    if (itemUuid === null) {
      return navigate("/404");
    }
    if (itemUuid !== "1" && itemUuid !== "2") {
      return navigate("/404");
    }

    document.title = `${itemsInComponent[itemUuid].name} | STRGZE`;

    setItem(itemsInComponent[itemUuid]);
  }, []);

  return (
    <>
      <Toaster />

      {item !== null ? (
        <>
          <div className="Item">
            <div className="Item__Left">
              {image[0] ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      key={"1"}
                    >
                      <img src={item.backOfShirt} alt="" />
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      key={"2"}
                    >
                      <img src={item.frontOfShirt} alt="" />
                    </motion.div>
                  </AnimatePresence>
                </>
              )}

              <div className="Item__Left__Switcher">
                <img
                  src={item.backOfShirt}
                  alt=""
                  onClick={() => {
                    setImage([true, false]);
                  }}
                />
                <img
                  src={item.frontOfShirt}
                  alt=""
                  onClick={() => {
                    setImage([false, true]);
                  }}
                />
              </div>
            </div>

            <div className="Item__Right">
              <div className="Item__Right__Title">
                <h2>{item.name}</h2>
                <p>{formatCurrency(item.price)}</p>
              </div>

              <div className="Item__Right__Sizes">
                {items[item.itemUuid as keyof typeof items].stock.small ? (
                  <motion.button
                    className={
                      size === "small" ? "Item__Right__Sizes__ButtonActive" : ""
                    }
                    onClick={() => {
                      setSize("small");
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    SMALL
                  </motion.button>
                ) : (
                  <p>OUT OF STOCK</p>
                )}
                {items[item.itemUuid as keyof typeof items].stock.medium ? (
                  <motion.button
                    className={
                      size === "medium"
                        ? "Item__Right__Sizes__ButtonActive"
                        : ""
                    }
                    onClick={() => {
                      setSize("medium");
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    MEDIUM
                  </motion.button>
                ) : (
                  <p>OUT OF STOCK</p>
                )}
                {items[item.itemUuid as keyof typeof items].stock.large ? (
                  <motion.button
                    className={
                      size === "large" ? "Item__Right__Sizes__ButtonActive" : ""
                    }
                    onClick={() => {
                      setSize("large");
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    LARGE
                  </motion.button>
                ) : (
                  <p>OUT OF STOCK</p>
                )}
              </div>

              <div className="Item__Right__AddToCart">
                <motion.button
                  onClick={() => {
                    increaseCartQuantity(itemUuid as any, size);
                    notify();
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  ADD TO CART
                </motion.button>
              </div>

              <div className="Item__Right__Dropdowns">
                <Dropdown name="DESCRIPTION" text={item.description} />
                <Dropdown name="SIZE GUIDE" />
                <Dropdown name="WASH INSTRUCTIONS" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2>loading...</h2>
      )}
    </>
  );
};

interface DropdownProps {
  name: string;
  text?: string;
}

const Dropdown = ({ name, text }: DropdownProps) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);

  return (
    <div className="Item__Right__Dropdown">
      <div
        className="Item__Right__Dropdown__Name"
        onClick={() => {
          setShowDescription((previous) => !previous);
        }}
      >
        {name}
        {showDescription ? (
          <FontAwesomeIcon key="icon1" icon={faMinus} />
        ) : (
          <FontAwesomeIcon key="icon2" icon={faPlus} />
        )}
      </div>
      <AnimatePresence mode="wait">
        {showDescription ? (
          <motion.div
            className="Item__Right__Dropdown__Description"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {(() => {
              if (name === "SIZE GUIDE") {
                return (
                  <>
                    SMALL <br></br>
                    Chest: 104CM / 40.9”<br></br>
                    Length: 65CM / 25.5”<br></br>
                    <br></br>
                    MEDIUM<br></br>
                    Chest: 110CM / 43.3”<br></br>
                    Length: 69CM / 27.1”<br></br>
                    <br></br>
                    LARGE<br></br>
                    Chest: 116CM / 45.6”<br></br>
                    Length: 72CM / 28.3”<br></br>
                  </>
                );
              }

              if (name === "WASH INSTRUCTIONS") {
                return (
                  <>
                    WASH MACHINE, DO NOT BLEACH, DO NOT TUMBLE, DO NOT DRY CLEAN
                  </>
                );
              }

              return text;
            })()}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default CatalogueItem;
