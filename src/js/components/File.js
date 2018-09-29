import { div, i, span } from '../lib/react-clone';
import options from '../config/config';
const { defaultFileIconColor } = options;

const File = ({ name, id, fileIconColor, onClick }) => {
  const iconColor = fileIconColor || defaultFileIconColor;
  return div(
    {
      className: 'file hoverable',
      onClick: onClick,
      ...(id && { id })
    },
    i({ className: 'material-icons', style: 'opacity: 0;' }, 'arrow_right'),
    i(
      { className: `material-icons ${iconColor} file-icon` },
      'insert_drive_file'
    ),
    span(null, name)
  );
};

export default File;
