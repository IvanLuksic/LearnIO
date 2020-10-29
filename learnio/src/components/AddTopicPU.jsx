import React from'react';
import {Button, Dialog,DialogContent,DialogTitle, TextField, Typography}from'@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';


import CloseIcon from'@material-ui/icons/Close';

const useStyles = makeStyles((theme)=>({
    dialogWrapper:{
        position:'absolute',
        textAlign: 'center',
        height:'36vh',
        width:'70%',
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
    bottonSubmit:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '5%',
        width: '30%',
        left: '35%',
    },
    diffLevels:{
        padding:'25px',
        position:'absolute',
        top:'25%',
        right:'20%',
        fontFamily:'roboto',
    },
    topic:{
        padding:'25px',
        position:'absolute',
        top:'30%',
        right:'20%',
    },
    group: {
        width: '30%',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',  
        padding:'5px', 
    },
    listItmes:{
        padding:'25px',
        position:'absolute',
        right:'20%',
    },

}))


function AddTopicPU(props){
    const {openAddTopic,setOpenAddTopic}=props;
    const [valueAO, setValueAO] = React.useState('1');
    const [valueD, setValueD] = React.useState('1');
    const [valueText,setValueText]=React.useState(' ');
    const [show1, setShow1] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [show3, setShow3] = React.useState(false);
    const [checked, setChecked] = React.useState([0]);

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
  
    const handleChangeText=(event)=>{
        setValueText(event.target.value); 
    }
    const handleChangeAO = (event) => {
    setValueAO(event.target.value); 
    };
    const handleChangeD = (event) => {
    setValueD(event.target.value); 
    };
    const classes=useStyles();
    return(
        <div>
            <Dialog open={openAddTopic} classes={{paper: classes.dialogWrapper}}>
                <DialogTitle>
                    <div style={{display:'flex'}}>
                        <Typography variant="h6" component="div" className={classes.title}>Add topic</Typography>
                        <CloseIcon onClick={()=>setOpenAddTopic(false)}></CloseIcon>
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
                            <div className={classes.topic}>
                                <FormControl component="fieldset"> 
                                    <TextField required id="standard-basic" label="insert topic name" value={valueText} onChange={handleChangeText}/>    
                                </FormControl>
                            </div>
                            : null
                        }{
                        show2?
                            <div className={classes.diffLevels}> 
                                <p>Select number of AO</p>
                                <RadioGroup  className={classes.group} aria-label="numberAO" component="div" name="numberAO" value={valueAO} onChange={handleChangeAO}>
                                    <FormControlLabel value="1" control={<Radio />} label="1" />
                                    <FormControlLabel value="2" control={<Radio />} label="2" />
                                    <FormControlLabel value="3" control={<Radio />} label="3" />
                                 </RadioGroup>
                                 <p>Select difficulty levels</p>
                                <RadioGroup  className={classes.group} aria-label="difficulty" component="div" name="difficulty" value={valueD} onChange={handleChangeD}>
                                    <FormControlLabel value="1" control={<Radio />} label="1" />
                                    <FormControlLabel value="2" control={<Radio />} label="2" />
                                    <FormControlLabel value="3" control={<Radio />} label="3" />
                                 </RadioGroup>
                            </div>
                            :null
                        }{
                        show3 ? 
                            <div>
                                <List className={classes.listItmes}>
                                    {[0, 1, 2, 3].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;
    
                                    return (
                                        <ListItem key={value} role={undefined} dense button onClick={handleToggle2(value)}>
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="comments">
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                                </List>                          
                            </div>
                            : null
                            }
                    </div>    
                    <Button className={classes.bottonSubmit} variant="contained" color="primary" onClick={()=>setOpenAddTopic(false)}>SUBMIT</Button>
                </DialogContent> 
            </Dialog>
        </div>
    );
}
export default AddTopicPU;