import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import BookmarkForm from "shared/components/bookmarks/form/BookmarkForm";
import { createTrackedBookmark } from "shared/lib/browser/dynBookmarksFacade";
import { getCurrentTab } from "shared/lib/browser/tabs";
import generateRegExp from "shared/lib/regexp/generator";

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
    <BookmarkForm initialValues={initialValues} handleSubmit={handleSubmit} />
  ) : (
    <CircularProgress className={classes.progress} />
  );
}

function handleSubmit(values, done) {
  createTrackedBookmark(values, (errMsg, { id = "" }) => {
    if (errMsg) {
      done({ type: "error", message: errMsg });
    } else {
      done({
        type: "success",
        message: `Successfully created bookmark ${id}`
      });
    }
  });
}
