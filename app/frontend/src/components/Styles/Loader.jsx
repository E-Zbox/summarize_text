import styled, { keyframes } from "styled-components";

const toLeft = keyframes`
    from {
        left: 0px;
        transform: translateX(-100%);
    }
    to {
        left: 100%;
    }
`;

export const MainContainer = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({
        theme: {
            colors: { white01 },
        },
    }) => white01};
`;

export const Container = styled.div`
    width: ${({ _width }) => _width + "px"};
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding: 0px 3px;
    // border: 1px solid green;

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        width: ${({ _width }) => _width * 0.6 + "px"};
    }
`;

export const Text = styled.h4`
    color: ${({
        theme: {
            colors: { black01 },
        },
    }) => black01};
    font-size: ${({
        theme: {
            fonts: { size02 },
        },
    }) => size02};

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        font-size: ${({
            theme: {
                fonts: { size04 },
            },
        }) => size04};
        font-weight: 600;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: center;
    }
`;

export const RectangleContainer = styled.div`
    margin-top: var(--seven-px);
    position: relative;
    background-color: ${({
        theme: {
            colors: { white033 },
        },
    }) => white033};
    width: 100%;
    height: 5px;
    overflow: hidden;
    border-radius: 30px;
`;

export const Rectangle = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: ${({
        theme: {
            colors: { blue01 },
        },
    }) => blue01};
    width: 60%;
    height: 100%;
    border-radius: 30px;
    animation: ${toLeft} 2.5s ease-in-out infinite alternate;
`;
