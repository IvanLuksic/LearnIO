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
      width:"100%",
      height:"auto",
      backgroundColor:"white",
      padding:"3em !important",
      borderRadius: "7px",
    },
    popupMenu:{
        [theme.breakpoints.down('sm')]: {
          marginBottom: "3em",
    }},
    divider:{
        [theme.breakpoints.down('sm')]: {
          display:"none",
    }},
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
        paddingLeft:"4em",
        paddingRight:"4em",
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
            <Grid container item style={{maxWidth:"25%"}} direction="row" justify="space-between" alignItems="center">
            <Grid container item className={classes.popupMenu} direction="column" justify="space-between" alignItems="center"  xs={12} md={4} > 
                <Grid item className={classes.grupaBotuna}>
                    <ButtonGroup orientation="vertical" size="small" aria-label="small outlined button group">
                        <Button className={classes.buttonsInGroup} onClick={
                            () => [setShow1(true),setShow2(false)]
                            } >Information</Button>
                        <Button className={classes.buttonsInGroup} onClick={
                            () => [setShow1(false),setShow2(true)]
                            }>Tags</Button>
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
            </Grid>
            {
                        show1 ? 
                            <Grid container item direction="row" justify="space-between" alignItems="flex-start" style={{width:"70%"}}>
                                <Grid style={{width:"30%"}}>
                                    <TextField style={{marginTop: "1em", marginBottom: "1em"}} id="outlined-basic" variant="outlined" label="Topic name" value={valueText} onChange={handleChangeText}/>
                                    <TextField style={{marginTop: "1em", marginBottom: "1em"}} id="outlined-basic" variant="outlined" label="description" value={desc} onChange={handleChangeDesc}/>
                                </Grid>

                                <Grid style={{width:"45%"}}>
                                    <p style={{marginTop: "1em", marginBottom: "1em"}}>Select number of AO</p>                            
                                    <InputLabel id="demo-simple-select-label-AO"></InputLabel>
                                    <Select
                                        style={{width:"20%"}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={valueAO}
                                        onChange={handleChangeAO}
                                    >
                                    {[1, 2, 3, 4].map((valuesAO) => (
                                    <MenuItem key={valuesAO} value={valuesAO}><ListItemText primary={valuesAO} /></MenuItem>))}                                   
                                    </Select>
                                    <p style={{marginTop: "1em", marginBottom: "1em"}}>Select difficulty levels(D)</p>
                                    <InputLabel id="demo-simple-select-label-d"></InputLabel>
                                    <Select
                                        style={{width:"20%"}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={valueD}
                                        onChange={handleChangeD}
                                    >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((valuesD) => (
                                    <MenuItem key={valuesD} value={valuesD}><ListItemText primary={valuesD} /></MenuItem>))}
                                    </Select>
                                </Grid>
                            </Grid>
                            : null
                        }{
                        show2?
                            <Grid container items direction="row" alignItems="flex-start" style={{width:"70%"}}> 
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={tagName}
                                        onChange={handleChangeTag}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
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
              {/* {
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
              } */}
        </Grid>


        // <div>
        //     <Dialog open={openAddTopic} classes={{paper: classes.dialogWrapper}}>
        //         <DialogTitle>
        //             <div style={{display:'flex'}}>
        //                 <Typography variant="h6" component="div" className={classes.title}>Add topic</Typography>
        //                 <CloseIcon onClick={()=>closePopUp()}></CloseIcon>
        //             </div> 
        //         </DialogTitle>

        //         <DialogContent style={{display:'flex'}}>
        //             <ButtonGroup className={classes.buttonGroup} color="primary"  orientation="vertical" size="small" aria-label="small outlined button group">
        //                 <Button onClick={
        //                     () => [setShow1(true),setShow2(false),setShow3(false)]
        //                     } >Topic name</Button>
        //                 <Button onClick={
        //                     () => [setShow1(false),setShow2(true),setShow3(false)]
        //                     }>Select difficulty levels</Button>
        //                 <Button onClick={
        //                     () => [setShow1(false),setShow2(false),setShow3(true)]
        //                     }>Tags</Button>
        //             </ButtonGroup>
        //             <div>{
        //                 show1 ? 
        //                     <div className={classes.formControl}>
        //                         <p>Topic name</p>
        //                          <form className={classes.root} noValidate autoComplete="off">
        //                             <TextField id="standard-basic" value={valueText} onChange={handleChangeText}/>
        //                         </form>
        //                     </div>
        //                     : null
        //                 }{
        //                 show2?
        //                     <div> 
        //                         <FormControl className={classes.formControl}>
        //                             <p>Select number of AO</p>                            
        //                             <InputLabel id="demo-simple-select-label-AO"></InputLabel>
        //                             <Select
        //                                 labelId="demo-simple-select-label"
        //                                 id="demo-simple-select"
        //                                 value={valueAO}
        //                                 onChange={handleChangeAO}
        //                             >
        //                             {[1, 2, 3, 4].map((valuesAO) => (
        //                             <MenuItem key={valuesAO} value={valuesAO}><ListItemText primary={valuesAO} /></MenuItem>))}                                   
        //                             </Select>
        //                         </FormControl>

        //                         <FormControl className={classes.formControl}>
        //                             <p>Select difficulty levels(D)</p>
        //                             <InputLabel id="demo-simple-select-label-d"></InputLabel>
        //                             <Select
        //                                 labelId="demo-simple-select-label"
        //                                 id="demo-simple-select"
        //                                 value={valueD}
        //                                 onChange={handleChangeD}
        //                             >
        //                             {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((valuesD) => (
        //                             <MenuItem key={valuesD} value={valuesD}><ListItemText primary={valuesD} /></MenuItem>))}
        //                             </Select>
        //                         </FormControl>

        //                     </div>
        //                     :null
        //                 }{
        //                 show3 ? 
        //                     <div>
                                
        //                        <FormControl className={classes.formControl}>
        //                             <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
        //                             <Select
        //                                 labelId="demo-mutiple-checkbox-label"
        //                                 id="demo-mutiple-checkbox"
        //                                 multiple
        //                                 value={tagName}
        //                                 onChange={handleChangeTag}
        //                                 input={<Input />}
        //                                 renderValue={(selected) => selected.join(', ')}
        //                                 MenuProps={MenuProps}
        //                             >
        //                                 {tagNames.map((name) => (
        //                             <MenuItem key={name} value={name}>
        //                             <Checkbox checked={tagName.indexOf(name) > -1} />
        //                             <ListItemText primary={name} />
        //                             </MenuItem>
        //                             ))}
        //                         </Select>
        //                         </FormControl>
        //                     </div>
        //                     : null
        //                 }
        //                 <Button className={classes.formControl} variant="contained" color="primary" onClick={handleSave}>SUBMIT</Button>
        //             </div>               
        //         </DialogContent> 
        //     </Dialog>
        // </div>
    );
}
export default AddTopicPU;