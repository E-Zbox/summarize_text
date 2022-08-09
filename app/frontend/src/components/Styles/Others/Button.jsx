import styled from "styled-components";

export const ButtonContainer = styled.div`
    width: ${({ _width }) => (_width ? _width : "228px")};
    height: ${({ _height }) => (_height ? _height : "40px")};
`;

export const Button = styled.button`
    width: 100%;
    height: 100%;
    text-align: center;
    color: ${({
        theme: {
            colors: { white01 },
        },
    }) => white01};
    background-color: ${({
        theme: {
            colors: { blue01 },
        },
    }) => blue01};
    font-size: ${({
        theme: {
            fonts: { size05 },
        },
    }) => size05};
    font-weight: 400;
    border: 0px;
    border-radius: ${({ borderRadius }) => borderRadius + "px"};
    opacity: 0.9;
    transition: 150ms all cubic-bezier(0.6, -0.28, 0.735, 0.045);

    &:active {
        transform: scale(0.85);
    }

    &:hover {
        opacity: 1;
    }
`;
