import React, { useState, useEffect } from "react";
import { CircularProgress, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BookmarkForm } from "shared/components/bookmarks";
import { sendMessage, getCurrentTab } from "shared/lib/browser";
import { ADD_BM_NODE } from "shared/constants/requestTypes";
import { generateRegExp } from "shared/lib/regexp";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

export default function AddBookmarkForm() {
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    getCurrentTab(
      (errMsg, { url = "https://www.google.com", title = "New Bookmark" }) => {
        if (errMsg) {
          console.warn(errMsg);
        }
        const regExp = generateRegExp(url);
        setInitialValues({ title, url, regExp });
      }
    );
  }, []);

  const classes = useStyles();

  return initialValues ? (
    <Container>
      <BookmarkForm initialValues={initialValues} handleSubmit={handleSubmit} />
    </Container>
  ) : (
    <CircularProgress className={classes.progress} />
  );
}

function handleSubmit(values, done) {
  sendMessage(ADD_BM_NODE, values, done);
}
