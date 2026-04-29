import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import * as Yup from "yup";

import { SubmitButton } from "@/shared/components/helpers";

const FolderSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Minimum of 2 characters is required!")
    .max(100, "Maximum allowed characters is 100!")
    .required("Required!"),
});

export default function FolderForm(props) {
  const { initialValues, handleSubmit } = props;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FolderSchema}
      onSubmit={handleSubmit}
      render={({ isSubmitting, submitForm }) => (
        <Form>
          <Field
            type="text"
            name="title"
            label="Title"
            margin="normal"
            fullWidth
            component={TextField}
          />
          <SubmitButton disabled={isSubmitting} onClick={submitForm} />
        </Form>
      )}
    />
  );
}
