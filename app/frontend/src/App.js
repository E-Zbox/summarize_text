import React, { useEffect, useState } from "react";
// components
import Loader from "./components/Pages/Loader";
import Screen from "./components/Pages/Screen";
// styles
import GlobalStyles from "./components/Styles/Global.Styles";
// themes
import { ThemeProvider } from "styled-components";
import { theme, loader_page, screen } from "./data";

function App() {
    const [firstLoad, setFirstLoad] = useState(false);
    const [screenState, setScreenState] = useState({
        width: null,
        height: null,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!firstLoad) {
            setFirstLoad(true);
        }
    }, [firstLoad]);

    useEffect(() => {
        let {
            body: { clientWidth: width, clientHeight: height },
        } = document;
        setScreenState({ width, height });
    }, [firstLoad]);

    useEffect(() => {
        document.addEventListener("click", (e) => {
            setIsLoading(false);
        });
    });
    return (
        <>
            <ThemeProvider theme={theme}>
                {isLoading ? (
                    <Loader
                        mainText={loader_page.mainText}
                        _width={0.7 * screenState.width}
                    />
                ) : (
                    <Screen
                        screenData={screen}
                        mainText={loader_page.mainText}
                    />
                )}
                <GlobalStyles />
            </ThemeProvider>
        </>
    );
}

export default App;
