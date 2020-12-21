import styled from 'styled-components';
import {shade} from 'polished';

export const  CityHystoryButton = styled.button`
    margin-top:20px;
    max-width:100;
    height: 25px;
    cursor:pointer;
    background:#fff9f9;
    color:#23c1ac;
    font-weight:bold;
    border-radius:10px;
        &:hover{
            background:${shade(0.05,'#fff9f9')};
        }
& + button{
    margin-left:15px;
    margin-top:10px;
}
`;