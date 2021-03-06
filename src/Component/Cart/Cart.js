import React, { Component } from "react";
import Navbar from "../../Component/Navbar/NavbarStore/NavbarStore";
import EmptyTable from "./Component//EmptyTable/EmptyTable";
import ProductTable from "./Component/ProductTable/ProductTable";
import FillAsidebar from "./Component/Asidebar/FillAsidebar";
import EmptyAsidebar from "./Component/Asidebar/EmptyAsidebar";
import CartFooter from "./Component/Footer/CartFooter";
import "./Cart.scss";
import { getCartAPI } from "../../config";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
      isChecked: true,
      isAllChecked: true,
      cartLength: 0,
    };
  }

  componentDidMount() {
    fetch(`${getCartAPI}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const cartList = res.product?.map((item) => {
          item["isChecked"] = true;
          return item;
        });
        this.setState({
          cartList,
        });
      });
  }

  handlePlusBtn = (item) => {
    const cartList = [...this.state.cartList];
    let idx = cartList.indexOf(item);
    let cartId = cartList[idx].cart_id;
    if (cartList[idx].quantity < 20) {
      cartList[idx].quantity++;
      this.setState({ cartList });
      fetch(`${getCartAPI}/${cartId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "POST",
        body: JSON.stringify({
          quantity: cartList[idx].quantity,
        }),
      });
    } else {
      alert("최대 주문 수량은 20개입니다");
    }
  };

  handleMinusBtn = (item) => {
    const cartList = [...this.state.cartList];
    let idx = cartList.indexOf(item);
    let cartId = cartList[idx].cart_id;

    if (cartList[idx].quantity > 1) {
      cartList[idx].quantity--;
      this.setState({ cartList });
      fetch(`${getCartAPI}/${cartId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "POST",
        body: JSON.stringify({
          quantity: cartList[idx].quantity,
        }),
      });
    } else {
      return;
    }
  };

  handleDeleteItemBtn = (item) => {
    const cartList = [...this.state.cartList];
    let idx = cartList.indexOf(item);
    let cartId = cartList[idx].cart_id;
    fetch(`${getCartAPI}/${cartId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      method: "DELETE",
    });
  };

  handleCheckAllBox = () => {
    const { isAllChecked } = this.state;
    this.setState({
      isAllChecked: !isAllChecked,
    });
    console.log(isAllChecked);
  };

  handleCheckBox = (item) => {
    this.setState({ isChecked: !item.Checked });
  };

  render() {
    const { cartList, isChecked, allCheck } = this.state;
    const {
      handlePlusBtn,
      handleMinusBtn,
      handleDeleteItemBtn,
      handleCheckBox,
    } = this;

    return (
      <>
        <Navbar />
        <div className="cart">
          <div className="allContainer">
            <div className="headContainer">
              <div className="title">
                <h2>장바구니</h2>
              </div>
              <div className="process">
                <span>장바구니 {">"} </span>
                <span>&nbsp;주문결제 {">"} 주문완료</span>
              </div>
            </div>
            <div className="mainContainer">
              <div className="cartContainer">
                <div className="header">
                  <div className="headerLeft">
                    <input
                      type="checkbox"
                      onChange="handleCheckAllBox"
                      checked={allCheck}
                    />
                    <span onClick="checkAll">전체선택</span>
                  </div>
                  <div className="headerRight">
                    <button>삭제</button>
                  </div>
                </div>
                {cartList.length ? (
                  <ProductTable
                    handlePlusBtn={handlePlusBtn}
                    handleMinusBtn={handleMinusBtn}
                    cartList={cartList}
                    isChecked={isChecked}
                    handleDeleteItemBtn={handleDeleteItemBtn}
                    handleCheckBox={handleCheckBox}
                  />
                ) : (
                  <EmptyTable />
                )}
              </div>
              {cartList.length ? (
                <FillAsidebar cartList={cartList} />
              ) : (
                <EmptyAsidebar />
              )}
            </div>
          </div>
          <CartFooter />
        </div>
      </>
    );
  }
}

export default Cart;
