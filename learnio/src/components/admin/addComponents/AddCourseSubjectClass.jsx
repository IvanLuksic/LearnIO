import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  /*speedDial: {
    position: 'relative',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },*/
}));

const actions = [
  { icon: <Icon>class_icon</Icon>, name: 'Add class' },
  { icon: <Icon>subject_icon</Icon>, name: 'Add subject' },
  { icon: <Icon>list_icon</Icon>, name: 'Add Course' },
];

function AddCourseSubjectClass() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<Icon>add_icon</Icon>}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open} 
        direction="left"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
            tooltipPlacement="bottom"
          />
        ))}
      </SpeedDial>
    </div>
  );
}
export default AddCourseSubjectClass;