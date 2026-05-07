import { Field, Form, Formik } from "formik";
import React from "react";

import { FormikTextField, SubmitButton } from "@/shared/components/helpers";

import BookmarkSchema from "./BookmarkSchema";

const defaultInitialValues = {
  regExp: "",
  title: "",
  url: "",
};

export default function BookmarkForm(props) {
  const { initialValues = defaultInitialValues, handleSubmit } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BookmarkSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, submitForm }) => (
        <Form>
          <Field
            type="text"
            name="title"
            label="Title"
            margin="normal"
            fullWidth
            component={FormikTextField}
          />
          <Field
            type="url"
            name="url"
            label="Url"
            margin="normal"
            fullWidth
            component={FormikTextField}
          />
          <Field
            type="text"
            name="regExp"
            label="Regular Expression"
            margin="normal"
            fullWidth
            component={FormikTextField}
          />
          <SubmitButton disabled={isSubmitting} onClick={submitForm} />
        </Form>
      )}
    </Formik>
  );
}
