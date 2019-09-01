import React, { useState, useEffect } from "react";
import BookmarkForm from "./BookmarkForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { createTrackedBookmark } from "../../lib/dynBookmarksFacade";
import { getCurrentTab } from "../../lib/tabs";
import generateRegExp from "../../utils/regexp/generator";

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
        const regexp = generateRegExp(url);
        console.log(regexp);
        setInitialValues({ bookmarkName: title, url, regexp });
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
  createTrackedBookmark(
    { title: values.bookmarkName, regExp: values.regexp, ...values },
    (errMsg, { id = "" }) => {
      if (errMsg) {
        done({ type: "error", message: errMsg });
      } else {
        done({
          type: "success",
          message: `Successfully created bookmark ${id}`
        });
      }
    }
  );
}
