import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import Header from "../Header";
import { useQuery } from "@apollo/react-hooks/lib/index";
import selectedImage from "../images/samsung-galaxy-s20.jpg";
import featureImage from "../images/feature_thumbs_single-take.png";
import iamge from "../images/phone_selected.png";
import axios from "axios";

import { Link } from "react-router-dom";

import Footer from "../Footer";
const PRODUCTS = gql`
  query p {
    products(limit: 10, sort: "masterData.current.name.en desc") {
      count
      results {
        id
        skus
        createdAt

        masterData {
          current {
            name(locale: "EN-US")
            description(locale: "EN-US")
            categories {
              id
              key
              version
              name(locale: "DE-DE")
              description(locale: "DE-DE")
              slug(locale: "DE-DE")
              lastModifiedAt
              metaTitle(locale: "DE-DE")
            }

            allVariants {
              sku
              prices {
                country
                value {
                  centAmount
                  fractionDigits
                }
              }
              images {
                url
                dimensions {
                  width
                  height
                }
                label
              }
              attributesRaw(includeNames: ["top-features", "product-plans"]) {
                name
                value
              }
            }
          }
          published
        }
      }
    }
  }
`;
const DetailPage = ({ history }) => {
  const { loading, error, data } = useQuery(PRODUCTS);
  const [restAPI, setRestAPI] = useState(null);
  console.log("history", history);

  const {
    location: { pathname },
  } = history;
  const queryString = pathname.split("/")[2];
  useEffect(() => {
    axios
      .get(
        `https://api.us-central1.gcp.commercetools.com/commerce-tool-poc/products/${queryString}`,
        {
          headers: { Authorization: "Bearer 9Q10rUuAolWgR3vdyrscMj5rW3IZ4vNJ" },
        }
      )
      .then((response) =>
        setRestAPI(response && response.data && response.data)
      )
      .catch(() => {})
      .then(() => {
        //
      });
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredProducts =
    data &&
    data.products.results.filter(
      (product) =>
        product.masterData.current.allVariants[0].sku ===
        history.location.pathname.split("/")[2]
    );
  const filteredArray =
    restAPI &&
    restAPI.results &&
    restAPI.results.length > 0 &&
    restAPI.results.map((item) => item.masterData && item.masterData.current);
  console.log(
    restAPI &&
      restAPI.masterData.current &&
      restAPI.masterData.current.masterVariant &&
      restAPI.masterData.current.masterVariant.attributes
  );
  const Top_Features =
    restAPI &&
    restAPI.masterData.current &&
    restAPI.masterData.current.masterVariant &&
    restAPI.masterData.current.masterVariant.attributes[5] &&
    restAPI.masterData.current.masterVariant.attributes[5].value;
  const Top_Plans =
    restAPI &&
    restAPI.masterData.current &&
    restAPI.masterData.current.masterVariant &&
    restAPI.masterData.current.masterVariant.attributes[6] &&
    restAPI.masterData.current.masterVariant.attributes[6].value;

  const flatFeature = Top_Features && Top_Features.flat(Infinity);
  const flatPlans = Top_Plans && Top_Plans.flat(Infinity);

  const talkPlan =
    flatPlans &&
    flatPlans.filter((plan) => {
      return plan.name === "talk-plan";
    });
  const textPlan =
    flatPlans &&
    flatPlans.filter((plan) => {
      return plan.name === "text-plan";
    });
  const dataPlan =
    flatPlans &&
    flatPlans.filter((plan) => {
      return plan.name === "data-plan";
    });

  const getMemory = (arr) => {
    return arr.find((el) => el.name === "memory");
  };
  const getPrice = (arr) => {
    return arr.find((el) => el.name === "money");
  };

  const getTextPlans = (arr) => {
    return arr.find((el) => el.name === "text");
  };
  const getTalkPlans = (arr) => {
    return arr.find((el) => el.name === "title");
  };
  return (
    <>
      <div id="wrapper">
        <Header />
        <main>
          <section className="heading-bar">
            <div className="container">
              <div className="section-heading">
                <h2>Product Details</h2>
              </div>
            </div>
          </section>
          <section className="prod-detail">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8">
                  <div className="phone-container">
                    <div className="phone-header-section">
                      <div className="number">1</div>
                      <div className="header-desc">You Selected</div>
                    </div>
                    <div className="phone-desc-section">
                      <h5 className="m-0">
                        <i className="fa fa-android" />
                        {restAPI &&
                          restAPI.masterData.current.name &&
                          restAPI.masterData.current.name["en-US"]}
                      </h5>
                    </div>
                    <div className="phone-image-section">
                      <div className="offer-section">
                        <div className="offer-section-left">
                          <span>limited time offer</span>
                        </div>
                        <div className="offer-section-right">
                          <span>view all offer</span>
                        </div>
                      </div>
                      <div className="phone-image-holder">
                        <img
                          className="img-fluid"
                          src={
                            restAPI &&
                            restAPI.masterData.current &&
                            restAPI.masterData.current.masterVariant.images &&
                            restAPI.masterData.current.masterVariant.images[0]
                              .url
                          }
                          alt="samsung-galaxy-s20"
                        />
                      </div>
                    </div>
                    <div className="phone-feature-section">
                      <button
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Top Features
                        <i className="fa fa-caret-down" />
                      </button>
                      <div
                        className="collapse feature-details"
                        id="collapseExample"
                      >
                        <div className="row">
                          {flatFeature &&
                            flatFeature.length > 0 &&
                            flatFeature.map((feature) => (
                              <div className="col-md-3">
                                <div className="feature-holder">
                                  <img src={featureImage} />
                                  <span>{feature.value}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="phone-color-memory-section">
                    <div className="phone-header-section">
                      <div className="number">2</div>
                      <div className="header-desc">
                        Build Your Device &amp; Plan
                      </div>
                    </div>
                    <div className="wrapper">
                      <div className="color-memory-section">
                        <ul className="color-box-wrapper">
                          <li
                            className="selected"
                            style={{ backgroundColor: "blue" }}
                          >
                            <img src={iamge} alt="selected-icon" />
                          </li>
                          {/* <li class="" style="background-color: gray;">
                  <img src="./images/phone_selected.png" alt="selected-icon">
                </li>
                <li class="" style="background-color: red;">
                  <img src="./images/phone_selected.png" alt="selected-icon">
                </li> */}
                        </ul>
                        <ul className="memory-box-wrapper">
                          <li className="selected">
                            <span>
                              {restAPI &&
                                restAPI.masterData.current &&
                                restAPI.masterData.current.masterVariant
                                  .attributes &&
                                restAPI.masterData.current.masterVariant
                                  .attributes[1].value}
                            </span>
                            <img src={iamge} alt="selected-icon" />
                          </li>
                          {/* <li class="">
                  <span>128gb</span>
                  <img src="./images/phone_selected.png" alt="selected-icon">
                </li>
                <li class="">
                  <span>256gb</span>
                  <img src="./images/phone_selected.png" alt="selected-icon">
                </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="plan-selection-section">
                    <div className="dark-section-header">
                      <ul className="nav-tabs">
                        <li className="active">
                          <a href="#">Text Plan</a>
                        </li>
                      </ul>
                    </div>
                    <div className="plan-selection-container">
                      <div className="plan-selection-content">
                        <ul className="plans-holder">
                          {textPlan &&
                            textPlan[0].value.map((textPlan) => (
                              <li className="plan">
                                <div className="plan-info-price">
                                  <span>{getTextPlans(textPlan).value}</span>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <div className="dark-section">
                      <ul className="nav-tabs">
                        <li className="active">
                          <a href="#">Talk Plans</a>
                        </li>
                      </ul>
                    </div>
                    <div className="plan-selection-container">
                      <div className="plan-selection-content">
                        <ul className="plans-holder">
                          {talkPlan &&
                            talkPlan[0].value.map((talkPlan) => (
                              <li className="plan">
                                <div className="plan-info-price">
                                  <span>{getTalkPlans(talkPlan).value}</span>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <div className="dark-section-header">
                      <ul className="nav-tabs">
                        <li className="active">
                          <a href="#">Pick a new plan</a>
                        </li>
                      </ul>
                    </div>
                    <div className="plan-selection-container">
                      <div className="plan-selection-content">
                        <ul className="plans-holder">
                          {dataPlan &&
                            dataPlan[0].value.map((plan, index) => (
                              <li className="plan">
                                <div className="plan-info-price">
                                  <span>{getMemory(plan).value}GB</span>
                                  <div className="price ml-3">
                                    <span className="price-value">
                                      {" "}
                                      <span>${getPrice(plan).value}</span>
                                    </span>
                                    <span className="price-details">
                                      <span className="price-cents">.00</span>
                                      <span className="price-period">/mo</span>
                                    </span>
                                  </div>
                                </div>
                                <div className="plan-btn">
                                  <a
                                    href="#"
                                    className="btn btn-danger d-block p-0"
                                  >
                                    Add
                                  </a>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* <main>
          <section className="heading-bar">
            <div className="container">
              <div className="section-heading">
                <h2>Product Details</h2>
              </div>
            </div>
          </section>
          <section className="prod-detail">
            <div className="container">
              <div className="row mb-3">
                <div className="col-md-9 mb-3 mb-md-0">
  <h2 className="title">{filteredProducts[0].masterData.current.name}</h2>
                  <p>
                  {filteredProducts[0].masterData.current.description}
                  </p>
                  <ul>
                    <h4>Sku:</h4> <span>{filteredProducts[0].masterData.current.allVariants[0].sku}</span>
      
                 <h4>price</h4> price: <span>$ <strong>{filteredProducts[0].masterData.current.allVariants[0].prices[0].value.centAmount / 100}</strong></span>
                  </ul>
                </div>
                <div className="col-md-3">
                  <img
                    className="ml-md-auto"
                    src={filteredProducts[0].masterData.current.allVariants[0].images[0].url}
                    alt="rogers-brand"
                  />
                </div>
              </div>
              <Link className="btn btn-outline-primary" to="/">
                Back
              </Link>
            </div>
          </section>
        </main> */}
        <Footer />
      </div>
    </>
  );
};

export default DetailPage;
