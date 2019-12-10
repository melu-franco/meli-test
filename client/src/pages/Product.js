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
        loading: true,
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
    .then((res) => res.json())
    .then((data) => {
      return this.setState({ product: data.item, loading: false })
    })
    .catch(function(error) {
      console.log(error);
    }); 
  }

  render() {
    const { loading, product } = this.state;

    return (
      <div className="App">
        <Header />
        <div className="container">
            {loading ? <p className="text-loading">Loading..</p> : (loading === false && product) ? (
              <ProductItem className="productItem wrapper">
                  <div className="productItem__specs row flex-column flex-md-row">
                      <div className="productItem__specs__img col col-md-6 col-lg-9">
                        <div className="img" style={{backgroundImage: `url(${product.picture})`}}></div>
                      </div>
                      <div className="productItem__specs__info col col-md-6 col-lg-3">
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
                      <div className="productItem__description col col-lg-9">
                          <h3>Descripción del producto</h3>
                          <p>{product.description}</p>
                      </div>
                  </div>
              </ProductItem>
          ) : 
            <div className="wrapper">
              <p className="text-notFound">No hay publicaciones que coincidan con tu búsqueda.</p>
            </div>
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
            @media(max-width: 990px) {
                flex-direction: column;
                margin-bottom: 60px;
            }
            &__img {
                div {
                    height: 100%;
                    width: 100%;
                    min-height: 400px;
                    object-fit: contain;
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                @media(max-width: 768px) {
                    margin-bottom: 40px;
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