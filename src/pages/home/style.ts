import styled, {css} from 'styled-components';
import {shade} from 'polished';

interface InputProps{
    isFocus:boolean;
    isFilled:boolean;
}

export const Container = styled.div`
    margin: 50px auto;
    text-align:center;
    width: 50vw;
    @media(max-width: 800px) {
        width: 90vw;
    }
    height: 80vh;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
    border-radius: 5px;
    position: relative;
    z-index: 1;
    background: inherit;
    overflow: hidden;

    &:before {
    content: "";
    position: absolute;
    background: inherit;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    filter: blur(90px);
    margin: -20px;
    }

    h1{
        font-size:50px;
        @media(max-width: 800px) {
            font-size:30px;
        }
    }
    #alert{
        font-weight:bold;
        font-size:20px;
        box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    }
`;

export const Input = styled.input`

        width:100%;
        margin: 0 5px;
        border:none;
        outline:none;
        @media(max-width: 800px) {
            height:50px;
        }
        &::placeholder{
            color:#373737;
        }
 
`

export const FormGroup = styled.div<InputProps>`
    background-color:#fff;
    width:90%;
    border-radius: 10px;
    margin:5%;
    padding: 1% 5%;
    display:flex;
    align-items:center;
    justify-content:space-between;

    button{
        width:250px;
        height: 25px;
        cursor:pointer;
        background:#23c1ac;
        color:#fff;
        font-weight:bold;
        border-radius:10px;
        &:hover{
            background:${shade(0.25,'#23c1ac')};
        }
        @media(max-width: 800px) {
            position:absolute;
            margin: auto;
            left:0;
            right:0;
            bottom:0;
            width:100%;
            border-radius:0;
            height: 50px;
            font-size:25px;
        }
    }
    svg{
        color:#bdbdbd;
        ${props => {
            if(props.isFilled)return css`color:#01a8c9`
            if(props.isFocus) return css`color:#01a8c9`
        }}
    }
`;