import { div, i, span } from '../lib/react-clone';
import options from '../config/config';
const { defaultFileIconColor } = options;

const File = (props) => {
  const iconColor = props.fileIconColor || defaultFileIconColor;
  return div(
    {
      ...props,
      className: `file hoverable ${props.className}`
    },
    i({ className: 'material-icons', style: 'opacity: 0;' }, 'arrow_right'),
    i(
      { className: `material-icons ${iconColor} file-icon` },
      'insert_drive_file'
    ),
    span(null, props.name)
  );
};

export default File;
