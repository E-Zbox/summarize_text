import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        // padding
        --three-px: 3px;
        --seven-px: 7px;
        --ten-px: 10px;
        // width
        --headerHeight: 60px;
        --fullWidth: calc(100vw * 1);
        --fullMobileHeight: calc(100vh - var(--headerHeight));

        margin: 0px;
        padding: 0px;
        scroll-behavior: smooth;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        transition: all 450ms ease-in;
        /* overflow-x: hidden; */

        @media (max-width: ${({ theme: { mobileSize } }) =>
            mobileSize + "px"}) {
            --headerHeight: 45px;
        }
    }
    
    body {
        width: 100vw;
        height: 99vh;
        display: block;
        /* overflow: hidden; */

        a {
            color: inherit;
            text-decoration:none ;
        }
    }
`;
