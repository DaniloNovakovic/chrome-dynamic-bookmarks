import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const BookmarkSchema = Yup.object().shape({
  bookmarkName: Yup.string()
    .min(2, "Minimum of 2 characters is required!")
    .max(50, "Maximum allowed characters is 50!")
    .required("Required!"),
  url: Yup.string()
    .url("Invalid URL! (Must be in form https://...)")
    .required("Required!"),
  regexp: Yup.string()
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

function handleBookmarkSubmit(values) {
  console.log("Submitting ", values);
}

export default class BookmarkForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{ bookmarkName: "", url: "", regexp: "" }}
        validationSchema={BookmarkSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          handleBookmarkSubmit(values);
          actions.setStatus("Submitted!");
        }}
        render={({ isSubmitting, status }) => (
          <Form>
            <Field type="text" name="bookmarkName" />
            <ErrorMessage name="bookmarkName" component="p" />

            <Field type="url" name="url" />
            <ErrorMessage name="url" component="p" />

            <Field type="text" name="regexp" />
            <ErrorMessage name="regexp" component="p" />

            {status && status.msg && <div>{status.msg}</div>}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      />
    );
  }
}
