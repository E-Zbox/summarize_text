import { useState } from "react";

const useForm = (initialState) => {
    const [state, setState] = useState(initialState);

    return [
        state,
        (e, type) => {
            if (e !== null) {
                let { target: { name, value } } = e
                return setState({ ...state, [name]: value, type })
            }
            return setState({...state, type})
        },
    ];
};

export default useForm;
