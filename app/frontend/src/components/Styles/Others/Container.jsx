import styled from "styled-components";

export const ScreenContainer = styled.main`
    // this
    width: 100vw;
    height: 100vh;
    /* overflow-x: scroll; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    /* border: 3px solid black; */
`;

export const Main = styled.main`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    /* border: 1px solid blue; */

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        height: var(--fullMobileHeight);
    }
`;
export const ScreenNavigator = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    flex-wrap: no-wrap;
    /* 
    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        border: 4px solid green;
    } */
`;

export const ContentContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    /* overflow-x: hidden; */
    /* border: 2px solid green; */

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        width: ${({ _width }) => (_width ? _width : "90%")};
    }
`;

export const RowFlexContainer = styled.div`
    display: flex;
`;
