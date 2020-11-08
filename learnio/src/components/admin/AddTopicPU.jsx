import React from'react';
import {Button, Dialog,DialogContent,DialogTitle, TextField, Typography}from'@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';



import CloseIcon from'@material-ui/icons/Close';

const useStyles = makeStyles((theme)=>({
    dialogWrapper:{
        position:'absolute',
    },
    buttonGroup:{
        position: 'relative',
        top: '20%',
        height: '50%',
    },
    title:{
        fontFamily:'roboto',
        fontsize:'3vh',
        flexGrow:'1',  
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
        maxWidth: 300,
    },
    root: {
        '& > *': {
          width: '25ch',
        },
    },

}))

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

    const {openAddTopic,setOpenAddTopic}=props;
    const [valueAO, setValueAO] = React.useState(1);
    const [valueD, setValueD] = React.useState(1);
    const [valueText,setValueText]=React.useState(' ');
    const [show1, setShow1] = React.useState(true);
    const [show2, setShow2] = React.useState(false);
    const [show3, setShow3] = React.useState(false);
    const [tagName, setTagName] = React.useState([]);
    const [ID, setID] = React.useState(props.nextID);

    const topic = {topic: ' ', ao: 0, d: 0, tags: []};


    const handleChangeTag = (event) => {
        setTagName(event.target.value);
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
        topic.ao=valueAO;
        topic.d=valueD;
        topic.tags=tagName;
        props.addTopic(topic);
        //neznan jel uvik ovo radi closePopUp();
        closePopUp();
        //pa san stavia ovo u komentar jer sigurno radi
        /*setOpenAddTopic(false);
        setValueAO(1);
        setValueD(1);
        setValueText(' ');
        setTagName([]);*/
    };
    // prilikom zatvaranja popupa da postavi sve na pocetne vrijednosti
    const closePopUp=()=>{
        setOpenAddTopic(false);
        setValueAO(1);
        setValueD(1);
        setValueText(' ');
        setTagName([]);
        setShow1(true);
        setShow2(false);
        setShow3(false);
    }

    const classes=useStyles();
    return(
        <div>
            <Dialog open={openAddTopic} classes={{paper: classes.dialogWrapper}}>
                <DialogTitle>
                    <div style={{display:'flex'}}>
                        <Typography variant="h6" component="div" className={classes.title}>Add topic</Typography>
                        <CloseIcon onClick={()=>closePopUp()}></CloseIcon>
                    </div> 
                </DialogTitle>

                <DialogContent style={{display:'flex'}}>
                    <ButtonGroup className={classes.buttonGroup} color="primary"  orientation="vertical" size="small" aria-label="small outlined button group">
                        <Button onClick={
                            () => [setShow1(true),setShow2(false),setShow3(false)]
                            } >Topic name</Button>
                        <Button onClick={
                            () => [setShow1(false),setShow2(true),setShow3(false)]
                            }>Select difficulty levels</Button>
                        <Button onClick={
                            () => [setShow1(false),setShow2(false),setShow3(true)]
                            }>Tags</Button>
                    </ButtonGroup>
                    <div>{
                        show1 ? 
                            <div className={classes.formControl}>
                                <p>Topic name</p>
                                 <form className={classes.root} noValidate autoComplete="off">
                                    <TextField id="standard-basic" value={valueText} onChange={handleChangeText}/>
                                </form>
                            </div>
                            : null
                        }{
                        show2?
                            <div> 
                                <FormControl className={classes.formControl}>
                                    <p>Select number of AO</p>                            
                                    <InputLabel id="demo-simple-select-label-AO"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={valueAO}
                                        onChange={handleChangeAO}
                                    >
                                    {[1, 2, 3, 4].map((valuesAO) => (
                                    <MenuItem key={valuesAO} value={valuesAO}><ListItemText primary={valuesAO} /></MenuItem>))}                                   
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <p>Select difficulty levels(D)</p>
                                    <InputLabel id="demo-simple-select-label-d"></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={valueD}
                                        onChange={handleChangeD}
                                    >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((valuesD) => (
                                    <MenuItem key={valuesD} value={valuesD}><ListItemText primary={valuesD} /></MenuItem>))}
                                    </Select>
                                </FormControl>

                            </div>
                            :null
                        }{
                        show3 ? 
                            <div>
                                
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
                            </div>
                            : null
                        }
                        <Button className={classes.formControl} variant="contained" color="primary" onClick={handleSave}>SUBMIT</Button>
                    </div>               
                </DialogContent> 
            </Dialog>
        </div>
    );
}
export default AddTopicPU;