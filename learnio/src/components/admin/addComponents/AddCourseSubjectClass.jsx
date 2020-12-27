import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Icon from '@material-ui/core/Icon';
import PopupDialog from '../../common/PopupDialog';
import InviteLink from './InviteLink';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  /*root: {
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },*/
}));

const actions = [
  { icon: <Icon>class_icon</Icon>, name: 'Add Class', operation: 'AddClass' },
  { icon: <Icon>subject_icon</Icon>, name: 'Add Subject', operation: 'AddSubject' },
  { icon: <Icon>list_icon</Icon>, name: 'Add Course', operation: 'AddCourse' },
  { icon: <Icon>insert_link_icon</Icon>, name: 'Invite Link' , operation: 'invitePopUp'},
];

function AddCourseSubjectClass() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [InvitePU,setInvitePU]=React.useState(false);

  //otvaranje i zatvaranje speed diala
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // zatvaranje popup za invite link
  const handleCloseInvite=()=>{
    setInvitePU(false);
  }
  //izvrsavanje akcija za akcije u speed dialu
  function handleClick (e,operation){
    e.preventDefault();
    if(operation=="invitePopUp"){
      setInvitePU(true);

    }//prototip za ostale akcije
    //else if(operation=="tag"){
      //do something else
    //}
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
      className={classes.speedDial}
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
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
            onClick={(e) => {
              handleClick(e,action.operation)
            }}
            tooltipPlacement="bottom"
          />
        ))}
      </SpeedDial>
      <PopupDialog openPopup={InvitePU} setOpenPopup={handleCloseInvite} style={{minWidth:'40%',minHeight:'25%'}}>
            <InviteLink closeInvite={handleCloseInvite}></InviteLink>
      </PopupDialog>
    </div>
  );
}
export default AddCourseSubjectClass;