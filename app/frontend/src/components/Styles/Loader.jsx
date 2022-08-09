import styled from "styled-components";

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
    border: 1px solid red;
`;

export const Container = styled.div`
    width: ${({ _width }) => _width + "px"};
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    padding: 0px 3px;
    border: 1px solid green;
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
`;

export const RectangleContainer = styled.div`
    background-color: ${({
        theme: {
            colors: { white02 },
        },
    }) => white02};
    width: 100%;
    height: 7px;
    border-radius: 30px;
`;

export const Rectangle = styled.div`
    background-color: ${({
        theme: {
            colors: { blue01 },
        },
    }) => blue01};
    width: 60%;
    height: 100%;
    border-radius: 30px;
`;
