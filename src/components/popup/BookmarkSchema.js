import * as Yup from "yup";

export const BookmarkSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Minimum of 2 characters is required!")
    .max(100, "Maximum allowed characters is 100!")
    .required("Required!"),
  url: Yup.string()
    .url("Invalid URL! (Must be in form https://...)")
    .required("Required!"),
  regExp: Yup.string()
    .required("Required!")
    .test("is-regex", "Invalid regular expression", function(value) {
      try {
        new RegExp(value);
        return true;
      } catch {
        return false;
      }
    })
});

export default BookmarkSchema;
