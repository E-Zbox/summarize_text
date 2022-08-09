import { useEffect, useState } from "react";
// styles
import {
    HomeContainer,
    HomeContentContainer,
    HomeMainImage,
    HomeSubText,
    HomeText,
} from "../../Styles/Screen/Home";
import { ContentContainer } from "../../Styles/Others/Container";
import { ButtonContainer, Button } from "../../Styles/Others/Button";

const Home = ({ text, imageSrc, imageSize, href }) => {
    const { homeText, homeSubText, buttonText } = text;
    const { homeImageLarge, homeImageSmall } = imageSrc;
    const { large: homeImageLargeSize, small: homeImageSmallSize } = imageSize;

    const [firstLoad, setFirstLoad] = useState(false);
    const [screenState, setScreenState] = useState({
        width: null,
        height: null,
    });

    useEffect(() => {
        if (!firstLoad) {
            setFirstLoad(true);
        }
    }, [firstLoad]);

    useEffect(() => {
        let { clientWidth: width, clientHeight: height } = document.body;
        setScreenState({ width, height });
    }, [firstLoad]);
    return (
        <HomeContainer
            id={href.home}
            _width={screenState.width - 12}
            _height={screenState.height - 12}
        >
            <ContentContainer>
                <HomeContentContainer>
                    <HomeMainImage
                        src={homeImageLarge}
                        height={homeImageLargeSize}
                    />
                    <HomeText>{homeText}</HomeText>
                    <HomeSubText>{homeSubText}</HomeSubText>
                    <ButtonContainer _width="200px">
                        <Button borderRadius={5}>
                            <a href={"#" + href.converter}>{buttonText}</a>
                        </Button>
                    </ButtonContainer>
                </HomeContentContainer>
            </ContentContainer>
        </HomeContainer>
    );
};

export default Home;
