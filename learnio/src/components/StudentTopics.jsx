import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { DataGrid, RowsProp, ColDef  } from '@material-ui/data-grid';
import backgroundIMG from '../images/learniobg10-15.png'
import { Hidden, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';



const useStyles = makeStyles((theme) => ({

    background:{
      backgroundImage:"url("+backgroundIMG+")",
      backgroundSize: "cover",
      backgroundPosition: "fixed",
      backgroundAttachment: "fixed",
      backgroundRepeat: "repeat-y",
      width: "100%",
      [theme.breakpoints.down('sm')]: {
        minHeight: "100vh",
      },
      [theme.breakpoints.up('md')]: {
        minHeight: "100vh",
      },
    },

    tabela:{
      paddingBottom:"10vh",
      height:"380px",
      [theme.breakpoints.down('sm')]: {
        width:"90%",
      },
      [theme.breakpoints.up('md')]: {
        width:"40%",
      },
    },
    topicTitle:{
      fontFamily:'Lobster',
      fontSize:'6vh',
      [theme.breakpoints.down('sm')]: {
        paddingTop:"10vh",
      },
      [theme.breakpoints.up('md')]: {
        paddingTop:"1vh",
      }
    }

  }));

function CustomPagination(props) {
    const { paginationProps } = props;
    const classes = useStyles();
  
    return (
      <Pagination
        className={classes.root}
        color="primary"
        page={paginationProps.page}
        count={paginationProps.pageCount}
        onChange={(event, value) => paginationProps.setPage(value)}
      />
    );
}


function StudentTopics(){
    const classes = useStyles();
    const columns = [
      { field: 'topic', width: 150, type:'string', renderHeader: () => (<strong>{"Topic"}</strong>),},
      { field: 'id', headerName:'ID'},
      { field: 'ao1', hide: true},
      { field: 'ao1P', headerName:'AO 1',
        valueGetter: (params) => `${params.getValue('ao1')}%`,
        sortComparator: (v1, v2, row1, row2) => row1.data.ao1 - row2.data.ao1,},
      { field: 'ao2', hide: true},
      { field: 'ao2P', headerName:'AO 2',
      valueGetter: (params) => `${params.getValue('ao2')}%`,
      sortComparator: (v1, v2, row1, row2) => row1.data.ao2 - row2.data.ao2,},
      { field: 'ao3', hide: true},
      { field: 'ao3P', headerName:'AO 3',
      valueGetter: (params) => `${params.getValue('ao3')}%`,
      sortComparator: (v1, v2, row1, row2) => row1.data.ao3 - row2.data.ao3,},
    ];
    const rows=[
      { id: 1, topic:'Trigonometry 1', ao1:'70',ao2:'55', ao3:'66'},
      { id: 2, topic:'Geometry 3', ao1:'100', ao2:'95', ao3:'76'},
      { id: 3, topic:'Basic Calculus 2', ao1:'90', ao2:'65', ao3:'69'},
      { id: 4, topic:'Trigonometry 2', ao1:'50',ao2:'30', ao3:'40'},
      { id: 5, topic:'Geometry 1', ao1:'80', ao2:'95', ao3:'46'},
      { id: 6, topic:'Basic Calculus 1', ao1:'80', ao2:'65', ao3:'59'},
      { id: 7, topic:'Trigonometry 3', ao1:'60',ao2:'100', ao3:'36'},
      { id: 8, topic:'Geometry 2', ao1:'90', ao2:'99', ao3:'86'},
      { id: 9, topic:'Basic Calculus 3', ao1:'50', ao2:'85', ao3:'79'},
    ];

    return(  
    <div style={{display: "flex", flexDirection: "column",justifyContent:"space-evenly", alignItems:"center"}} className={classes.background} >
        <span className={classes.topicTitle}>Topics</span>
        <div className={classes.tabela}>
          <DataGrid  pagination pageSize={5} components={{pagination: CustomPagination,}} rows={rows} columns={columns} />
        </div>
    </div>
    );
};

export default StudentTopics;