import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Icon from '@material-ui/core/Icon';
import AddCourse from './AddCourse.jsx';
import AddClass from './AddClass.jsx';
import AddSubject from './AddSubject.jsx';
import CustomSnackbar from '../../common/Snackbar.jsx';
import PopupDialog from '../../common/PopupDialog';
import InviteLink from './InviteLink';
import EditIcon from '@material-ui/icons/Edit';
import AddTopicPU from './AddTopicPU';
import { useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  speedDial:{
    marginRight: 0,
    marginLeft: "auto",
    borderRadius: 25,
    color: "#FFFFFF",
    maxHeight: "20",
    position: "fixed",
    bottom: "7%",
    right: "5%"
  }
}));

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
  const [snackbarText,setSnackbarText]=React.useState(()=>"");
  const [snackbarStatus,setSnackbarStatus]=React.useState(()=>"");

  const role=useSelector(state=>state.login);

  let actionsStart = [
    { icon: <Icon>apps</Icon>, name: 'Add topic', operation: 'addtopic' },
    { icon: <Icon>list_icon</Icon>, name: 'Add unit', operation: 'addcourse' },
  ];

  if(role==="admin"){
    actionsStart.push({ icon: <Icon>subject_icon</Icon>, name: 'Add subject', operation: 'addsubject' });
    actionsStart.push({ icon: <Icon>class_icon</Icon>, name: 'Add class', operation: 'addclass' }); 
    actionsStart.push({ icon: <Icon>account_circle_sharp</Icon>, name: 'Add user', operation: 'adduser' });    
  };

  actionsStart.push({ icon: <Icon>insert_link_icon</Icon>, name: 'Invite Link' , operation: 'invitePopUp'});

  const actions = actionsStart;

  

  // kupi sve godine od 2,3 generacije u buducnost do 50 godina prije nas, minjaj kako pase
  
  const fillYears = () => {
    const thisYear = getYear();
    let newYear = {};
    let tempYears = [];
    let yearValue = "";

    for(let i = -2; i < 50; i++) {
      yearValue = `${thisYear-i}/${((thisYear-i-1899)-(thisYear-i-1899)%10)%100/10}${(thisYear-i-1899)%10}`;
      newYear = {value: yearValue};
      tempYears = [...tempYears, newYear];
      setYears(tempYears);
    }
  };

  //otvaranje i zatvaranje speed diala
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //izvrsavanje akcija za akcije u speed dialu
  function handleClick (e,operation){
    setOpen(false);
    e.preventDefault();
    if(operation === "invitePopUp") setIndex(4);
    if(operation === "addcourse") setIndex(1);
    if(operation === "addsubject") setIndex(2);
    if(operation === "addtopic") setIndex(5);
    if(operation === "addclass") {
      fillYears();
      setIndex(3);
    }
    if(operation === "adduser"){
      window.location.assign("/register");
    }
    setPopupOpen(true);
  };
// otvara zatvara popup, snack i indeksira
  const closePopup = () => {
    setPopupOpen(false);
    setIndex(0);
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
    <div className={classes.speedDial}>
      <SpeedDial
      className={classes.speedDial}
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open} 
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(e) => {
              handleClick(e,action.operation, action.name)
            }}
            tooltipPlacement="left"
          />
        ))}
      </SpeedDial>
      {/* popupopen dopusta popup al se ne otvara dok se neki index ne poklopi */}
      {
        popupOpen && index === 1 ? <PopupDialog openPopup={popupOpen} setOpenPopup={closePopup} clickAway={false} style={{minWidth:'40%'}}>
          <AddCourse closePopup={closePopup} handleOpen={handleSnackOpen} handleIndex={handleSnackIndex}/>
        </PopupDialog>
        : null
      }{
        popupOpen && index === 2 && role === "admin"? <PopupDialog openPopup={popupOpen} setOpenPopup={closePopup} clickAway={false} style={{minWidth:'40%'}}>
          <AddSubject closePopup={closePopup} handleOpen={handleSnackOpen} handleIndex={handleSnackIndex}/>
        </PopupDialog>
        : null
      }{
        popupOpen && index === 3 && role === "admin"? <PopupDialog openPopup={popupOpen} setOpenPopup={closePopup} clickAway={false} style={{minWidth:'40%'}}>
          <AddClass years={years} closePopup={closePopup} handleOpen={handleSnackOpen} handleIndex={handleSnackIndex}/>
        </PopupDialog>
        : null
      }{
        popupOpen && index === 4 ? <PopupDialog openPopup={popupOpen} setOpenPopup={closePopup} clickAway={false} style={{minWidth:'40%'}}>
          <InviteLink closeInvite={closePopup}></InviteLink>
        </PopupDialog>
        : null
      }{
        popupOpen && index === 5 ? <PopupDialog openPopup={popupOpen} setOpenPopup={closePopup} clickAway={false}>
          <AddTopicPU addOrEdit={true} closePopup={closePopup} setSnackbarOpen={setSnackOpen} setSnackbarText={setSnackbarText} setSnackbarStatus={setSnackbarStatus} />
        </PopupDialog>
        : null
      }
      {/* snackbarovi indeksirani da se ne radi state za svaki snackbar */}
      {
        snackOpen && snackIndex === 1 ? <CustomSnackbar handleClose={handleSnackClose} open={snackOpen} text="Class successfully added" status="success"/>
        : null
      }{
        snackOpen && snackIndex === 2 ? <CustomSnackbar handleClose={handleSnackClose} open={snackOpen} text="Subject successfully added" status="success"/>
        : null
      }{
        snackOpen && snackIndex === 3 ? <CustomSnackbar handleClose={handleSnackClose} open={snackOpen} text="Course successfully added" status="success"/>
        : null
      }{
        snackOpen && index===5 ? <CustomSnackbar handleClose={handleSnackClose} open={snackOpen} text={snackbarText} status={snackbarStatus}/>
        : null
      } 
    </div>
  );
}
export default AddCourseSubjectClass;