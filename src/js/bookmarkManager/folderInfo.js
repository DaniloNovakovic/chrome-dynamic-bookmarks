import { div, img, a, span, i } from '../lib/react-clone';
import options from '../config/config';
import { displayBookmark } from './displayFunctions';
import {
  findLeafNodes,
  renderChildren,
  createChildInfoId,
  sortFolderInfoChildren
} from '../utils/folderInfo';
import * as dynBookmarks from '../lib/dynBookmarks';

const {
  trackedFileIconColor,
  defaultFileIconColor,
  defaultFolderIconColor
} = options;

document.addEventListener('DOMContentLoaded', () => {
  initFolderInfo();

  chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    setTimeout(() => {
      dynBookmarks.findById(bookmark.id, (err, dynBookItem) => {
        if (err) console.warn(err);
        const color = dynBookItem ? trackedFileIconColor : defaultFileIconColor;
        const childrenList = document.getElementById('folder-children-info');
        if (childrenList) {
          const infoChild = createFolderInfoChild(
            bookmark.id,
            bookmark.title,
            bookmark.url,
            color
          );
          if (infoChild) {
            childrenList.appendChild(infoChild);
          } else {
            console.warn(
              `failed to create infoChild ${JSON.stringify({
                id: bookmark.id,
                title: bookmark.title,
                url: bookmark.url,
                color
              })}`
            );
          }
        }
      });
    }, 100);
  });
  chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
    const childInfo = document.getElementById(createChildInfoId(id));
    if (childInfo) {
      const childInfoWrapper = childInfo.parentElement;
      childInfoWrapper.remove();
    }
  });
  chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
    setTimeout(() => renderChildren(false), 100);
  });
  chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
    renderChildren();
  });
});

/* Children functionality */
// depends: findLeafNodes, createFolderInfoChild, trackedFileIconColor, defaultFileIconColor
function initFolderInfo() {
  const childrenList = document.getElementById('folder-children-info');

  chrome.bookmarks.getTree((results) => {
    if (chrome.runtime.lastError) {
      console.warn(chrome.runtime.lastError.message);
    } else {
      dynBookmarks.findAll((err, dynBook) => {
        if (err) console.warn(err);
        childrenList.innerHTML = '';
        for (let child of results) {
          findLeafNodes(child, (node) => {
            const color = dynBook[node.id]
              ? trackedFileIconColor
              : defaultFileIconColor;
            const infoChild = createFolderInfoChild(
              node.id,
              node.title,
              node.url,
              color
            );
            if (infoChild) {
              childrenList.appendChild(infoChild);
            } else {
              console.warn(
                `failed to create infoChild ${JSON.stringify({
                  id: node.id,
                  title: node.title,
                  url: node.url
                })}`
              );
            }
          });
        }
        sortFolderInfoChildren();
      });
    }
  });
}

// depends: defaultFolderIconColor, div, img a span i, displayBookmark, createChildInfoId
/**
 * Creates and returns new FolderInfoChild element (returns null upon failure)
 * @param {string} id - (bookmark.id - resulting id of element will be `child-info-${id}`)
 * @param {string} title - (bookmark.title - name of the bookmark)
 * @param {string} url - (bookmark.url - url to which bookmark points to)
 * @param {string} color - materializecss className color of text (note: lightened/darkened are added automatically so don't use them)
 */
function createFolderInfoChild(
  id,
  title = 'unknown',
  url = 'about:blank',
  color = defaultFolderIconColor
) {
  if (!id) {
    console.warn('in createFolderInfoChild id was undefined');
    return null;
  }
  let hostName = url.match(/^(http[s]?:\/\/.*?\/)/i);
  let faviconLink;
  if (hostName) {
    hostName = hostName[0].replace(/http[s]:\/\//, '');
    faviconLink = 'https://www.google.com/s2/favicons?domain=' + hostName;
  } else {
    // i used this instead of ../images/ because default_favicon is located
    // in same folder after `npm run dev` (or build)
    faviconLink = './default_favicon.png';
  }

  return div(
    { className: 'child-info-wrapper' },
    img({ src: faviconLink, className: 'favicon' }),
    a(
      {
        id: createChildInfoId(id),
        href: url,
        className: `truncate`,
        target: '_blank'
      },
      span({ className: `${color} text-darken-4 child-info-title` }, title),
      span({ className: `${color}  child-info-link` }, ` (${url})`)
    ),
    i(
      {
        className: 'material-icons edit-child-info-icon',
        onClick: () => {
          displayBookmark(id);
        }
      },
      'more_vert'
    )
  );
}
