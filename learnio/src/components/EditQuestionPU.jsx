import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
  grupaBotuna:{
    [theme.breakpoints.down('sm')]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: "5em",
    },
  },
  popupStyle:{
    width:"100%",
    height:"auto",
    backgroundColor:"white",
    padding:"3em !important",
    borderRadius:"7px" ,
    
  },
  popupMenu:{
    [theme.breakpoints.down('sm')]: {
      marginBottom: "3em",
  }},
  
  divider:{
    [theme.breakpoints.down('sm')]: {
      display:"none",
  }},
  editText:{
    [theme.breakpoints.down('sm')]: {
      marginLeft:"0em",
  }},
  buttonContainer:{
    display:"inline-block",
    position:"relative",
    },
    
   buttonB:{
      position: "absolute",
      top:"5px",
      right:"5px",
      cursor:"pointer",
      color:"#4373ec",
      [theme.breakpoints.down('sm')]: {
        display:"none",}
    },
    imageUploaded:{
      width:"15em",
      height:"auto", 
      borderRadius:"7px",
      border:"solid 2px #4373ec", 
      [theme.breakpoints.down('sm')]: {
        display:"none",}
    },
    buttonA:{
      color:"#4373ec",
      cursor:"pointer",
      fontSize:"2em",
      marginTop:"1em",
      paddingLeft:"3em",
      paddingRight:"3em",
      [theme.breakpoints.up('sm')]: {
        display:"none",}
    },
    buttonsInGroup:{
      backgroundColor:"#27AE60",
      background: "#27AE60", 
      color:"white",
      borderColor:"white",
      [theme.breakpoints.down('sm')]: {
        paddingLeft:"5em",
        paddingRight:"5em",
        paddingTop:"0.5em",
        paddingBottom:"0.5em",

      },
      [theme.breakpoints.up('md')]: {
        paddingLeft:"7em",
        paddingRight:"7em",
      },
    },
    pictureNotLoaded:{
      color:"lightgrey",
      textAlign:"left",
      fontStyle:"italic",
      [theme.breakpoints.down('sm')]: {
        marginTop:"1em",
        textAlign:"center"
      },
    },
    uploadButton:{
      [theme.breakpoints.down('sm')]: {
        paddingLeft:"3em",
        paddingRight:"3em",
        margin:"auto",
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft:"5em",
        paddingRight:"5em",
      },
  
    }
  // popupStyle: {
  //   left: '0',
  //   top: '0',
  //   width: '100%',
  //   height: 'auto',
  //   backgroundColor: 'white',
  //   padding:"3em !important",
  //   borderRadius:"7px" 
  // },
  // grupaBotuna: {
  //   p
  // },


  // photoCheck:{
  //   position: 'absolute',
  //   top: '53%',
  //   left: '80%',
  // },
  // answerStyle:{
  //   height: '10%',
  //   width: '40%',
  //   position: 'absolute',
  // },
  // listThing:{
  //   width:'100%',
  //   maxWidth: 360,
  //   position: 'absolute',
  //   float: 'top',
  //   left: '20%',
  //   }
}));

const options = ['One word answer', 'Multiple Choice'];

function EditQuestionPU(props) {
  //states of elements-------------------
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [showIMG, setIMG] = useState(props.prop.photo);
  const [open, setOpen] = useState(false);
  const[selectedIndex, setSelectedIndex] = useState(0);
  const anchorRef = React.useRef(null);
  const [text, setText] = useState(props.prop.text);
  const [quest, setQuest] = useState(props.prop);
  const [imageState, setimageState] = useState(null);


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

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleSave= ()=>{
    quest.text=text;
    props.questChange(quest);
    props.changeText(text);
  }
//------------------------

  return(
    // left popup div -------------------
    //<div >
      <Grid className={classes.popupStyle} container direction="row" justify="space-between" alignItems="center" style={{padding:"1em",height:"auto"}} wrap="wrap"> 
            <Grid container item className={classes.popupMenu} direction="column" justify="space-between" alignItems="center"  xs={12} md={4} > 
              <Grid item className={classes.grupaBotuna}>
                <ButtonGroup orientation="vertical" size="small" aria-label="small outlined button group">
                  <Button variant="contained" onClick={() => [setShow1(true),setShow2(false)]} className={classes.buttonsInGroup}>Question</Button>
                  <Button variant="contained" onClick={() => [setShow1(false),setShow2(true)]} className={classes.buttonsInGroup}>Answers</Button>
                </ButtonGroup>
              </Grid>
              <Grid item>          
                <Button variant="contained" style={{borderRadius: "7px",background:"#EB4949",color:"white",paddingLeft:"3em",paddingRight:"3em"}} type="submit"  onClick={handleSave}>
                    SAVE  
                <Icon style={{marginLeft:"0.5em", fontSize:"1.3em"}} color="white">save_icon</Icon>
                </Button>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem className={classes.divider}/>
              {
              show1 ? //first case - question
                  <Grid container item className={classes.editText} xs={12} md={8} direction="column" justify="center" alignItems="center" spacing={5}> 
                      <Grid container item xs={12}  justify="center" alignItems="center">
                        <TextField style={{width:"100%"}} id="outlined-multiline-static" label="Question Text" multiline rows={5} variant="outlined" value={text} onChange={handleText}/>
                      </Grid>
                      <Grid container item direction="row" justify="center" alignItems="center" >
                        <Grid container item xs justify="center" alignItems="center">
                          <input accept="image/*" style={{display:"none"}} id="contained-button-file" multiple type="file" onInput={(event)=>{ if(event.target.files && event.target.files[0]) {let img = event.target.files[0]; setimageState(URL.createObjectURL(img)); setIMG(true) ; console.log(showIMG)}}}/>
                          <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" className={classes.uploadButton}>
                              Upload photo
                            </Button>
                          </label>
                        </Grid>
                        <Grid container item xs justify="center" alignItems="center">
                          {
                          showIMG ?
                              <div className={classes.buttonContainer}>
                                <img  className={classes.imageUploaded} src={imageState} />
                                <Icon className={classes.buttonB} onClick={()=>{setIMG(false); setimageState(null)}}>cancel_icon</Icon>
                                <Icon className={classes.buttonA} onClick={()=>{setIMG(false); setimageState(null)}}>cloud_done_icon</Icon>
                              </div>   
                            : <p className={classes.pictureNotLoaded}> Image has not been uploaded yet.</p>
                          }      
                        </Grid> 
                      </Grid>
                   </Grid> 
              : null
              }
              
              {/* {
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
        </Grid>*/}
      
  </Grid>

  );
}

export default EditQuestionPU;