import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import PopupDialog from '../../common/PopupDialog.jsx';
import AddCourse from './AddCourse.jsx';
import AddClass from './AddClass.jsx';
import AddSubject from './AddSubject.jsx';
import CustomSnackbar from '../../common/Snackbar.jsx';

const useStyles = makeStyles((theme) => ({
}));

const actions = [
  { icon: <Icon>class_icon</Icon>, name: 'add class' },
  { icon: <Icon>subject_icon</Icon>, name: 'add subject' },
  { icon: <Icon>list_icon</Icon>, name: 'add course' },
];

function getYear() {
    return new Date().getFullYear();
}

function AddCourseSubjectClass() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [years, setYears] = React.useState(undefined);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackIndex, setSnackIndex] = React.useState(0);

  const fillYears = () => {
    const thisYear = getYear();
    let newYear = {};
    let tempYears = [{value: "select year"}];
    let yearValue = "";

    for(let i = -2; i < 50; i++) {
      yearValue = `${thisYear-i}/${((thisYear-i-1899)-(thisYear-i-1899)%10)%100/10}${(thisYear-i-1899)%10}`;
      newYear = {value: yearValue};
      tempYears = [...tempYears, newYear];
      setYears(tempYears);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = (name) => {
    setOpen(false);
    if(name === "add course") setIndex(1);
    if(name === "add subject") setIndex(2);
    if(name === "add class") setIndex(3);
    fillYears();
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const handleSnackOpen = () => {
    setSnackOpen(true);
  };
  const handleSnackClose = () => {
    setSnackOpen(false);
  };
  const handleSnackIndex = (value) => {
    setSnackIndex(value);
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
            onClick={() => handleAction(action.name)}
            tooltipPlacement="bottom"
          />
        ))}
      </SpeedDial>
      {
        popupOpen && index === 1 ? <PopupDialog openPopup={popupOpen} setOpenPopup={closePopup} clickAway={false} style={{minWidth:'40%'}}>
          <AddCourse closePopup={closePopup} handleOpen={handleSnackOpen} handleIndex={handleSnackIndex}/>
        </PopupDialog>
        : null
      }{
        popupOpen && index === 2 ? <PopupDialog openPopup={popupOpen} setOpenPopup={closePopup} clickAway={false} style={{minWidth:'40%'}}>
          <AddSubject closePopup={closePopup} handleOpen={handleSnackOpen} handleIndex={handleSnackIndex}/>
        </PopupDialog>
        : null
      }{
        popupOpen && index === 3 ? <PopupDialog openPopup={popupOpen} setOpenPopup={closePopup} clickAway={false} style={{minWidth:'40%'}}>
          <AddClass years={years} closePopup={closePopup} handleOpen={handleSnackOpen} handleIndex={handleSnackIndex}/>
        </PopupDialog>
        : null
      }{
        snackOpen && snackIndex === 1 ? <CustomSnackbar handleClose={handleSnackClose} open={snackOpen} text="Class successfully added" status="success"/>
        : null
      }{
        snackOpen && snackIndex === 2 ? <CustomSnackbar handleClose={handleSnackClose} open={snackOpen} text="Subject successfully added" status="success"/>
        : null
      }{
        snackOpen && snackIndex === 3 ? <CustomSnackbar handleClose={handleSnackClose} open={snackOpen} text="Course successfully added" status="success"/>
        : null
      }
    </div>
  );
}
export default AddCourseSubjectClass;