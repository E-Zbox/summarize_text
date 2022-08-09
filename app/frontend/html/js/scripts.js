const dataType = document.getElementById("data_type");
const summaryLength = document.getElementById("summary_length");
const dataTypeContainer = document.getElementById("data_type_container");
const dataTypeForm = document.getElementById("dataTypeForm");
const submitButton = document.getElementById("submit");

var userPayload = {
    type: "",
    body: "",
    user_id: "",
    summary_type: summaryLength.value,
};

const updateUserPayload = (update) => {
    userPayload = {
        ...userPayload,
        ...update,
        user_id: Date.now().toString(),
    };
};

const setDataTypeContainer = (value) => {
    let length = dataTypeContainer.children.length;
    let children = Array.from(dataTypeContainer.children);

    if (length > 2) {
        dataTypeContainer.removeChild(children[length - 1]);
    }

    let divTag, divTagId;

    divTagId = "user_input_container";

    if (document.getElementById(divTagId)) {
        divTag = document.getElementById(divTagId);
    } else {
        divTag = document.createElement("div");
        divTag.setAttribute("id", divTagId);
    }
    Array.from(divTag.children).forEach((child) => {
        console.log("divTag => ", child);
        divTag.removeChild(child);
    });

    switch (value) {
        case "image":
            let allowedTypes = [
                "image/png",
                "image/jpg",
                "image/jpeg",
                "image/gif",
            ];
            let imageTag, imageDivTag, inputTag, labelTag, infoTag;
            infoTag = document.createElement("div");
            imageTag = document.createElement("img");
            imageDivTag = document.createElement("div");
            inputTag = document.createElement("input");
            labelTag = document.createElement("label");
            infoTag.innerText = "Select Image";
            infoTag.id = "infoDiv";
            // imageTag.setAttribute("src", "../assets/images/camera_icon.png");
            imageTag.setAttribute("src", "./assets/images/camera_icon.png");
            imageTag.setAttribute("alt", "camera_icon");
            imageDivTag.id = "imageDiv";
            inputTag.setAttribute("type", "file");
            inputTag.setAttribute("accept", allowedTypes.toString());
            inputTag.setAttribute("id", "user_input");
            inputTag.addEventListener("change", ({ target: { files } }) => {
                console.log({ files });
                let [{ name: _name, size, type }] = files;
                let maxSize = 1024 * 1024;
                let _size = Number(Number(size / maxSize).toPrecision(3));
                let error = { message: [] };
                console.log({ _name, size, type });
                console.log({ allowedTypes });
                if (!allowedTypes.includes(type)) {
                    console.log("file-type error");
                    error.message.push("File type error");
                }
                if (_size > 1) {
                    console.log("size error");
                    error.message.push("File size error");
                }

                console.log(allowedTypes.includes(type), _size);
                if (allowedTypes.includes(type) & (_size < 1)) {
                    // delete from here to
                    let span1 = document.createElement("span");
                    let span2 = document.createElement("span");
                    let span3 = document.createElement("span");
                    span1.innerText = `File: ${_name}`;
                    span2.innerText = `Size: ${_size} MB`;
                    span3.innerText = `Type: ${type}`;
                    infoTag.innerText = "";
                    // ...delete here

                    let imageReader = new FileReader();
                    imageReader.readAsDataURL(files[0]);
                    imageReader.onerror = () => {
                        console.log(`an error occurred while loading ${_name}`);
                    };

                    imageReader.addEventListener("load", () => {
                        divTag.style.backgroundImage = `linear-gradient(to bottom, #324234a5, #fff4, #000f), url(${imageReader.result})`;
                        divTag.style.backgroundPosition = "0% 0%";
                        divTag.style.backgroundSize = "cover";
                        divTag.style.backgroundRepeat = "no-repeat";

                        // userPayload update
                        updateUserPayload({
                            type: "image",
                            body: imageReader.result,
                        });
                    });
                }
            });
            imageDivTag.appendChild(imageTag);
            labelTag.setAttribute("for", "user_input");
            labelTag.appendChild(inputTag);
            labelTag.appendChild(imageDivTag);
            labelTag.appendChild(infoTag);
            divTag.appendChild(labelTag);

            break;

        case "link":
            console.log("i am here");
            let inputLink = document.createElement("textarea");

            inputLink.setAttribute("type", "url");
            inputLink.setAttribute("placeholder", "Paste link");

            inputLink.addEventListener("change", () => {
                updateUserPayload({ type: "link", body: inputLink.value });
            });

            divTag.appendChild(inputLink);
            break;

        case "text":
            let inputText = document.createElement("textarea");

            inputText.setAttribute("type", "url");
            inputText.setAttribute("placeholder", "Paste text");

            inputText.addEventListener("change", () => {
                updateUserPayload({ type: "text", body: inputText.value });
            });

            divTag.appendChild(inputText);
            break;

        default:
            break;
    }
    dataTypeForm.appendChild(divTag);
};

setDataTypeContainer(dataType.value);

dataType.addEventListener("change", (e) => {
    let {
        target: { value: data_type_value },
    } = e;

    console.log({ data_type_value });
    setDataTypeContainer(data_type_value);
});

summaryLength.addEventListener("change", ({ target }) => {
    let { value: summary_type } = target;

    console.log("this happened => ", summary_type);
    updateUserPayload({ summary_type });
});

submitButton.addEventListener("click", (e) => {
    let url = "http://127.0.0.1:5000";

    console.log({ userPayload });

    fetch(url, {
        body: JSON.stringify(userPayload),
        method: "POST",
    })
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        });
});
