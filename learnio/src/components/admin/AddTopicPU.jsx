import React from'react';
import {Button, TextField}from'@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme)=>({
    dialogWrapper:{
        position:'absolute',
    },
    grupaBotuna:{
      [theme.breakpoints.down('sm')]: {
        marginBottom: "2em",
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: "5em",
      },
    },
    title:{
        fontFamily:'roboto',
        fontsize:'3vh',
        flexGrow:'1',  
    },
    formControl: {
        margin: theme.spacing(2),
        width: "70%",
        position: "relative",
    },
    formControl2: {
        margin: theme.spacing(2),
        width: "30%",
        position: "relative",
    },
    root: {
        '& > *': {
          width: '25ch',
        },
    },
    popupStyle:{
      height:"auto",
      backgroundColor:"white",
      borderRadius:"7px" ,
      [theme.breakpoints.up('xl')]: {
        width:"80%",
      },
      [theme.breakpoints.down('md')]: {
        padding:"0 !important",
      },
      [theme.breakpoints.up('md')]: {
        padding:"0 0 1em 1em !important",
      },
      [theme.breakpoints.down('xl')]: {
        width:"100%",
    }},
    popupMenu:{
      [theme.breakpoints.down('sm')]: {
        marginBottom: "3em",
      },
      [theme.breakpoints.up('sm')]: {
        padding:"2em 0 3em 0",
    }
    },
    divider:{
        [theme.breakpoints.down('sm')]: {
          display:"none",
    }},
    buttonsInGroup:{
      backgroundColor:"#27AE60",
      color:"white",
      '&:hover': {
        backgroundColor: "#1f894b",
     },
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
    rightSide:{
      [theme.breakpoints.down('sm')]: {
        marginLeft:"0em",
        marginBottom:"1em",
      },
      [theme.breakpoints.up('sm')]: {
        padding:"2em 1em 3em 1em",
      }
    },
    dropText:{
      fontSize:"0.8rem",
      paddingRight:"1em"
    },
    dropMenus:{
      [theme.breakpoints.up('md')]: {
        paddingLeft:"2em !important",
      }
    },
    saveBtn: {
      borderRadius: "7px",
      background:"#EB4949",
      color:"white",
      paddingLeft:"3em",
      paddingRight:"3em",
      backgroundColor: "#EB4949",
      '&:hover': {
        backgroundColor: "#b81414",
    },
    },
}));

const tagNames = [
    'tag item 1',
    'tag item 2',
    'tag item 3',
    'tag item 4',
    'tag item 5',
    'tag item 6',
  ];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
};


function AddTopicPU(props){
    const [valueAO, setValueAO] = React.useState(1);
    const [valueD, setValueD] = React.useState(1);
    const [valueText,setValueText]=React.useState(' ');
    const [desc,setDesc]=React.useState(' ');
    const [show1, setShow1] = React.useState(true);
    const [show2, setShow2] = React.useState(false);
    const [tagName, setTagName] = React.useState([]);
    const topic = {topic: ' ',description: ' ', ao: 0, d: 0, tags: []};


    const handleChangeTag = (event) => {
        setTagName(event.target.value);
    };
    const handleChangeDesc=(event) => {
      setDesc(event.target.value);
  };
    const handleChangeText=(event)=>{
        setValueText(event.target.value); 
    };
    const handleChangeAO = (event) => {
    setValueAO(event.target.value); 
    };
    const handleChangeD = (event) => {
    setValueD(event.target.value); 
    };

    //submit botun sprema vrijednosti i poziva closePopUp
    const handleSave= ()=>{
        topic.topic=valueText;
        topic.description=desc;
        topic.ao=valueAO;
        topic.d=valueD;
        topic.tags=tagName;
        props.addTopic(topic);
        props.closePopup();
        //neznan jel uvik ovo radi closePopUp();
        //closePopUp();
        //pa san stavia ovo u komentar jer sigurno radi
        /*setOpenAddTopic(false);
        setValueAO(1);
        setValueD(1);
        setValueText(' ');
        setTagName([]);*/
    };
    // prilikom zatvaranja popupa da postavi sve na pocetne vrijednosti
    // const closePopUp=()=>{
    //     setOpenAddTopic(false);
    //     setValueAO(1);
    //     setValueD(1);
    //     setValueText(' ');
    //     setTagName([]);
    //     setShow1(true);
    //     setShow2(false);
    //     setShow3(false);
    // }

    const classes=useStyles();
    return(
        <Grid className={classes.popupStyle} container direction="row" justify="space-between" alignItems="center" style={{padding:"1em",height:"auto"}} wrap="wrap"> 
            <Grid container item className={classes.popupMenu} direction="column" justify="space-between" alignItems="center"  xs={12} md={4} > 
              <Grid item className={classes.grupaBotuna}>
              <ButtonGroup orientation="vertical" variant="contained">
                  <Button variant="contained" onClick={() => [setShow1(true),setShow2(false)]} className={classes.buttonsInGroup}>Topic information</Button>
                  <Button variant="contained" onClick={() => [setShow1(false),setShow2(true)]} className={classes.buttonsInGroup}>Connections</Button>
                </ButtonGroup>
              </Grid>
              <Grid item>          
                <Button variant="contained" className={classes.saveBtn} type="submit"  onClick={handleSave}>
                    SAVE  
                <Icon style={{marginLeft:"0.5em", fontSize:"1.3em"}} >save_icon</Icon>
                </Button>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem className={classes.divider}/>
            {
                        show1 ? 
                            <Grid container item direction="column" justify="space-between" alignItems="flex-start" xs={12} md={8} spacing={2} className={classes.rightSide}>
                                <Grid container item direction="row" xs={12} md={12} spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <TextField style={{marginTop: "1em", marginBottom: "1em"}} multiline rows={2} id="outlined-basic" variant="outlined" label="Topic name" value={valueText} onChange={handleChangeText}/>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField style={{marginTop: "1em", marginBottom: "1em"}} multiline rows={2} id="outlined-basic" variant="outlined" label="Description" value={desc} onChange={handleChangeDesc}/>
                                  </Grid>
                                </Grid>
                                <Grid className={classes.dropMenus} container item direction="row" xs={12} spacing={3}>
                                  <Grid container item diredtion="row" xs={12} md={6} alignItems="center">
                                    <p className={classes.dropText}>Select levels of AO :</p>                            
                                    <InputLabel id="demo-simple-select-label-AO"></InputLabel>
                                    <Select style={{width:"20%"}} labelId="demo-simple-select-label" id="demo-simple-select" value={valueAO} onChange={handleChangeAO}>
                                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((valuesAO) => (
                                      <MenuItem key={valuesAO} value={valuesAO}><ListItemText primary={valuesAO} /></MenuItem>))}                                   
                                    </Select>
                                  </Grid>
                                  <Grid container item diredtion="row" xs={12} md={6} alignItems="center">
                                      <p className={classes.dropText}>Select levels of D : </p>
                                      <InputLabel id="demo-simple-select-label-d"></InputLabel>
                                      <Select style={{width:"20%"}} labelId="demo-simple-select-label" id="demo-simple-select" value={valueD} onChange={handleChangeD}>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((valuesD) => (
                                        <MenuItem key={valuesD} value={valuesD}><ListItemText primary={valuesD} /></MenuItem>))}
                                      </Select>
                                  </Grid>
                                </Grid>
                            </Grid>
                            : null
                        }{
                        show2?
                              <Grid container item direction="column" justify="center" alignItems="center" xs={12} md={8} spacing={2} className={classes.rightSide}>
                                  <FormControl className={classes.formControl}>
                                    <InputLabel >Associated topics</InputLabel>
                                    <Select  multiple value={tagName} onChange={handleChangeTag} input={<Input />} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>
                                      {tagNames.map((name) => (
                                        <MenuItem key={name} value={name}>
                                          <Checkbox checked={tagName.indexOf(name) > -1} />
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            :null
                        }
        </Grid>
    );
}
export default AddTopicPU;