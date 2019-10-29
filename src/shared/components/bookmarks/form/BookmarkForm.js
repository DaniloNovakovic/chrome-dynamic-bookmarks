import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import BookmarkSchema from "./BookmarkSchema";
import { SubmitButton } from "shared/components/helpers";

export default function BookmarkForm(props) {
  const { initialValues, handleSubmit } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BookmarkSchema}
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
    title: PropTypes.string,
    url: PropTypes.string,
    regExp: PropTypes.string
  }),
  handleSubmit: PropTypes.func.isRequired
};
