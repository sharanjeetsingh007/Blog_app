import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().min(6).matches(passwordRules, { message: "Please create a stronger password" }).required("Required"),

})

export default loginSchema;