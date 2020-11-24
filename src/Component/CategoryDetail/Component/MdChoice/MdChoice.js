import React, { Component } from "react";
import "./MdChoice.scss";
import Pagination from "./Pagination";
// import Unisex from

class MdChoice extends Component {
  constructor() {
    super();
    this.state = {
      mdChoiceList: [],
      currentCategory: 0,
      offset: 1,
    };
  }

  getAllData = () => {
    fetch("http://10.58.0.175:8000/products/mdchoice", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("cdm ->", res);
        this.setState({
          mdChoiceList: res.mdchoice_list,
        });
      });
  };

  componentDidMount() {
    this.getAllData();
  }

  fetchProduct = (e) => {
    const LIMIT = 8;
    const offset = e.target.dataset.idx * LIMIT;

    fetch(
      `http://10.58.0.175:8000/products/mdchoice?limit=${LIMIT}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("function", res);
        this.setState({
          mdChoiceList: res.mdchoice_list,
        });
      });
  };

  handleMenuTab = (e) => {
    console.log(e);
  };

  render() {
    const { mdChoiceList } = this.state;
    const { fetchProduct } = this;

    return (
      <div className="MdChoice">
        <div className="title">
          <p>MD's 추천</p>
        </div>
        <div className="cardList">
          {mdChoiceList.map((product, idx) => {
            return (
              <div className="rankingCardList" key={idx}>
                <div className="eachCard">
                  <div className="productImgBox">
                    <img
                      className="productImg"
                      alt="제품사진"
                      src={product.main_image_url}
                    ></img>
                  </div>
                  <div className="productDescBox">
                    <div>
                      <span className="brandName">{product.brand}</span>
                    </div>
                    <div className="productName">
                      <span>{product.title}</span>
                    </div>
                    <div className="discountPriceBox">
                      <span className="discount">
                        [{parseInt(product.discount_rate * 100)}%]
                      </span>
                      <span className="productPrice">
                        {(product.discount_price * 1)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </span>
                    </div>
                    <div className="orignalPriceBox">
                      <span>
                        {(product.price * 1)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ranking">
                  <span>{product.id} </span>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination fetchProduct={fetchProduct} />
      </div>
    );
  }
}

export default MdChoice;
