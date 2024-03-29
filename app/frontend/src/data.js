export const theme = {
    colors: {
        blue01: "#25274D",
        blue02: "#2E9CCA",
        blue021: "#2E9CCA55",
        blue03: "#049",
        black01: "#000",
        black011: "#00000088",
        black012: "#00000034",
        white01: "#FFFFFF",
        white02: "#E2E2E2",
        white03: "#D9D9D9",
        white033: "#D9D9D935",
        white04: "#C4C4C4",
    },
    fonts: {
        size01: "40px",
        size02: "32px",
        size03: "24px",
        size04: "20px",
        size05: "18px",
        size06: "16px",
        size07: "15px",
    },
    mobileSize: 375,
};

export const loader_page = {
    mainText: "Text Summarizer",
};

export const screen = {
    href: {
        home: "home",
        converter: "converter",
    },
    home: {
        text: {
            homeText: "Nothing Selected",
            homeSubText:
                "Select action to perform by clicking on the add button below",
            buttonText: "Start Conversion",
        },
        imageSrc: {
            homeImageLarge:
                "./assets/images/serious-bearded-man-with-big-pencil-semi-flat-color 525x525.png",
            homeImageSmall:
                "./assets/images/serious-bearded-man-with-big-pencil-semi-flat-color 338x338.png",
        },
        imageSize: {
            large: 375,
            small: 200,
        },
        buttonCard: {
            header: "Select action",
            items: [
                {
                    imageSrc: "./assets/images/camera 16x14.png",
                    title: "Select image",
                },
                {
                    imageSrc: "./assets/images/paste 18x10.png",
                    title: "Click to paste link",
                },
                {
                    imageSrc: "./assets/images/pen 16x16.png",
                    title: "Click to paste text",
                },
            ],
        },
    },
    converter: {
        text: {
            userInputOptions: ["text", "image", "link"],
            resultTypeOptions: ["short", "moderate", "long"],
        },
        imageSrc: {
            smallCameraIcon: "./assets/images/camera 16x14.png",
            largeCameraIcon: "./assets/images/camera 67x56.png",
        },
    },
};
