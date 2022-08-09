import styled from "styled-components";

export const Main = styled.main`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
export const ScreenNavigator = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    flex-wrap: no-wrap;
`;

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

export const ContentContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    /* overflow-x: hidden; */
    /* border: 2px solid green; */
`;

export const RowFlexContainer = styled.div`
    display: flex;
`;
