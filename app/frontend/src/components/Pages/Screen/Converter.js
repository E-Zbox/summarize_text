import { useState } from "react";
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
    } = useTheme();

    const [inputOption, setInputOption] = useState(inputOptions[0]);
    const [formState, setFormState] = useForm({
        input_text: "",
        input_link: "",
        input_image: "",
    });

    const handleInputOptions = ({ target: { value } }) => {
        setInputOption(value);
    };

    const handleImageInput = (e) => {
        const allowedImageTypes = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/gif",
        ];
        try {
            console.log({ e });
            let {
                target: {
                    files,
                    labels: [labelElement],
                },
            } = e;
            console.log("here you are ", { files });
            let [{ name: _name, size, type }] = files;
            console.log({ _name });
            console.log(e.target.value);
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
                            <img src={largeCameraIcon} alt="kpele oo" />
                            <CardText>Select image to upload</CardText>
                        </FormLabel>
                    </>
                );
            default:
                return <FormInput type="text" name="input_text" value={2} />;
        }
    };

    return (
        <ConverterContainer id={href.converter}>
            <ContentContainer>
                <ConverterContentContainer>
                    <MenuContainer>
                        <ListContainer>
                            <List _color={black02}>
                                <a href={"#" + href.home}>Home</a>
                            </List>
                            <List _color={blue02}>&gt;</List>
                            <List _color={black01} _fontWeight={600}>
                                Converter
                            </List>
                        </ListContainer>
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
                                    <Select value={typeOptions[0]}>
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
                                <ButtonContainer _width={"100%"}>
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
