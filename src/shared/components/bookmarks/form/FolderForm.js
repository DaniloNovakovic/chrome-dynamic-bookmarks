import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { withSnackbar } from "notistack";
import { SubmitButton } from "shared/components/helpers";
import * as Yup from "yup";

const FolderSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Minimum of 2 characters is required!")
    .max(100, "Maximum allowed characters is 100!")
    .required("Required!")
});

export function FolderForm(props) {
  const { initialValues, handleSubmit, enqueueSnackbar } = props;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FolderSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values, status => {
          actions.setSubmitting(false);
          actions.setStatus(status);
          if (enqueueSnackbar) {
            enqueueSnackbar(status.message, { variant: status.type });
          }
        });
      }}
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
  enqueueSnackbar: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired
};

export default withSnackbar(FolderForm);
