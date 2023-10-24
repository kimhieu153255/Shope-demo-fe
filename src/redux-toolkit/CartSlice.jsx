import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CartItems: [],
  BuyList: [],
  total: 0,
};

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const index = state.CartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index >= 0) {
        state.CartItems[index].quantity += action.payload.quantity;
      } else {
        state.CartItems.push(action.payload);
      }
    },

    setCartItems: (state, action) => {
      state.CartItems = action.payload;
    },

    checkedStore: (state, action) => {
      state.CartItems.map((item) => {
        if (item.store === action.payload) {
          item.checked = !item.checked;
          item.items.map((el) => (el.check = item.checked));
        }
      });
      let tempCartItems = state.CartItems.filter(
        (item) => item.store === action.payload
      );
      tempCartItems.map((item) => {
        item.items.map((el) => {
          if (el.check) {
            if (state.BuyList.filter((e) => e.id === el.id).length !== 0)
              return;
            state.BuyList.push({
              id: el.id,
              imgSrc: el.img,
              name: el.name,
              color: el.color,
              size: el.size,
              quantity: el.quantity,
              price: el.price,
            });
          } else {
            state.BuyList = state.BuyList.filter((item) => item.id !== el.id);
          }
        });
      });
      state.total = state.BuyList.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
    },

    checkedProduct: (state, action) => {
      state.CartItems.map((item) => {
        item.items.map((el) => {
          if (el.id === action.payload) el.check = !el.check;
        });
      });
    },

    encreaseQuantity: (state, action) => {
      const { id, isEncrease } = action.payload;
      state.CartItems.map((item) => {
        item.items.map((el) => {
          if (el.id === id) {
            if (isEncrease) {
              el.quantity += 1;
              if (el.check) {
                state.total += el.price;
              }
            } else if (el.quantity > 1) {
              el.quantity -= 1;
              if (el.check) {
                state.total -= el.price;
              }
            }
          }
        });
      });
      state.BuyList.map((item) => {
        if (item.id === id) {
          if (isEncrease) {
            item.quantity += 1;
          } else if (item.quantity > 1) {
            item.quantity -= 1;
          }
        }
      });
    },

    deleteProduct: (state, action) => {
      console.log("deleteProduct");
      const { id, color, size } = action.payload;
      state.BuyList = state.BuyList.filter(
        (item) => item.id !== id || item.size !== size || item.color !== color
      );
    },

    buyProduct: (state, action) => {
      console.log("buyProduct");
      const { check, id, colorChosen, sizeChosen, num, price, name, imgSrc } =
        action.payload;
      if (!check) {
        if (state.BuyList.filter((e) => e.id === id).length !== 0) return;
        state.total += price * num;
        state.BuyList.push({
          id,
          color: colorChosen,
          name,
          imgSrc,
          size: sizeChosen,
          quantity: num,
          price,
        });
      } else {
        console.log("deleteProduct");
        state.total -= price * num;
        state.BuyList = state.BuyList.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },

    updateColor: (state, action) => {
      const { id, color } = action.payload;
      state.BuyList.map((item) => {
        if (item.id === id) {
          item.color = color;
        }
      });
      state.CartItems.map((item) => {
        item.items.map((el) => {
          if (el.id === id) {
            el.color = color;
          }
        });
      });
    },

    updateSize: (state, action) => {
      const { id, size } = action.payload;
      state.BuyList.map((item) => {
        if (item.id === id) {
          item.size = size;
        }
      });
      state.CartItems.map((item) => {
        item.items.map((el) => {
          if (el.id === id) {
            el.size = size;
          }
        });
      });
    },

    updateQuantity: (state, action) => {
      const { id, num } = action.payload;
      state.BuyList.map((item) => {
        if (item.id === id) {
          item.quantity = num;
        }
      });
    },

    resetQuantity: (state, action) => {
      const { id } = action.payload;
      state.BuyList.map((item) => {
        if (item.id === id) item.quantity = 1;
      });
      state.CartItems.map((item) => {
        item.items.map((el) => {
          if (el.id === id) el.quantity = 1;
        });
      });
    },

    payment: (state, action) => {
      const { id } = action.payload;
      console.log(id);
      const temp = state.BuyList.map((item) => {
        if (!item.color || !item.size) {
          return "chosen color and size";
        }
      });
      if (temp.includes("chosen color and size")) return;
      console.log("payment");
    },

    removeCart: (state, action) => {
      console.log("removeCart");
      const { id, size, color } = action.payload;

      state.total =
        state.total -
          state.BuyList.filter(
            (item) =>
              item.id === id && item.size === size && item.color === color
          )[0]?.price || 0;

      state.BuyList = state.BuyList.filter(
        (item) => item.id !== id || item.size !== size || item.color !== color
      );

      state.CartItems.forEach((item) => {
        item.items = item.items.filter(
          (el) => el.id !== id || el.size !== size || el.color !== color
        );
      });

      state.CartItems = state.CartItems.filter((item) => item.items.length > 0);
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  AddToCart,
  setCartItems,
  checkedStore,
  checkedProduct,
  buyProduct,
  deleteProduct,
  totalPayment,
  encreaseQuantity,
  updateColor,
  updateSize,
  resetQuantity,
  payment,
  removeCart,
} = CartSlice.actions;
export default CartSlice.reducer;
