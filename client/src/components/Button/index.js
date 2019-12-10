import React from 'react';

import cn from 'classnames';

import { colors } from '../../styles';

import styled from 'styled-components';

const Button = ({
    label,
    disabled,
    onClick,
    id,
    lg,
    primary,
    className
  }) => {

    return(
        <StyledButton 
            className={cn('btn', className, { primary, disabled, lg })} 
            id={id}
            onClick={onClick}
            {...disabled && disabled}        
        >
            {label}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    border: none;
    cursor: pointer;
    text-align: center;
    justify-content: center;
    font-size; 15px;
    padding: 10px 16px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    border: 1px solid;
    background: transparent;
    &:focus {
        outline: 0;
        box-shadow: none;
    }
    &.disabled {
        border-color: transparent !important;
        background-color: ${colors.gray} !important; 
        pointer-events: none;
    }
    &.primary {
        color: white;
        border: 1px solid ${colors.lightBlue};
        background-color: ${colors.lightBlue};
        transition: background-color .2s ease-in-out;
        &:hover {
            background-color: ${colors.darkBlue};
        }
    }
    &.lg {
        width: 100%;
    }
`;


export default Button;