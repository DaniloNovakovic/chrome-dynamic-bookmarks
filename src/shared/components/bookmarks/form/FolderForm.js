import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { SubmitButton } from "shared/components/helpers";
import * as Yup from "yup";

const FolderSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Minimum of 2 characters is required!")
    .max(100, "Maximum allowed characters is 100!")
    .required("Required!")
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

FolderForm.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string
  }),
  handleSubmit: PropTypes.func.isRequired
};
