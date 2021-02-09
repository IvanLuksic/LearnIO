import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { InputBase  } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    rootChips: {
      margin: "0 1rem 0 0",
      display: "inline-flex",
      boxShadow:"none !important",
      justifyContent: 'center',
      backgroundColor:"transparent",
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
    },
    buttonBlue: {
      color: "#FFFFFF",
      fontFamily: "Lobster !important",
      borderRadius:"10px",
      backgroundColor: "#4373ec",
      maxHeight: 35,
      '&:hover': {
          backgroundColor: "#0e318b",
    },},
    search: {
      display: "inline-flex",
      verticalAlign: "middle",
      margin:"16px",
      backgroundColor:"white",
      borderRadius:"10px"
    },
    searchBox:{
      margin:"0 0 2rem 0",
      display:"inline-block",
      backgroundColor:"#f7f5f577",/* ededed */
      border:"0.5px solid darkgrey",
      borderRadius:"10px"
    },
    formControl: {
      margin: `${theme.spacing(1)}px 2rem ${theme.spacing(1)}px 1rem`,
      minWidth: 120,
    }
}))

const ChipsArray=(props)=> {
    const classes = useStyles();
    return (
      <Paper component="ul" className={classes.rootChips}>
        {
        props.filters.map((filter) => {
          return (
            <li key={filter}>
              <Chip style={{margin:"0 0.1em"}} label={`${filter.propertyName}: ${filter.propertyValue}`} onDelete={()=>{props.deleteFilter(filter)}}/>
            </li>
          );
        })}
      </Paper>
    );
};


const Filter=(props)=>{

//OVO TREBA IMATI KOMPONENTA NA KOJU SE DODAJE OVA - savedData je za nefiltrirane podatke
// const [savedData,setSavedData]=useState(()=>fakeBackendTopics);
const [searched,setSearched]=useState("");
const [selectedProperty, setSelectedProperty]=useState(null);
const [activeFilters, setActiveFilters]=useState(()=>[]);
const classes=useStyles();

const filterData=(filters,dataToFilter,event)=>{/*filters,dataToFilter,event */
    if(event!==undefined) event.preventDefault();
    let filtered=[];
    filtered=dataToFilter.filter((piece)=>{
      let outcome=true;
      for(let filter of filters){
        if((typeof piece[filter.propertyName])==="number")
        {
          if(piece[filter.propertyName]==filter.propertyValue){outcome=outcome&&true;}
          else {outcome=outcome&&false; console.log("NIJE " + piece[filter.propertyName] +" "+filter.propertyValue)};
        }
        else 
        {
          if(piece[filter.propertyName].toUpperCase().includes(filter.propertyValue.toUpperCase())){outcome=outcome&&true}
          else {outcome=outcome&&false};
        };
      };
      return outcome;
    });
    document.getElementById("unosUSearch").value="";
    document.getElementById("selektiranjeFilterPropertyja").value=null;
    return filtered;
  };

  const deleteFilter=(filterToDelete)=>{
    let array=activeFilters.filter((active)=>{
      let bool=true;
      if(active.propertyName===filterToDelete.propertyName&&active.propertyValue===filterToDelete.propertyValue) bool=false;
      return bool;
    });
    setActiveFilters(array);
    props.setData(filterData(array,props.savedData,undefined));
  };

  const addFilter=(e)=>{
    let array=activeFilters;
    let unique=true;
    for(let filter of array){
      if(filter.propertyName===selectedProperty && filter.propertyValue===searched) unique=false;
    }
    if((searched!==null)&&(searched!=="")&&(selectedProperty!=null)&&(unique)){
      array.push({propertyName:selectedProperty, propertyValue:searched});
      setActiveFilters(array);
      props.setData(filterData(activeFilters,props.savedData,e));
    }
    else e.preventDefault();
  };

  return(
    <Grid item xs={12}>
        <div className={classes.searchBox}>
            <div className={classes.search}>
                <SearchIcon style={{alignSelf:"center",margin:" 0 5px"}} />
                <form onSubmit={(e)=>addFilter(e)}>
                    <InputBase id="unosUSearch" placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={(e)=>{console.log(e.target.value); setSearched(e.target.value);}}/>
                    <Button variant="contained" color="primary" type="submit" calssName={classes.buttonBlue} >Search</Button>               
                </form>
            </div>
            <div style={{display:"inline-flex"}}> 
                <FormControl className={classes.formControl}>
                    <InputLabel >Filter By</InputLabel>
                    <Select id="selektiranjeFilterPropertyja" value={selectedProperty} onChange={(event)=>{setSelectedProperty(event.target.value)}}>
                        {
                            props.listOfProperties.map((property)=>{
                                return(
                                    <MenuItem value={property.name}>{property.nameToDisplay}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>
            <ChipsArray filters={activeFilters} deleteFilter={deleteFilter} />
        </div>   
    </Grid>
  );
};

export default Filter;