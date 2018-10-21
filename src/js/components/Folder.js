import { div, header, i, span, ul } from '../lib/react-clone';
import options from '../config/config';
const {
  openedArrowIcon,
  closedArrowIcon,
  openedFolderIcon,
  closedFolderIcon,
  defaultFolderIconColor
} = options;

const Folder = (props, ...children) => {
  const { opened, name, id, folderIconColor, onClick } = props;
  const headerParams = { ...props };
  delete headerParams.id;
  const arrowIcon = opened ? openedArrowIcon : closedArrowIcon;
  const folderIcon = opened ? openedFolderIcon : closedFolderIcon;
  const folderName = name || 'unknown';
  const iconColor = folderIconColor || defaultFolderIconColor;
  return div(
    { className: 'folder', name: folderName, ...(id && { id }) },
    header(
      {
        ...headerParams,
        onClick: onClick,
        onDblclick: onClick,
        className: 'folder-header hoverable',
        opened: opened
      },
      i({ className: 'material-icons arrow-icon' }, arrowIcon),
      i(
        { className: `material-icons ${iconColor} text-darken-2 folder-icon` },
        folderIcon
      ),
      span(null, folderName)
    ),
    ul({ className: opened ? '' : 'hide' }, ...children)
  );
};

export default Folder;
