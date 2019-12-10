import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { colors } from '../styles';

import queryString from 'query-string';

import Header from '../components/Header';
import ic_shipping from '../assets/ic_shipping.png';

import styled from 'styled-components';

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      items: [],
      categories: [],
      searchValue: queryString.parse(this.props.location.search).search
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    console.log(this.state.searchValue);
    this.getItems();
  }

  // Retrieves the list of items from the Express app
  getItems = () => {
    fetch(`/api/items?q=${this.state.searchValue}`)
    .then((res) => {
      const response = res.json();
      console.log(response);
      return response;
    })
    .then((data) => {
      console.log(data);
      return this.setState({items: data.items, categories: data.categories});
    })
    .catch(function(error) {
      console.log(error);
    });  
  }

  render() {
    const { items, categories, searchValue } = this.state;

    return (
      <div className="App">
        <Header value={searchValue} />
        <div className="container">
          <p className="Breadcrumb">
            {categories.map((category, index) => 
              <span key={index}>{category}</span>
            )}
          </p>
          {/* Check to see if any items are found*/}
          {items.length ? (
            <ResultsList className="searchResults wrapper">
              {/* Render the list of items */}
              {items.map((item, index) => (
                  <ResultsItem key={index}>
                    <Link className="resultsItem d-flex align-items-center" to={`/items/${item.id}`}>
                        <div className="resultsItem__img" style={{backgroundImage: `url(${item.picture})`}}></div>
                        <div className="resultsItem__info d-flex">
                          <div className="col-10">
                            <div className="d-flex resultsItem__info__price">
                              <p className="price">{item.price.currency === "USD" ? "U$S" : "$"} {new Intl.NumberFormat("de-DE").format(item.price.amount)}</p>
                              {item.free_shipping && <img className="free-shipping" src={ic_shipping} alt="Free shipping"/> }
                            </div>
                            <p className="resultsItem__info__description">{item.title}</p>
                          </div>
                          <p className="resultsItem__info__province col-2">
                            {item.address}
                          </p>
                        </div>
                    </Link>
                  </ResultsItem>
                ))}
            </ResultsList>
          ) : (
            <p>Loading..</p>
          )
        }
        </div>
      </div>
    );
  }
}

const ResultsList = styled.ul`
    padding: 0 16px;
    list-style: none;
    margin-bottom: 80px;
`;

const ResultsItem = styled.li`
  padding: 16px 0;
  &:not(:first-of-type) {
    border-top: 1px solid ${colors.lightGray};
  }
  .resultsItem {
    &:hover {
      text-decoration: none;
    }
    &__img {
      width: 180px;
      height: 180px;
      margin-right: 16px;
      object-fit: contain;
      border-radius: 4px;
      background: ${colors.lightGray};
    }
    &__info {
      height: 100%;
      flex: 1 0 0;
      padding-top: 10px;
      align-self: flex-start;
      color: ${colors.black};
      &__price {
        font-size: 24px;
        margin-bottom: 32px;
        align-items: center;
      }
      .free-shipping {
        width: 18px;
        height: 18px;
        margin-left: 12px;
        object-fit: contain;
      }
      &__description {
        font-size: 18px;
      }
      &__province {
        padding-top: 10px;
        font-size: 12px;
        margin-left: auto;
      }
    }
  }
`;


export default List;