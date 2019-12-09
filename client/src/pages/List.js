import React, { Component } from 'react';

import { colors } from '../styles';

import Header from '../components/Header';

import styled from 'styled-components';

class List extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <p className="Breadcrumb">
              <span></span>
          </p>
            <ResultsList className="searchResults wrapper">
                <ResultsItem>
                    <div className="resultsItem__img"></div>
                    <div className="resultsItem__info d-flex">
                      <div className="col-10">
                        <div className="d-flex resultsItem__info__price">
                          <p className="price"></p>
                        </div>
                        <p className="resultsItem__info__description"></p>
                      </div>
                      <p className="resultsItem__info__province col-2">
                        {item.address}
                      </p>
                    </div>
                </ResultsItem>
            </ResultsList>

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