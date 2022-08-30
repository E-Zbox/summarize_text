import { useContext, useEffect, useState } from "react";
// context
import {AppContext} from "../../../contexts"
// styles
import {
    HomeContainer,
    HomeContentContainer,
    HomeMainImage,
    HomeSubText,
    HomeText,
} from "../../Styles/Screen/Home";
import { ContentContainer } from "../../Styles/Others/Container";
import {
    ButtonContainer,
    Button,
    ButtonCardMain,
    ButtonCardContainer,
    ButtonCardHeader,
    ButtonCardText,
} from "../../Styles/Others/Button";

const Home = ({ text, imageSrc, imageSize, href, buttonCard }) => {
    const { homeText, homeSubText, buttonText } = text;
    const { homeImageLarge, homeImageSmall } = imageSrc;
    const { large: homeImageLargeSize, small: homeImageSmallSize } = imageSize;

    const { firstLoad, isMobileView} = useContext(AppContext)

    const [screenState, setScreenState] = useState({
        width: null,
        height: null,
    });
    const [showButtonCard, setShowButtonCard] = useState(false);

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
                        src={isMobileView ? homeImageSmall : homeImageLarge}
                        height={
                            isMobileView
                                ? homeImageSmallSize
                                : homeImageLargeSize
                        }
                    />
                    <HomeText>{homeText}</HomeText>
                    <HomeSubText>{homeSubText}</HomeSubText>
                    <ButtonContainer
                        _width={
                            isMobileView ? `${screenState.width}px` : "200px"
                        }
                        isMobileView={isMobileView}
                        showAfter={true}
                    >
                        {isMobileView ? (
                            <Button
                                _size={"60px"}
                                borderRadius="200"
                                onClick={() => setShowButtonCard(true)}
                            >
                                <a href={"#" + href.home}>+</a>
                            </Button>
                        ) : (
                            <Button borderRadius={5}>
                                <a href={"#" + href.converter}>{buttonText}</a>
                            </Button>
                        )}
                    </ButtonContainer>
                    {showButtonCard && (
                        <ButtonCardMain
                            onClick={() => setShowButtonCard(false)}
                        >
                            <ButtonCardContainer>
                                <ButtonCardHeader>
                                    <h4>{buttonCard.header}</h4>
                                </ButtonCardHeader>
                                {buttonCard.items.map(
                                    ({ imageSrc, title }, index) => (
                                        <ButtonCardText
                                            key={index}
                                            href={"#" + href.converter}
                                        >
                                            <img
                                                src={imageSrc}
                                                alt={imageSrc}
                                            />
                                            <p>{title}</p>
                                        </ButtonCardText>
                                    )
                                )}
                            </ButtonCardContainer>
                        </ButtonCardMain>
                    )}
                </HomeContentContainer>
            </ContentContainer>
        </HomeContainer>
    );
};

export default Home;
