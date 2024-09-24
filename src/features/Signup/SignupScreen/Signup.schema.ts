import * as Yup from "yup";

const signupSchema = Yup.object({
  email: Yup.string().label("Email").email().required(),
  password: Yup.string().label("Password").min(6).required(),
  firstName: Yup.string().label("First Name").min(3).required(),
  lastName: Yup.string().label("Last Name").min(3).required(),
});

export default signupSchema;
