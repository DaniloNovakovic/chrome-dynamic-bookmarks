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
   * @param {function} done - callback function called with
   * `done({type: enum:'default' | 'success' | 'error' | 'info' , message:string})`
   */
  function handleSubmit(values, done) {
    createTrackedBookmark(
      { title: values.bookmarkName, ...values },
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

  return (
    <BookmarkForm initialValues={initialValues} handleSubmit={handleSubmit} />
  );
}
