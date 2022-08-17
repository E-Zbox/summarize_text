import styled from "styled-components";

export const ButtonContainer = styled.div`
    position: relative;
    width: ${({ _width }) => (_width ? _width : "228px")};
    height: ${({ _height }) => (_height ? _height : "40px")};

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        width: ${({ _width }) => (_width ? _width : "var(--fullWidth)")};
        height: ${({ _height }) => (_height ? _height : "40px")};
        display: grid;
        place-items: center;
        &::after {
            content: "";
            position: absolute;
            top: 58%;
            left: 0;
            width: 100%;
            height: 100%;
            /* transform: translate(-42%, -50%); */
            z-index: -1;
            border-radius: 20px 20px 0px 0px;
            background: linear-gradient(
                180deg,
                ${({
                    theme: {
                        colors: { white02 },
                    },
                }) => white02 + "34"},
                ${({
                    theme: {
                        colors: { white03 },
                    },
                }) => white03 + "88"},
                ${({
                    theme: {
                        colors: { white03 },
                    },
                }) => white03}
            );
            visibility: ${({ showAfter }) =>
                showAfter ? "visible" : "hidden"};
            box-shadow: 1px -1px 8px ${({
                    theme: {
                        colors: { black012 },
                    },
                }) => black012};
        }
    }
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
    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        --size: ${({ _size }) => (_size !== undefined ? _size : "100%")};
        width: var(--size);
        height: var(--size);
        display: table-cell;
        font-size: ${({
            _size,
            theme: {
                fonts: { size02 },
            },
        }) => _size && size02};
        vertical-align: middle;
        line-height: 0;
        box-shadow: 1px 1px 2px
            ${({
                theme: {
                    colors: { black01 },
                },
            }) => black01};

        & * {
            line-height: 0;
        }
    }
`;

export const ButtonCardMain = styled.main`
    position: absolute;
    top: 0;
    left: 0;
    width: var(--fullWidth);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    box-sizing: border-box;
    background-color: ${({
        theme: {
            colors: { black011 },
        },
    }) => black011};
`;

export const ButtonCardContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${({
        theme: {
            colors: { white01 },
        },
    }) => white01};
`;

export const ButtonCardHeader = styled.div`
    width: 100%;
    background-color: ${({
        theme: {
            colors: { blue01 },
        },
    }) => blue01};
    padding: var(--ten-px);

    h4 {
        font-size: ${({
            theme: {
                fonts: { size05 },
            },
        }) => size05};
        font-weight: 700;
        line-height: 21.78px;
    }
`;

export const ButtonCardText = styled.a`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: inherit;
    position: relative;
    padding: calc(var(--three-px) * 2.2) var(--ten-px);

    &:last-child {
        &::after {
            visibility: hidden;
        }
    }

    img {
        transform: scale(0.9);
        padding: 0px var(--three-px);
    }

    p {
        font-family: Inter;
        font-size: ${({
            theme: {
                fonts: { size07 },
            },
        }) => size07};
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;
        padding: 0px;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 94%;
        height: 1px;
        background-color: ${({
            theme: {
                colors: { white04 },
            },
        }) => white04};
        transform: translateX(-50%);
    }
`;
