import React, { useEffect, useState, useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks/lib/index";
import AddToCart from "./AddToCart";
import { ThemeContext } from "./ThemeContext";
import Header from "./Header";
import axios from "axios";

import Footer from "./Footer";

import Main from "./Main";
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
            attributesRaw (includeNames:["top-features", "product-plans"]){
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

export default function Products() {
  const { loading, error, data } = useQuery(PRODUCTS);
  const [restAPI, setRestAPI] = useState(null);
  const theme = useContext(ThemeContext);
  console.log("theme,", theme);
  useEffect(() => {
    window.scrollTo({
      top: 750,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://api.us-central1.gcp.commercetools.com/commerce-tool-poc/products`,
        {
          headers: { Authorization: "Bearer 5d4f69OBg9AsU4Vx0kkxMp1Scc6G3efB" },
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

  return (
    <>
      <div id="wrapper">
        <Header />

        <Main data={restAPI} graphQLdata={data} />
        {/* <AddToCart productId={product.id}/> {product.masterData.current.name} */}
      </div>
      <Footer />
    </>
  );

  // return (
  //   <div>
  //     <p>Total products: {data.products.count}</p>
  //     {productList}
  //   </div>
  // );
}
