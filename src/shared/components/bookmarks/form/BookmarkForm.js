import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { withSnackbar } from "notistack";
import BookmarkSchema from "./BookmarkSchema";
import { SubmitButton } from "shared/components/helpers";

export function BookmarkForm(props) {
  const { initialValues, handleSubmit, enqueueSnackbar } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BookmarkSchema}
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
          <Field
            type="url"
            name="url"
            label="Url"
            margin="normal"
            fullWidth
            component={TextField}
          />
          <Field
            type="text"
            name="regExp"
            label="Regular Expression"
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

BookmarkForm.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    regExp: PropTypes.string.isRequired
  }),
  enqueueSnackbar: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withSnackbar(BookmarkForm);
