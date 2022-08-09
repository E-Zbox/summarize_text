// styles
import {
    MainContainer,
    Container,
    Text,
    RectangleContainer,
    Rectangle,
} from "../Styles/Loader";

const Loader = ({ mainText, _width }) => (
    <MainContainer>
        <Container _width={_width}>
            <Text>{mainText}</Text>
            <RectangleContainer>
                <Rectangle></Rectangle>
            </RectangleContainer>
        </Container>
    </MainContainer>
);

export default Loader;
