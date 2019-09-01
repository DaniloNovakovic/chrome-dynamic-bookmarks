import React from "react";
import BookmarkForm from "./BookmarkForm";
import { bm as bookmarks } from "../../lib/bookmarks";
import { dbm as storage } from "../../lib/storage";

function createTrackedBookmark({ title, url, regexp }, done) {
  bookmarks.create({ title, url }, (errMsg, newBookmark) => {
    if (errMsg) {
      return done(errMsg);
    }
    storage.create({ id: newBookmark.id, regexp, history: [] }, done);
  });
}

export default function AddBookmarkForm() {
  const initialValues = {
    bookmarkName: "My New Bookmark",
    url: "github.com",
    regexp: "github"
  };
  /**
   * @param {any} values - `{bookmarkName, url, regexp}`
   * @param {FormikActions<any>} actions - Formik actions
   */
  function handleSubmit(values, actions) {
    createTrackedBookmark(
      { title: values.bookmarkName, ...values },
      (errMsg, bookmark) => {
        if (errMsg) {
          console.warn(errMsg);
        } else {
          console.log(`Successfully created bookmark ${bookmark.id}`);
          actions.resetForm();
        }
        actions.setSubmitting(false);
      }
    );
  }

  return (
    <BookmarkForm initialValues={initialValues} handleSubmit={handleSubmit} />
  );
}
