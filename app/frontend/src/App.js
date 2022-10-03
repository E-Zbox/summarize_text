import React, { useEffect, useState } from "react";
// components
import Loader from "./components/Pages/Loader";
import Screen from "./components/Pages/Screen";
// context
import { AppContext } from "./contexts";
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
    const [isMobileView, setIsMobileView] = useState(false);

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
        var timer;

        window.addEventListener("load", () => {
            timer = setTimeout(() => setIsLoading(false), 4000);
        });

        return () => {
            window.removeEventListener("load", () => {
                clearTimeout(timer);
            });
        };
    });

    useEffect(() => {
        let condition = screenState.width < theme.mobileSize + 15;
        setIsMobileView(condition ? true : false);
    }, [screenState]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppContext.Provider
                    value={{ firstLoad, screenState, isLoading, isMobileView }}
                >
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
                </AppContext.Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
