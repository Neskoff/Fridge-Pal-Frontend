import * as yup from "yup";

const loginRequestValidationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export default loginRequestValidationSchema;
