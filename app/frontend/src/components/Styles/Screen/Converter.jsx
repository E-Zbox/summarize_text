import styled from "styled-components";

export const ConverterContainer = styled.main`
    width: var(--fullWidth);
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: ${({
        theme: {
            colors: { blue021 },
        },
    }) => blue021};
    /* border: 1px solid red; */

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        position: relative;
        height: var(--fullMobileHeight);
        background-color: ${({
            theme: {
                colors: { white01 },
            },
        }) => white01};
    }
`;

export const ConverterContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    row-gap: calc(var(--ten-px) * 2.3);
    /* border: 2px solid blue; */

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        display: flex;
        flex-direction: column;
        row-gap: 3px;
        background-color: ${({
            theme: {
                colors: { blue02 },
            },
        }) => blue02 + "8c"};
    }
`;

export const MenuContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* border: 2px solid red; */
    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        justify-content: center;
    }
`;

export const ListContainer = styled.ul`
    width: fit-content;
    display: flex;
    /* border: 1px solid blue; */
    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        width: 90%;
        margin-top: 5px;
    }
`;

export const List = styled.li`
    color: ${({ _color }) => _color};
    padding: 0px calc(var(--three-px) * 1.5) 0px 0px;
    font-weight: ${({ _fontWeight }) => _fontWeight};
    list-style: none;
    /* border: 1px solid green; */

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-top: 6px;
        padding: 0px;
        a {
            color: transparent;
            width: 10px;
            height: 2px;
            background-color: ${({
                theme: {
                    colors: { black01 },
                },
            }) => black01};
            margin: 1px 0px;
            transition: transform 750ms ease-in;
            &:nth-child(1) {
                transform: rotate(-39deg) translateX(-1px);
            }
            &:nth-child(2) {
                width: 20px;
                transform: translateX(2px);
            }
            &:nth-child(3) {
                transform: rotate(39deg) translateX(-1px);
            }
        }
    }
`;

export const CardContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* border: 1px solid red; */
    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        flex-direction: column;
        justify-content: flex-start;
    }
`;

export const Card = styled.div`
    flex: 0.4;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-shadow: 2px 2px 4px
        ${({
            theme: {
                colors: { black012 },
            },
        }) => black012};
    border-radius: 5px;
    overflow: hidden;

    &:nth-child(2) {
        opacity: 0.75;
        background-color: ${({
            theme: {
                colors: { black012 },
            },
        }) => black012};
    }
    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        flex: 1;
        border-radius: 0px;
        &:nth-child(2) {
            background-color: ${({
                theme: {
                    colors: { white01 },
                },
            }) => white01};
        }
        /* border: 1px solid blue; */
    }
`;

export const CardHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: calc(var(--ten-px) * 1.5);
    background-color: ${({
        theme: {
            colors: { blue02 },
        },
    }) => blue02};

    & select {
        outline: none;
    }

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        padding: calc(var(--ten-px) * 0.8) var(--ten-px);
        background-color: transparent;
    }
`;

export const CardText = styled.p`
    color: ${({
        theme: {
            colors: { black011 },
        },
    }) => black011};
    font-weight: 400;

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        font-size: ${({
            theme: {
                fonts: { size07 },
            },
        }) => size07};
        transform: scale(0.9);
    }
`;

export const FormContainer = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* overflow-y: scroll; */
    box-sizing: border-box;
    /* border: 1px solid green; */
    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        position: static;
        div:last-child {
            position: absolute;
            left: 50%;
            top: 90%;
            transform: translate(-50%, -0%);
            z-index: 2;
        }
    }
`;

export const FormTextArea = styled.textarea`
    flex: 1;
    width: 100%;
    padding: calc(var(--ten-px) * 0.9);
    color: ${({
        theme: {
            colors: { black01 },
        },
    }) => black01};
    resize: none;
    outline: none;
    border: 0px;

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        background-color: ${({
            theme: {
                colors: { white01 },
            },
        }) => white01 + "7d"};
    }
`;

export const FormInput = styled.input`
    &[name="input_image"] {
        display: none;
    }
`;

export const FormLabel = styled.label`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & * {
        z-index: 1;
        transform: scale(0.9);
    }
    &::after {
        content: "";
        position: absolute;
        width: 52%;
        height: 35%;
        top: 50%;
        left: 50%;
        z-index: 0;
        opacity: 0.8;
        transform: translate(-50%, -50%);
        border-radius: 3px;
        background-color: ${({
            theme: {
                colors: { white01 },
            },
        }) => white01};
    }
    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        /* border: 1px solid red; */
        background-color: ${({
            theme: {
                colors: { white01 },
            },
        }) => white01 + "7d"};
        & img {
            width: 40px;
        }
        &::after {
            visibility: hidden;
        }
    }
`;

export const Select = styled.select`
    background-color: transparent;
    font-size: ${({
        theme: {
            fonts: { size06 },
        },
    }) => size06};
    text-transform: capitalize;
    border: none;

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        font-size: ${({
            theme: {
                fonts: { size07 },
            },
        }) => size07};
    }
`;

export const Option = styled.option`
    color: ${({
        theme: {
            colors: { black011 },
        },
    }) => black011};
    font-size: ${({
        theme: {
            fonts: { size06 },
        },
    }) => size06};
    text-transform: capitalize;

    @media (max-width: ${({ theme: { mobileSize } }) => mobileSize + "px"}) {
        font-size: ${({
            theme: {
                fonts: { size07 },
            },
        }) => size07};
    }
`;
