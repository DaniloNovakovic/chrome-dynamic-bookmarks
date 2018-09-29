export function getInfoEditForm() {
  return document.getElementById('info-edit');
}
export function getInfoEditFormInputElements() {
  return {
    titleInput: document.getElementById('title-info-input'),
    urlInput: document.getElementById('url-info-input'),
    regExpInput: document.getElementById('regExp-info-input'),
    bookmarkIdInput: document.getElementById('bookmark-id-info-input')
  };
}

export function showInfoEditForm() {
  const infoEditForm = getInfoEditForm();
  infoEditForm.classList.remove('hide');
}
export function hideInfoEditForm() {
  const infoEditForm = getInfoEditForm();
  infoEditForm.classList.add('hide');
}
export function fillInfoEditForm(data) {
  const {
    titleInput,
    urlInput,
    regExpInput,
    bookmarkIdInput
  } = getInfoEditFormInputElements();

  titleInput.setAttribute('value', data.title);
  urlInput.setAttribute('value', data.url);
  regExpInput.setAttribute('value', data.regExp);
  bookmarkIdInput.setAttribute('value', data.id);
  M.updateTextFields();
}

export function getFolderEditForm() {
  return document.getElementById('folder-info-edit');
}
export function getFolderEditFormElements() {
  return {
    folderIdInput: document.getElementById('folder-id-info-input'),
    folderTitleInput: document.getElementById('folder-title-info-input')
  };
}

export function hideFolderInfoEdit() {
  const folderEditForm = getFolderEditForm();
  folderEditForm.classList.add('hide');
}
export function showFolderInfoEdit() {
  const folderEditForm = getFolderEditForm();
  folderEditForm.classList.remove('hide');
}
export function fillFolderEditForm({ id, title }) {
  const { folderIdInput, folderTitleInput } = getFolderEditFormElements();

  folderIdInput.setAttribute('value', id);
  folderTitleInput.setAttribute('value', title);
  M.updateTextFields();
}
