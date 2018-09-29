import { displayFolderInfo } from './displayFunctions';
import globalSelectHandler from './selectHandler';

document.addEventListener('DOMContentLoaded', () => {
  const parentTitleInfo = document.getElementById('parent-title-info');
  const parentIdInfo = document.getElementById('parent-id-info');
  parentTitleInfo.addEventListener('click', () => {
    const id = parentIdInfo.textContent;
    displayFolderInfo(id);
    globalSelectHandler.setSelected(document.getElementById(id));
  });
});
