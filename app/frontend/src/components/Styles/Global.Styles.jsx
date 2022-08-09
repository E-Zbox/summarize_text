import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        // padding
        --three-px: 3px;
        --seven-px: 7px;
        --ten-px: 10px;
        // width
        --fullWidth: calc(100vw * 1);

        margin: 0px;
        padding: 0px;
        scroll-behavior: smooth;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        /* overflow-x: hidden; */
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
