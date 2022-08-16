export const userLogin = (state = false, action) => {
    switch (action.type) {
        case "SignIn":
            return true;

        case "Signout":
            return false
        default:
            return state;
    }


}

export const post = (state = {}, action) => {
    switch (action.type) {
        case "post":
            return action.payload;

        case "clear":
            return {}
        default:
            return state;
    }


}

export const reCallReducer = (state = false, action) => {
    switch (action.type) {
        case "reCall":
            return !state;


        default:
            return state;
    }


}


