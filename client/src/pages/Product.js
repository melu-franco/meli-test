import React, { Component } from 'react';
import { colors } from '../styles';

import Header from '../components/Header';
import Button from '../components/Button';

import styled from 'styled-components';

class Product extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      product: null
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getProduct();
  }

  // Retrieves the list of items from the Express app
  getProduct = () => {
    fetch(`/api/items/${this.props.match.params.id}`)
    .then((res) => {
      const response = res.json();
      console.log(response);
      return response;
    })
    .then((data) => {
      console.log(data.item);
      return this.setState({ product: data.item })
    })
    .catch(function(error) {
      console.log(error);
    }); 
  }

  render() {
    const { product } = this.state;

    return (
      <div className="App">
        <Header />
        <div className="container">
          {product ? (
              <ProductItem className="productItem wrapper">
                  <div className="productItem__specs row">
                      <div className="productItem__specs__img col-9">
                        <div className="img" style={{backgroundImage: `url(${product.picture})`}}></div>
                      </div>
                      <div className="productItem__specs__info col-3">
                          <p className="product-condition">{product.condition === "new" ? "Nuevo" : product.condition === "used" ? "Usado" : ""} - {product.sold_quantity} vendido{product.sold_quantity !== 1 && `s`}</p>
                          <p className="product-name">{product.title}</p>
                          <div className="d-flex"
                            ><p className="product-price">{product.price.currency === "USD" ? "U$S" : "$"} {new Intl.NumberFormat("es-AR").format(product.price.amount)}<sup>{product.price.decimals}</sup></p>
                          </div>
                          <Button 
                            primary 
                            lg 
                            label="Comprar" 
                          />
                      </div>
                  </div>
                  <div className="row">
                      <div className="productItem__description col-9">
                          <h3>Descripción del producto</h3>
                          <p>{product.description}</p>
                      </div>
                  </div>
              </ProductItem>
          ) : (
            <ProductItem>
              <h2>No List Items Found</h2>
            </ProductItem>
          )
        }
        </div>
      </div>
    );
  }
}

const ProductItem = styled.div`
    padding: 32px;
    margin-bottom: 80px;
    .productItem {
        &__specs {
            margin-bottom: 100px;
            min-height: 530px;
            &__img {
                div {
                    height: 100%;
                    width: 100%;
                    object-fit: contain;
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                }
            }
            &__info {
    
            }
        }
        &__description {
            h3 {
                font-size: 28px;
                margin-bottom: 32px;
            }
            p {
                font-size: 16px;
                line-height: 1.2;
                color: ${colors.gray};
            }
        }
    }
    
    .product {
        &-condition {
            font-size: 14px;
            margin-bottom: 16px;
        }
        &-name {
            font-size: 24px;
        }
        &-price {
            font-size: 46px;
            margin: 32px 0;
            sup {
              
            }
        }
    }
    
`;

export default Product;