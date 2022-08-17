import React from "react";
// components
import {
    Main,
    ScreenNavigator,
    ScreenContainer,
    ContentContainer,
} from "../../Styles/Others/Container";
import { HeaderContainer, HeaderText } from "../../Styles/Screen/Header";
import Home from "./Home";
import Converter from "./Converter";

const Navigator = ({ home, converter, href }) => {
    return (
        <Main>
            <ScreenNavigator>
                <Home
                    href={href}
                    text={{ ...home.text }}
                    imageSrc={{ ...home.imageSrc }}
                    imageSize={{ ...home.imageSize }}
                    buttonCard={{ ...home.buttonCard }}
                />
                {/*<p>Ononogbu Ebenezer</p>*/}
                <Converter
                    href={href}
                    text={{ ...converter.text }}
                    imageSrc={{ ...converter.imageSrc }}
                />
            </ScreenNavigator>
        </Main>
    );
};

const Screen = ({
    screenData: { home, converter, href },
    mainText,
    _width,
    _height,
}) => {
    return (
        <ScreenContainer>
            <HeaderContainer>
                <ContentContainer>
                    <HeaderText>{mainText}</HeaderText>
                </ContentContainer>
            </HeaderContainer>
            <Navigator home={home} converter={converter} href={href} />
        </ScreenContainer>
    );
};

export default Screen;
