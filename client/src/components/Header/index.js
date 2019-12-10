import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { colors } from '../../styles';

import logo from '../../assets/Logo_ML.png';
import ic_search from '../../assets/ic_search.png';

import styled from 'styled-components';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value ? props.value : ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.value) {
            console.log(this.state.value);
            this.props.history.push(`/items?search=${this.state.value}`);
        }
    }

    handleValue = (e) => {
        this.setState({value: e.target.value});
        //console.log(this.state.value);
    }

    render() {
        const { value } = this.state;
        return(
            <HeaderContainer className="header d-flex">
                <div className="container">
                <Searcher className="row justify-content-between">
                    <Link className="header__img col-1" to={'/'}>
                        <img src={logo} alt="Mercado Libre"/>
                    </Link>
                    <form onSubmit={(e) => this.handleSubmit(e)} className="d-flex col-11">
                        <input placeholder="Nunca dejes de buscar" value={value} onChange={(e) => this.handleValue(e)} type="text"></input>
                        <button type="submit"></button>
                    </form>
                </Searcher>
                </div>
            </HeaderContainer>
        );
    }
}

const HeaderContainer = styled.div`
    height: 56px;
    align-items: center;
    background-color: ${colors.yellow};
`;

const Searcher = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    > * {
        height: 100%;
    }
    img {
        height: 100%;
        object-fit: contain;
    }
    input {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        color: #333;
        font-size: 16px;
        padding: 7px 60px 9px 15px;
        border-radius: 2px;
        border: 0 rgba(0,0,0,.2);
        background: ${colors.white};
        border: none;
        &:focus {
            outline: 0;
        }
    }
    button {
        width: 46px;
        height: 100%;
        border: none;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        background: ${colors.lightGray};
        &::before {
            content: "";
            width: 20px;
            height: 20px;
            display: block;
            background: url(${ic_search}) no-repeat center;
            background-size: contain;
        }
        &:focus {
            outline: 0;
        }
    }
`;


export default withRouter(Header);