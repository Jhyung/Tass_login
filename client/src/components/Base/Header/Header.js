import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from '../../../lib/styleUtils';

// 상단 고정, 그림자
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 0px;
    width: 100%;
    ${shadow(1)}
`;

// 내용 중간 정렬
const WhiteBackground = styled.div`
    background: #0f1316;
    display: flex;
    padding-left: 3rem;
    height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
    width: 1200px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;

    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
`;

// 로고
const Logo = styled(Link)`
    left: 0px;
    font-size: 3rem;
    letter-spacing: 2px;
    color: ${oc.cyan[6]};
    font-family: 'Rajdhani';
`;


// 중간 여백
const Spacer = styled.div`
    flex-grow: 200;
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
    height: 3px;
    background: #0f1316;
`;

const Header = ({children}) => {
    return (
        <Positioner>
            <WhiteBackground>
                <HeaderContents>
                  <Logo to="/">Tass</Logo>
                  <Spacer/>
                  {children}
                </HeaderContents>
            </WhiteBackground>
            <GradientBorder/>
        </Positioner>
    );
};

export default Header;
