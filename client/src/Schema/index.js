import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const basicSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    username: yup.string().min(6).required("Required"),
    password: yup.string().min(6).matches(passwordRules, { message: "Please create a stronger password" }).required("Required"),
    renterpassword: yup.string().oneOf([yup.ref("password"), null], "Password must match").required("Required")

})

export default basicSchema;