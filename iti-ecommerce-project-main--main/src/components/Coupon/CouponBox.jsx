import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaTag } from "react-icons/fa";
import toast from "react-hot-toast";
import "./coupon.css";

function CouponBox() {
  const { appliedCoupon, applyCoupon, removeCoupon } = useContext(CartContext);
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const success = applyCoupon(code);
    if (success) {
      toast.success(`Coupon "${code.trim().toUpperCase()}" applied!`);
      setCode("");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const handleRemove = () => {
    removeCoupon();
    toast("Coupon removed", { icon: "🗑️" });
  };

  return (
    <div className="coupon_box">
      {appliedCoupon ? (
        <div className="coupon_applied">
          <span><FaTag /> {appliedCoupon.code} (-{appliedCoupon.discount}%)</span>
          <button type="button" onClick={handleRemove}>Remove</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="coupon_form">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">Apply</button>
        </form>
      )}
    </div>
  );
}

export default CouponBox;