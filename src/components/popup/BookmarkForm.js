import React from "react";
import PropTypes from "prop-types";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withSnackbar } from "notistack";
import BookmarkSchema from "./BookmarkSchema";

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

export function BookmarkForm(props) {
  const classes = useStyles();
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

BookmarkForm.propTypes = {
  initialValues: PropTypes.shape({
    bookmarkName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    regexp: PropTypes.string.isRequired
  }),
  enqueueSnackbar: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withSnackbar(BookmarkForm);
