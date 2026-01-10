import React, { useContext } from "react";
import {CartContext} from "../components/CartContext";
import {Link, NavLink} from "react-router-dom";
import "../styles/styles.css";
import {formatPrice} from "../components/formatPrice";

function Cart() {
    const { cart, increase, decrease, remove, totalPrice } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="cart-empty-page">
                <div className="cart-empty-header">
                    <h2>GIỎ HÀNG</h2>
                    <Link to="/menu" className="continue-shopping">
                        <span className="cart-icon-empty"><i className="fa-solid fa-cart-plus"></i></span>
                        Mua thêm sản phẩm khác
                    </Link>
                </div>

                <div className="cart-empty-content">
                    <img
                        src={"https://etecvn.com/default/template/img/cart-empty.png"}
                        alt="Giỏ hàng trống"
                        className="cart-empty-img"
                    />
                    <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-wrapper">
            <h2 className="cart-title">Giỏ hàng</h2>

            <div className="cart-table-box">
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên món</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                        {/*<th>Ghi chú</th>*/}
                        <th></th>

                    </tr>
                    </thead>

                    <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>
                                <NavLink to={`/product/${item.id}`}>
                                    <img src={item.img} className="cart-img" alt={item.name}/>
                                </NavLink>

                            </td>

                            <td>{item.name}</td>

                            <td>{formatPrice(item.price)}</td>

                            <td>
                                <div className="qty-box">
                                    <button onClick={() => decrease(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increase(item.id)}>+</button>
                                </div>
                            </td>

                            <td>
                                {formatPrice(item.price * item.quantity)}
                            </td>

                            <td>
                                <button className="btn-remove" onClick={() => remove(item.id)}>
                                    Xóa
                                </button>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="cart-footer">
                <h3>
                    Tổng tiền:
                    <span className="total-price">
                        {formatPrice(totalPrice)}
                    </span>
                </h3>

                <Link to="/checkout">
                    <button className="btn-checkout">Đặt hàng</button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;