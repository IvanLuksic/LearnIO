import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme)=>({
  popupStyle: {
    left: '0',
    top: '0',
    width: '100%',
    height: '40vh',
    backgroundColor: 'white',
  },
  leftSide: {
    float: 'left',
    left: '0px',
    top: '0px',
    width: '35%',
    height: '100%',
    position: 'relative',
  },
  rightSide: {
    borderStyle: 'outset',
    borderLeft: '2px',
    borderColor: '#3F51B5',
    left: '36%',
    top: '0px',
    width: '64%',
    height: '100%',
    position: 'relative',
  },
  bgr1: {
    position: 'relative',
    left:'10%',
    top: '30%',
    width: '80%',
    height: '50%',
  },
  saveBtn:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5%',
    width: '60%',
    left: '20%',
  },
  uploadBtn:{
    position: 'absolute',
    left: '5%',
    top: '53%',
    height: '15%',
    width: '40%',
  },
  photoCheck:{
    position: 'absolute',
    top: '53%',
    left: '80%',
  },
  editQuest:{
    position: 'absolute',
    left: '5%',
    top: '10%',
    height: '50%',
    width: '90%',
  },
  answerStyle:{
    height: '10%',
    width: '40%',
    position: 'absolute',
  },
  listThing:{
    width:'100%',
    maxWidth: 360,
    position: 'absolute',
    float: 'top',
    left: '20%',
    }
}));

const options = ['One word answer', 'Multiple Choice'];

function AddQuestPU(props) {
  //states of elements-------------------
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showIMG, setIMG] = useState(props.prop.photo);
  const [open, setOpen] = useState(false);
  const[selectedIndex, setSelectedIndex] = useState(0);
  const anchorRef = React.useRef(null);
  const [checked, setChecked] = useState([0]);

  const classes = useStyles();
//dropdown button---------------------
  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
//-------------------------

// tag - checklist-----------
const handleToggle2 = (value) => () => {
  const currentIndex = checked.indexOf(value);
  const newChecked = [...checked];

  if (currentIndex === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(currentIndex, 1);
  }

  setChecked(newChecked);
};
//------------------------

  return(
    // left popup div -------------------
    <div className={classes.popupStyle}>
      <div className={classes.leftSide}>
      <ButtonGroup color="primary" className={classes.bgr1} orientation="vertical" size="small" aria-label="small outlined button group">
        <Button onClick={
          () => [setShow1(true),setShow2(false)]
          } >question</Button>
        <Button onClick={
          () => [setShow1(false),setShow2(true)]
          }>answers</Button>
      </ButtonGroup>

      <Button variant="contained" className={classes.saveBtn} style={{borderRadius: 25}} type="submit" color="primary">
        Save Question
      </Button>

      </div>
      
{/* right, state dependable div -----------------------*/}

      <div className={classes.rightSide}>
        {
          show1 ? //first case - question
          <div>
          <TextField className={classes.editQuest}
            id="outlined-multiline-static"
            label="Question Text"
            multiline
            rows={4}
            variant="outlined"
            value={props.prop.text}
            />
          <Button onClick={
          () => setIMG(true)
          }className={classes.uploadBtn} variant="contained" color="primary">
            <p>Upload Photo <span style={{fontSize:'10px'}}> (optional)</span></p>

          </Button>
          {
          showIMG ?
          <div className={classes.photoCheck}>
            <button onClick={
          () => {
            setIMG(false);
          }
          }>remove photo</button>
            <p>yes photo</p>
          </div>
          : <div className={classes.photoCheck}> no photo </div>
        }
        </div>
          : null
        }{
          show2 ? // second case - answer
          <div>

            <Grid style={{top:'10%',left:'5%', float:'left', position:'absolute'}}>
      <Grid item xs={12}>
        <ButtonGroup color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
            {
              selectedIndex ? 
              <div>
              <TextField className={classes.answerStyle} id="outlined-basic" label="Correct Answer" variant="outlined" style={{top:'10%'}} />
              <TextField className={classes.answerStyle} id="outlined-basic" label="Incorect Answers" variant="outlined" style={{top:'40%'}} />
              </div>
              : 
              <TextField className={classes.answerStyle} id="outlined-basic" label="Answer" variant="outlined" style={{top:'10%'}} />
            }
          </div>
          : null
        }
      </div>


    </div>
  );
}

export default AddQuestPU;