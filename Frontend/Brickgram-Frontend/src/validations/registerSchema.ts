import * as Yup from 'yup'

export const registerSchema = Yup.object({
    username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(12, "Username must be 12 characters or less")
    .matches(/^\S+$/, "Username cannot contain spaces")
    .required("Username is required"),

    password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password too long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character (!@#$...)")
    .required("Password is required"),

    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
})