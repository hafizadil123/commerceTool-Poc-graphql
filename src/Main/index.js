import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import selectedImage from "../images/phone_selected.png";
import samsungGlaxy from "../images/samsung-galaxy-s20.jpg";
import selected from "../images/phone_selected.png";
import secondImage from "../images/apple-iphone-xs-new.jpg";
const Main = (props) => {
  const {
    data,
    graphQLdata: { products },
  } = props && props;

  const [productsShow, setShowProducts] = useState(null);

  useEffect(() => {
    getProducts("443a3360-48c2-4852-a32a-1002ec3e12c3");
  }, []);
  const getCategory =
    products &&
    products.results.map(
      (item) =>
        item.masterData &&
        item.masterData.current &&
        item.masterData.current.categories
    );
  const FlattenArray = getCategory.flat(Infinity);

  const getProducts = (categoryId) => {
    console.log('cateogries', categoryId);
    const final =
      data &&
      data.results.filter((product, index) => {
        const categories = product.masterData.current.categories.filter(
          (el) => el.id === categoryId
        );
        return categories.length > 0;
      });
    // const flatFinal = final.flat(Infinity);
    // const productAll = products
    // setShowProducts(final)
    setShowProducts(final);
    console.log("ali", final);
  };
  return (
    <>
      <main>
        <section className="heading-bar">
          <div className="container">
            <div className="section-heading">
              <h2>Customization</h2>
              <div className="content">
                <form>
                  <span>Check your availability</span>
                  <label className="sr-only" htmlFor="checkform">
                    Check your availability
                  </label>
                  <input
                    name="postalCode"
                    id="checkform"
                    placeholder="Postal code"
                    type="text"
                  />
                  <a className="btn" aria-label="Search by postal code">
                    <i className="fas fa-angle-right" />
                  </a>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="starter-package">
          <div className="container">
            <div className="intro">
              <div className="row">
                <div className="col-sm-12">
                  <p>
                    Only need the basics? With our Starter Package you get the
                    channels you want.
                  </p>
                </div>
              </div>
            </div>
            <div className="package">
              <div className="row">
                <div className="col-md-6 col-lg-4 mb-2 mb-lg-0">
                  <div className="tile">
                    <div className="tile-heading">
                      <h3>Starter Package</h3>
                    </div>
                    <div className="tile-body">
                      <div className="price">
                        <span className="price-sign">$</span>
                        <span className="price-value">24</span>
                        <span className="price-details">
                          <span className="price-cents">.99</span>
                          <span className="price-period">
                            /mo<sup>1</sup>
                          </span>
                        </span>
                      </div>
                      <p className="m-0">
                        Includes up to 35+ channels.
                        <br />
                        Includes 1 cable outlet<sup>3</sup>
                      </p>
                      <a href="#">
                        See channels included{" "}
                        <i className="fas fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-2 mb-lg-0">
                  <div className="tile">
                    <div className="tile-heading">
                      <h3>
                        Nextbox<sup>TM</sup> HD Terminal
                      </h3>
                    </div>
                    <div className="tile-body">
                      <p className="m-0">Rent at</p>
                      <div className="price">
                        <span className="price-sign">$</span>
                        <span className="price-value">12</span>
                        <span className="price-details">
                          <span className="price-cents">.00</span>
                          <span className="price-period">
                            /mo<sup>2</sup>
                          </span>
                        </span>
                      </div>
                      <p className="m-0" />
                      <a href="#">
                        Learn more about Nextbox{" "}
                        <i className="fas fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-2 mb-lg-0">
                  <div className="faqBlock">
                    <h4 className="faqHeading">
                      <i
                        className="far fa-question-circle"
                        style={{ color: "#da291c", marginRight: 10 }}
                      />
                      FAQs
                    </h4>
                    <p style={{ flex: 1 }}>
                      Get more information on Starter TV.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="heading-bar">
          <div className="container">
            <div className="section-heading">
              <h2>Upgrade Your Device</h2>
            </div>
          </div>
        </section>
        <section className="lists">
          <div className="tabs">
            <div className="container">
              <div className="row">
                <div className="col-12 mb-5">
                  <div className="input-group">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for a Device"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                        >
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 text-center">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {FlattenArray &&
                      FlattenArray.length > 0 &&
                      FlattenArray.slice(0, 2).map((item, index) => (
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              index === 0 ? "active" : ""
                            }`}
                            id={item.name}
                            data-toggle="tab"
                            role="tab"
                            onClick={() => getProducts(item.id)}
                            aria-controls={item.name}
                            aria-selected="true"
                          >
                            {index !== 0 ? 'Smart Phones' : 'Basic Phones' }

                            {console.log("final",  FlattenArray.slice(0, 2))}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="smartphones"
                role="tabpanel"
                aria-labelledby="smartphones"
              >
                <div className="row">
                  {productsShow &&
                    productsShow.length > 0 &&
                    productsShow.map((item) => (
                      <div className="phone-wrapper col-12 col-sm-6 col-lg-4">
                        <div className="phone-model">
                          <div className="phone-header">
                            <div className="offer-section">
                              <div className="offer-section-left">
                                <span>limited time offer</span>
                              </div>
                              <div className="offer-section-right">
                                <span>view all offer</span>
                              </div>
                            </div>
                            <h6>
                              <i className="fa fa-android" />
                              {item.masterData.current.name &&
                                item.masterData.current.name["en-US"]}
                            </h6>
                          </div>
                          <div className="phone-body">
                            <div className="phone-img">
                              <img
                                className="img-fluid"
                                src={
                                  item.masterData.current &&
                                  item.masterData.current.masterVariant
                                    .images &&
                                  item.masterData.current.masterVariant
                                    .images[0].url
                                }
                                alt={
                                  item.masterData.current &&
                                  item.masterData.current.masterVariant
                                    .images &&
                                  item.masterData.current.masterVariant
                                    .images[0].label
                                }
                              />
                            </div>
                            <div className="phone-attr">
                              <div className="color-memory-section">
                                <ul className="color-box-wrapper">
                                  <li
                                    className="selected"
                                    style={{ backgroundColor: "blue" }}
                                  >
                                    <img
                                      src={selectedImage}
                                      alt="selected-icon"
                                    />
                                  </li>
                                  {/* <li class="" style="background-color: gray;">
                                  <img src={selectedImage} alt="selected-icon">
                                </li>
                                <li class="" style="background-color: red;">
                                  <img src={selectedImage} alt="selected-icon">
                                </li> */}
                                </ul>
                                <ul className="memory-box-wrapper">
                                  <li className="selected">
                                    <span>
                                      {item.masterData.current &&
                                        item.masterData.current.masterVariant
                                          .attributes &&
                                        item.masterData.current.masterVariant
                                          .attributes[1].value}
                                    </span>
                                    <img src={selected} alt="selected-icon" />
                                  </li>
                                  {/* <li class="">
                                  <span>128gb</span>
                                  <img src={selectedImage} alt="selected-icon">
                                </li>
                                <li class="">
                                  <span>256gb</span>
                                  <img src={selectedImage} alt="selected-icon">
                                </li> */}
                                </ul>
                              </div>
                              <Link
                                to={`/detail-page/${item.id}`}
                                className="btn btn-danger py-2 d-block"
                              >
                                Details
                              </Link>
                            </div>
                          </div>
                          <div className="phone-price">
                            <div className="left">
                              <span className="large">
                                <span>
                                  $
                                  {item.masterData.current &&
                                    item.masterData.current.masterVariant
                                      .attributes &&
                                    item.masterData.current.masterVariant
                                      .attributes[4].value}
                                </span>
                                <sub style={{ left: "1px" }}>down</sub>
                              </span>
                              <div className="finance">
                                <span>On financing with</span>
                                <br />
                                <span>
                                  Upfront Edge<sub>TM</sub>
                                </span>
                              </div>
                            </div>
                            <div className="right">
                              <div className="special-offer">
                                <div className="promo-div">special offer</div>
                                <div className="line-through-div">
                                  $
                                  {Number.parseFloat(
                                    item.masterData.current &&
                                      item.masterData.current.masterVariant
                                        .prices &&
                                      item.masterData.current.masterVariant
                                        .prices[0] &&
                                      item.masterData.current.masterVariant
                                        .prices[0].value.centAmount / 24
                                  ).toFixed(2)}
                                </div>
                              </div>
                              <h5>
                                $
                                {item.masterData.current &&
                                  item.masterData.current.masterVariant
                                    .attributes &&
                                  item.masterData.current.masterVariant
                                    .attributes[2].value}
                              </h5>
                              <span>(After bill credit)</span>
                            </div>
                          </div>
                          <div className="footer-text">
                            <p className="tex-info">
                              Taxes extra | 24 months | 0% APR
                            </p>
                            <p className="full-price">
                              Full Price: $
                              {(item.masterData.current &&
                                item.masterData.current.masterVariant.prices &&
                                item.masterData.current.masterVariant
                                  .prices[0] &&
                                item.masterData.current.masterVariant.prices[0]
                                  .value.centAmount) ||
                                0}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Main;
