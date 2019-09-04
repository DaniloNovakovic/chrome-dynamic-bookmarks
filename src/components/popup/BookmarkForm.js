import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  button: {
    margin: "2em 0"
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

const BookmarkSchema = Yup.object().shape({
  bookmarkName: Yup.string()
    .min(2, "Minimum of 2 characters is required!")
    .max(100, "Maximum allowed characters is 100!")
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

export function BookmarkForm({ initialValues, handleSubmit, enqueueSnackbar }) {
  const classes = useStyles();

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
        <Container>
          <Form>
            <Field
              type="text"
              name="bookmarkName"
              label="Bookmark name"
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
              name="regexp"
              label="Regular Expression"
              margin="normal"
              fullWidth
              component={TextField}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={submitForm}
              disabled={isSubmitting}
              className={classes.button}
            >
              Submit
              <Icon className={clsx(classes.rightIcon, classes.iconSmall)}>
                send
              </Icon>
            </Button>
          </Form>
        </Container>
      )}
    />
  );
}

export default withSnackbar(BookmarkForm);
