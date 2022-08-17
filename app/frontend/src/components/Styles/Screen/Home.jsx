import styled from "styled-components";

export const HomeContainer = styled.main`
    /* position: relative; */
    width: var(--fullWidth);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    /* border: 2px solid red; */
`;

export const HomeContentContainer = styled.div`
    width: 100%;
    height: 100%;
    /* position: relative; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    /* border: 1px solid blue; */

    & > * {
        /* border: 1px solid red; */
    }

    & *:nth-child(3) {
        flex: 0.55;
    }
`;

export const HomeMainImage = styled.img`
    height: ${({ height }) => height + "px"};
    /* transform: scale(0.85); */
    /* border: 1px solid red; */
`;

export const HomeText = styled.h4`
    color: ${({
        theme: {
            colors: { black01 },
        },
    }) => black01};
    font-size: ${({
        theme: {
            fonts: { size01 },
        },
    }) => size01};
    font-weight: 600;
    /* border: 1px solid red; */

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        font-weight: 700;
        line-height: 22px;
        letter-spacing: 0em;
        font-size: ${({
            theme: {
                fonts: { size05 },
            },
        }) => size05};
    }
`;

export const HomeSubText = styled.h4`
    /* border: 1px solid blue; */
    color: ${({
        theme: {
            colors: { black01 },
        },
    }) => black01};
    font-size: ${({
        theme: {
            fonts: { size05 },
        },
    }) => size05};
    font-weight: 400;
    /* border: 1px solid red; */
    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        width: 70%;
        text-align: center;
        line-height: 18.15px;
        font-weight: 400;
        font-size: ${({
            theme: {
                fonts: { size07 },
            },
        }) => size07};
    }
`;
