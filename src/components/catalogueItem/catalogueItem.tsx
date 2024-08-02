import "./catalogueItem.scss";

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../../context/shoppingCartContext";
import toast, { Toaster } from "react-hot-toast";
import { formatCurrency } from "../../utils/formatCurrency";
import { ItemBeanie, ItemShirt, ITEMS } from "../../data/items";

const notify = () =>
  toast.success("Added Item To Cart", {
    duration: 2000,
    position: "top-center",
  });

const CatalogueItem = () => {
  const [searchParams] = useSearchParams();
  const itemUuid = searchParams.get("item");

  const navigate = useNavigate();

  const [item, setItem] = useState<ItemBeanie | ItemShirt | null>(null);
  const [image, setImage] = useState([true, false]);
  const [size, setSize] = useState<string>("medium");

  const { increaseCartQuantity } = useShoppingCart();

  useEffect(() => {
    if (itemUuid === null) {
      return navigate("/404");
    }

    if (
      itemUuid !== "1" &&
      itemUuid !== "2" &&
      itemUuid !== "3" &&
      itemUuid !== "4"
    ) {
      return navigate("/404");
    }

    document.title = `${ITEMS[itemUuid].name} | STRGZE`;

    setItem(ITEMS[itemUuid]);
  }, []);

  const returnColorFromUuid = (id: string, size: string) => {
    const item = ITEMS[id];

    if (item.type === "beanie") {
      return item.color;
    } else {
      return size;
    }
  };

  return (
    <>
      <Toaster />

      {item !== null ? (
        <>
          <div className="Item">
            <div className="Item__Left">
              {(() => {
                if (item.type === "shirt") {
                  if (image[0]) {
                    return (
                      <AnimatePresence mode="wait">
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.3 }}
                          key={"1"}
                        >
                          <img src={item.img} alt="" />
                        </motion.div>
                      </AnimatePresence>
                    );
                  } else {
                    return (
                      <AnimatePresence mode="wait">
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.3 }}
                          key={"2"}
                        >
                          <img src={item.img2} alt="" />
                        </motion.div>
                      </AnimatePresence>
                    );
                  }
                } else if (item.type === "beanie") {
                  return (
                    <AnimatePresence mode="wait">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        key={"1"}
                      >
                        <img src={item.img} alt="" />
                      </motion.div>
                    </AnimatePresence>
                  );
                }
              })()}

              <div className="Item__Left__Switcher">
                {item.type === "shirt" ? (
                  <>
                    <img
                      src={item.img}
                      alt=""
                      onClick={() => {
                        setImage([true, false]);
                      }}
                    />
                    <img
                      src={item.img2}
                      alt=""
                      onClick={() => {
                        setImage([false, true]);
                      }}
                    />
                  </>
                ) : null}
              </div>
            </div>

            <div className="Item__Right">
              <div className="Item__Right__Title">
                <h2>{item.name}</h2>
                <p>{formatCurrency(item.price)}</p>
              </div>

              {item.type === "shirt" ? (
                <div className="Item__Right__Sizes">
                  {item.stock.small ? (
                    <motion.button
                      className={
                        size === "small"
                          ? "Item__Right__Sizes__ButtonActive"
                          : ""
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
                  {item.stock.medium ? (
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
                  {item.stock.large ? (
                    <motion.button
                      className={
                        size === "large"
                          ? "Item__Right__Sizes__ButtonActive"
                          : ""
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
              ) : null}

              <div className="Item__Right__AddToCart">
                <motion.button
                  onClick={() => {
                    increaseCartQuantity(
                      itemUuid as any,
                      returnColorFromUuid(item.id, size)
                    );
                    notify();
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={
                    item.type === "shirt"
                      ? !item.stock.large &&
                        !item.stock.medium &&
                        !item.stock.small
                        ? true
                        : false
                      : false
                  }
                  style={
                    item.type === "shirt"
                      ? !item.stock.large &&
                        !item.stock.medium &&
                        !item.stock.small
                        ? { background: "grey", cursor: "not-allowed" }
                        : {}
                      : {}
                  }
                >
                  ADD TO CART
                </motion.button>
              </div>

              <div className="Item__Right__Dropdowns">
                <Dropdown name="DESCRIPTION" text={item.description} />
                <Dropdown
                  name="SIZE GUIDE"
                  type={item.type}
                  sizeGuide={"One Size fits All"}
                />
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

type DropdownProps = {
  name: string;
  text?: string;
  type?: "shirt" | "beanie";
  sizeGuide?: string;
};

const Dropdown = ({ name, text, type, sizeGuide }: DropdownProps) => {
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
                if (type === "shirt") {
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
                } else if (type === "beanie") {
                  return sizeGuide;
                }
              }

              if (name === "WASH INSTRUCTIONS") {
                return (
                  <>HAND WASH, DO NOT BLEACH, DO NOT TUMBLE, DO NOT DRY CLEAN</>
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
