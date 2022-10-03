import { useContext, useEffect, useState } from "react";
import { useTheme } from "styled-components";
// context
import { AppContext } from "../../../contexts";
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
    SummaryContainer,
    Loader,
    SummaryText,
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

    const { isMobileView } = useContext(AppContext);

    const [formState, setFormState] = useForm({
        input_text: "",
        input_link: "",
        input_image: "",
        type: "",
    });

    const [loading, setLoading] = useState(false);

    const [inputOption, setInputOption] = useState(inputOptions[0]);
    const [typeOption, setTypeOption] = useState(typeOptions[0]);
    const [requestPayload, setRequestPayload] = useState({
        type: inputOption,
        body: null,
        summary_type: typeOption,
    });

    const [responsePayload, setResponsePayload] = useState({ success: false });

    const handleInputOptions = ({ target: { value } }) => {
        setInputOption(value);
    };

    const handleTypeOptions = ({ target: { value } }) => {
        setTypeOption(value);
    };

    const handleImageInput = (e) => {
        // var file;
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
            // file = files[0];
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

            let dataurl;

            imageReader.addEventListener("load", () => {
                dataurl = imageReader.result;

                labelElement.style.backgroundImage = `linear-gradient(to bottom, ${black011}, ${blue021}), url(${dataurl})`;
                labelElement.style.backgroundPosition = "0% 0%";
                labelElement.style.backgroundSize = "cover";
                labelElement.style.backgroundRepeat = "no-repeat";

                setFormState(
                    { target: { name: "input_image", value: dataurl } },
                    "image"
                );
            });
        } catch (error) {
            console.log({ error });
        } finally {
            return formState.input_image;
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
                        onChange={(e) => {
                            setFormState(e, "text");
                            // setRequestPayload({
                            //     type: "text",
                            //     body: formState.input_text,
                            // });
                        }}
                    />
                );
            case "link":
                return (
                    <FormTextArea
                        type="textarea"
                        name="input_link"
                        placeholder="Enter link to article or write-up to be summarized"
                        value={formState.input_link}
                        onChange={(e) => {
                            setFormState(e, "link");
                            // setRequestPayload({
                            //     type: "link",
                            //     body: formState.input_link,
                            // });
                        }}
                    />
                );
            case "image":
                return (
                    <>
                        <FormInput
                            type="file"
                            name="input_image"
                            id="input_image"
                            onChange={(e) => {
                                handleImageInput(e);
                            }}
                        />
                        <FormLabel htmlFor="input_image">
                            <img src={largeCameraIcon} alt="kpele oo" />
                            <CardText>Upload image</CardText>
                        </FormLabel>
                    </>
                );
            default:
                return <FormInput type="text" name="input_text" value={2} />;
        }
    };

    const handleSubmit = () => {
        console.log({ formState, requestPayload });
        let url = "http://127.0.0.1:5000/summary";

        let body = new FormData();
        body.append("type", requestPayload.type);
        body.append("body", requestPayload.body);
        // body.append("user_id", requestPayload.user_id);
        body.append("summary_type", requestPayload.summary_type);

        let options = {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body,
        };

        delete options.headers["Content-Type"];

        setResponsePayload((prevState) => ({
            ...prevState,
            success: false,
            error: false,
        }));

        setLoading(true);

        fetch(url, options)
            .then((res) => res.json())
            .then((res) => {
                setResponsePayload({ ...res, error: false });
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setResponsePayload({ success: false, err, error: true });
            });
    };

    const handleRequestPayload = (type, summary_type) => {
        switch (type) {
            case "text":
                setRequestPayload((prevState) => ({
                    ...prevState,
                    type,
                    body:
                        formState.input_text &&
                        formState.input_text
                            .replaceAll("\n", "")
                            .replaceAll("\r", "")
                            .replaceAll("\t", ""),
                    summary_type,
                }));
                break;
            case "link":
                setRequestPayload((prevState) => ({
                    ...prevState,
                    type,
                    body: formState.input_link,
                    summary_type,
                }));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (inputOption !== formState.type) {
            setFormState(null, inputOption);
        }
    }, [inputOption]);

    useEffect(() => {
        if (formState.type !== "image") {
            handleRequestPayload(formState.type, typeOption);
        } else {
            setRequestPayload((prevState) => ({
                ...prevState,
                type: "image",
                summary_type: typeOption,
            }));
        }
    }, [typeOption]);

    useEffect(() => {
        if (formState.type !== "image") {
            handleRequestPayload(formState.type, typeOption);
        } else {
            setRequestPayload((prevState) => ({
                ...prevState,
                type: "image",
                summary_type: typeOption,
                body: formState.input_image,
            }));
        }
    }, [formState]);

    useEffect(() => {
        console.log({ requestPayload });
    }, [requestPayload]);

    useEffect(() => {
        if (
            responsePayload.success === false &&
            responsePayload.error === true
        ) {
            console.log(responsePayload);
            window.alert(responsePayload.err);
            setResponsePayload((prevState) => ({ ...prevState, error: false }));
        }

        if (responsePayload.success && !responsePayload.summary_data) {
            setResponsePayload((prevState) => ({
                ...prevState,
                success: false,
                error: true,
                err: "Could not summarize text",
            }));
        }
    }, [responsePayload]);

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
                        <Card enableCard={true}>
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
                                    <Button onClick={handleSubmit}>
                                        Convert
                                    </Button>
                                </ButtonContainer>
                            </FormContainer>
                        </Card>
                        <Card enableCard={responsePayload.success}>
                            <CardHeader>
                                <CardText>Summary</CardText>
                            </CardHeader>
                            {loading ? (
                                <Loader src="./assets/gifs/Spinner-1s-200px.gif" />
                            ) : (
                                <SummaryContainer
                                    enableCard={responsePayload.success}
                                >
                                    <SummaryText>
                                        {responsePayload.summary_data}
                                    </SummaryText>
                                </SummaryContainer>
                            )}
                        </Card>
                    </CardContainer>
                </ConverterContentContainer>
            </ContentContainer>
        </ConverterContainer>
    );
};

export default Converter;
