import { createContext, useEffect, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

const VALID_COUPONS = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME15: 15,
};

export default function CartProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFav = localStorage.getItem("favoritesItems");
    return savedFav ? JSON.parse(savedFav) : [];
  });

  const addToFavorites = (item) => {
    setFavorites((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((i) => i.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("favoritesItems", JSON.stringify(favorites));
  }, [favorites]);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem("appliedCoupon");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem("appliedCoupon");
    }
  }, [appliedCoupon]);

  const applyCoupon = (code) => {
    const upperCode = code.trim().toUpperCase();
    if (VALID_COUPONS[upperCode]) {
      setAppliedCoupon({ code: upperCode, discount: VALID_COUPONS[upperCode] });
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("addresses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (address) => {
    const newAddress = { ...address, id: Date.now() };
    setAddresses((prev) => [...prev, newAddress]);
  };

  const updateAddress = (id, updatedFields) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, ...updatedFields } : addr))
    );
  };

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved ? JSON.parse(saved) : { name: "", email: "", phone: "" };
  });

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updatedFields) => {
    setProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData) => {
    const address = orderData.address;
    const paymentInfo = orderData.paymentInfo;

    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      subtotal = subtotal + cartItems[i].price * cartItems[i].quantity;
    }

    const discountPercent = appliedCoupon ? appliedCoupon.discount : 0;
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal - discountAmount;

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      subtotal: subtotal,
      coupon: appliedCoupon,
      discountAmount: discountAmount,
      total: total,
      address: address,
      paymentInfo: {
        cardHolder: paymentInfo.cardHolder,
        last4: paymentInfo.cardNumber.slice(-4),
      },
      status: "Confirmed",
      date: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    removeCoupon();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        favorites,
        addToFavorites,
        removeFromFavorites,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addresses,
        addAddress,
        updateAddress,
        removeAddress,
        profile,
        updateProfile,
        orders,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}