import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
// styles
import {
    ConverterContainer,
    ConverterContentContainer,
    MenuContainer,
    ListContainer,
    List,
    Card,
    CardContainer,
    CardHeader,
    CardText,
    FormContainer,
    FormTextArea,
    FormInput,
    FormLabel,
    Select,
    Option,
} from "../../Styles/Screen/Converter";
import {
    ContentContainer,
    RowFlexContainer,
} from "../../Styles/Others/Container";
import { ButtonContainer, Button } from "../../Styles/Others/Button";
// hooks
import useForm from "../../../hooks/useForm";

const Converter = ({ text, imageSrc, href }) => {
    const { userInputOptions: inputOptions, resultTypeOptions: typeOptions } =
        text;
    const { largeCameraIcon } = imageSrc;
    // theme
    const {
        colors: { blue02, blue021, black01, black011, black02 },
        mobileSize,
    } = useTheme();

    const [inputOption, setInputOption] = useState(inputOptions[0]);
    const [typeOption, setTypeOption] = useState(typeOptions[0]);
    const [isMobileView, setIsMobileView] = useState(false);
    const [screenState, setScreenState] = useState({
        width: null,
        height: null,
    });
    const [formState, setFormState] = useForm({
        input_text: "",
        input_link: "",
        input_image: "",
    });

    const handleInputOptions = ({ target: { value } }) => {
        setInputOption(value);
    };

    const handleTypeOptions = ({ target: { value } }) => {
        setTypeOption(value);
    };

    const handleImageInput = (e) => {
        const allowedImageTypes = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/gif",
        ];
        try {
            let {
                target: {
                    files,
                    labels: [labelElement],
                },
            } = e;
            let [{ size, type }] = files;
            let maxSize = 1024 * 1024;
            let _size = Number(Number(size / maxSize).toPrecision(3));

            if (!allowedImageTypes.includes(type)) {
                e.target.files = [];
                throw Error("File type error");
            }
            if (_size > 1) {
                e.target.files = [];
                throw Error("File size error");
            }

            let imageReader = new FileReader();
            imageReader.readAsDataURL(files[0]);
            imageReader.onerror = () => {
                throw Error("An error occurred");
            };
            imageReader.addEventListener("load", () => {
                labelElement.style.backgroundImage = `linear-gradient(to bottom, ${black011}, ${blue021}), url(${imageReader.result})`;
                labelElement.style.backgroundPosition = "0% 0%";
                labelElement.style.backgroundSize = "cover";
                labelElement.style.backgroundRepeat = "no-repeat";
            });
        } catch (error) {
            console.log({ error });
        }
    };

    const getFormElement = () => {
        switch (inputOption) {
            case "text":
                return (
                    <FormTextArea
                        type="textarea"
                        name="input_text"
                        placeholder="Enter word, phrase to be summarized"
                        value={formState.input_text}
                        onChange={(e) => setFormState(e)}
                    />
                );
            case "link":
                return (
                    <FormTextArea
                        type="textarea"
                        name="input_link"
                        placeholder="Enter link to article or write-up to be summarized"
                        value={formState.input_link}
                        onChange={(e) => setFormState(e)}
                    />
                );
            case "image":
                return (
                    <>
                        <FormInput
                            type="file"
                            name="input_image"
                            id="input_image"
                            onChange={(e) => handleImageInput(e)}
                        />
                        <FormLabel htmlFor="input_image">
                            <img src={largeCameraIcon} alt="pele oo" />
                            <CardText>Upload image</CardText>
                        </FormLabel>
                    </>
                );
            default:
                return <FormInput type="text" name="input_text" value={2} />;
        }
    };

    useEffect(() => {
        let { clientHeight: height, clientWidth: width } = document.body;
        setScreenState({ height, width });
    }, []);

    useEffect(() => {
        let condition = screenState.width < mobileSize + 15;
        setIsMobileView(condition ? true : false);
    }, [screenState, mobileSize]);

    return (
        <ConverterContainer id={href.converter}>
            <ContentContainer _width={"100%"}>
                <ConverterContentContainer>
                    <MenuContainer>
                        {isMobileView ? (
                            <ListContainer>
                                <List _color={black01}>
                                    <a href={"#" + href.home}>.</a>
                                    <a href={"#" + href.home}>.</a>
                                    <a href={"#" + href.home}>.</a>
                                </List>
                            </ListContainer>
                        ) : (
                            <ListContainer>
                                <List _color={black02}>
                                    <a href={"#" + href.home}>Home</a>
                                </List>
                                <List _color={blue02}>&gt;</List>
                                <List _color={black01} _fontWeight={600}>
                                    Converter
                                </List>
                            </ListContainer>
                        )}
                    </MenuContainer>
                    <CardContainer>
                        <Card>
                            <CardHeader>
                                <Select onChange={handleInputOptions}>
                                    {inputOptions.map((option, index) => (
                                        <Option key={index} value={option}>
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                                <RowFlexContainer>
                                    <CardText>Type:</CardText>
                                    <Select
                                        onChange={handleTypeOptions}
                                        value={typeOption}
                                    >
                                        {typeOptions.map((option, index) => (
                                            <Option key={index} value={option}>
                                                {option}
                                            </Option>
                                        ))}
                                    </Select>
                                </RowFlexContainer>
                            </CardHeader>
                            <FormContainer>
                                {getFormElement()}
                                <ButtonContainer
                                    _width={isMobileView ? "70%" : "100%"}
                                    _height={isMobileView ? "35px" : "40px"}
                                    showAfter={false}
                                >
                                    <Button>Convert</Button>
                                </ButtonContainer>
                            </FormContainer>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardText>Summary</CardText>
                            </CardHeader>
                        </Card>
                    </CardContainer>
                </ConverterContentContainer>
            </ContentContainer>
        </ConverterContainer>
    );
};

export default Converter;
