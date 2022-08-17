import styled from "styled-components";

export const HeaderContainer = styled.div`
    width: 100%;
    height: var(--headerHeight);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({
        theme: {
            colors: { white01 },
        },
    }) => white01};
`;

export const HeaderText = styled.h4`
    color: ${({
        theme: {
            colors: { blue02 },
        },
    }) => blue02};
    font-size: ${({
        theme: {
            fonts: { size03 },
        },
    }) => size03};
    width: 100%;

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        font-size: ${({
            theme: {
                fonts: { size05 },
            },
        }) => size05};
    }
`;
