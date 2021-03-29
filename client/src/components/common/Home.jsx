import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import logo from '../../images/compLogo.png';
import postgres from '../../images/postgres.png';
import react from '../../images/react.png';
import express from '../../images/express.png';
import node from '../../images/node.png';
import Grid from '@material-ui/core/Grid';
import backgroundIMG from '../../images/learniobg10-15.png'
import Carousel from 'react-material-ui-carousel';


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
        overflowY: "show",

      },
      [theme.breakpoints.up('md')]: {
        minHeight: "200vh",
      },
    },

    image:{
        maxWidth: "100%",
        height: "auto",
        borderRadius:"10px"
    },

    cont1:{
      [theme.breakpoints.down('sm')]: {
        padding:"6em 0 8em 0",
        flexDirection:'column',
      },
      [theme.breakpoints.up('md')]: {
        padding:"35vh 0 30vh 0",
        flexDirection:'row'
      },
    },

    cont2:{
      [theme.breakpoints.down('sm')]: {
        padding:"2em 0 25em 0",
        flexDirection:'column-reverse',
        display:"none",
      },
      [theme.breakpoints.up('md')]: {
        padding:"35vh 0 30vh 0",
        flexDirection:'row'
      },
    },

    block1:{
      [theme.breakpoints.down('sm')]: {
        padding:" 0 1em 0 1em",
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft:"5vw",
        paddingRight:"5vw"      
      },
    },
    block2:{
      [theme.breakpoints.down('sm')]: {
        padding:"3em 3em 0em 3em",
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft:"5vw",
        paddingRight:"5vw"      
      },
    },
    block3:{
      [theme.breakpoints.down('sm')]: {
        padding:"0em 4em 0em 4em",
      },
      [theme.breakpoints.up('md')]: {
        padding:"0  3em 0 8em",
      },
    },
    block4:{
      [theme.breakpoints.down('sm')]: {
        padding:"15em 2em 4em 2em",
      },
      [theme.breakpoints.up('md')]: {
        padding:"3.3em 7em 0 10em ",
      },
    },
    
    txtP:{
      color: "#737B7D",//textalign justify
      lineHeight: "1.2em",
      [theme.breakpoints.down('sm')]: {
        textAlign:'justify',
        fontSize: "1.3em",
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "1.5em",
      },
    },
    txtS:{
      display:'block',
      color: "#373F41",
      fontFamily: "Lobster",
      [theme.breakpoints.down('sm')]: {
        display:'none'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: "2.3em",
        marginBottom:"0.2em"
      },
    },
    carousel:{
      [theme.breakpoints.down('sm')]: {
        width:"80%",
        margin:" 1em auto"
      },
      [theme.breakpoints.up('md')]: {
        padding:" 0 0 0 2em",
        width:"75%",
      },
    }
  }));


function Home(){


    let items=[react,postgres,express,node];
    const classes = useStyles();
    return(
    <div className={classes.background}>
      <Grid container justify="center" alignItems="center" className={classes.cont1} >
        <Grid item xs={12} md={6} className={classes.block1} >
            <img src={logo} alt='slika' className={classes.image}/>
        </Grid>
        <Grid item xs={12} md={6} className={classes.block2} >
            <span className={classes.txtS}>Welcome to LearnIO </span>
            <p className={classes.txtP} >LearnIO is a new way of going about learning. It helps students and teachers alike by allowing students to learn only what they need to learn. How does it work? Find out!</p> 
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center" className={classes.cont2} >
      <Grid item xs={12} md={6} className={classes.block3} >
          <span className={classes.txtS}>Coming soon.... </span>
          <p className={classes.txtP}>Learnio is a semi-intelligent online learning service being developed using technologies such as ReactJS, NodeJS, expressJS and PostgresSQL. It will be ready soon, and you are the first ones seeeing it!</p> 
        </Grid>
        <Grid item xs={12} md={6} className={classes.block4}>
          <Carousel navButtonsAlwaysInvisible={true} animation={"slide"} autoPlay={true} interval={2500} timeout={400} className={classes.carousel}>
              {
                  items.map( (item, i) => <img key={i} src={item} alt='slika' className={classes.image}/> )
              }
          </Carousel>
        </Grid>
      </Grid>
    </div>
    );
};

export default Home;


// import React from 'react';
// import { makeStyles} from '@material-ui/core/styles';
// import logo from '../../images/compLogo.png';
// import postgres from '../../images/postgres.png';
// import react from '../../images/react.png';
// import express from '../../images/express.png';
// import node from '../../images/node.png';
// import Grid from '@material-ui/core/Grid';
// import backgroundIMG from '../../images/learniobg10-15.png'
// import Carousel from 'react-material-ui-carousel';
// import Box from '@material-ui/core/Box';


// const useStyles = makeStyles((theme) => ({
//     image:{
//         maxWidth: "100%",
//         height: "auto",
//     },

//     mobFlex1:{
//       spacing:8,
//       justifyContent: "space-evenly",
//       flexDirection: "row",
//       alignItems:"center",
//       bgcolor:"transparent",
    
//       [theme.breakpoints.down('sm')]: {
//         paddingLeft:"2vw",
//         paddingRight:"2vw",
//         paddingTop:"18vh",
//         paddingBottom:"0vh"
//       },
//       [theme.breakpoints.up('sm')]: {
//         paddingLeft:"5vw",
//         paddingRight:"3vw",
//         paddingTop:"35vh",
//         paddingBottom:"30vh"
//       },
//     },

//     mobFlex2:{
//       spacing:8,
//       justifyContent: "space-evenly",
//       flexDirection: "row",
//       alignItems:"center",
//       bgcolor:"transparent",
    
//       [theme.breakpoints.down('sm')]: {
//         paddingLeft:"5vw",
//         paddingRight:"5vw",
//         paddingTop:"10vh",
//         paddingBottom:"0vh"
//       },
//       [theme.breakpoints.up('sm')]: {
//         paddingLeft:"5vw",
//         paddingRight:"3vw",
//         paddingTop:"35vh",
//         paddingBottom:"30vh"
//       },
//     },

//     background:{
//       backgroundImage:"url("+backgroundIMG+")",
//       backgroundSize: "cover",
//       backgroundPosition: "fixed",
//       backgroundAttachment: "fixed",
//       backgroundRepeat: "repeat-y",
//       width: "100%",
//       [theme.breakpoints.down('sm')]: {
//         minHeight: "100vh",
//       },
//       [theme.breakpoints.up('md')]: {
//         minHeight: "200vh",
//       },
//     },

//     block:{
//       width: "50%",
//       backgroundColor: "transparent",
//       marginLeft:"5vw",
//       marginRight:"5vw"
//     },

//     txtP:{
//       color: "#737B7D",//textalign justify
//       lineHeight: "1.2em",
//       [theme.breakpoints.down('sm')]: {
//         fontSize: "3.5vw",
//       },
//       [theme.breakpoints.up('md')]: {
//         fontSize: "2vw",
//       },
//     },

//     txtS:{
//       color: "#373F41",
//       fontFamily: "Lobster",
//       [theme.breakpoints.down('sm')]: {
//         fontSize: "4.5vw",
//       },
//       [theme.breakpoints.up('md')]: {
//         fontSize: "3.2vw",
//       },
//     }
//   }));


// function Home(){
//       let items=[react,postgres,express,node];

//     const classes = useStyles();
//     return(
//     <div className={classes.background}>
//       <Box display="flex" className={classes.mobFlex1} >
//         <Box flexGrow={1} flemdhrink={1} className={classes.block} >
//             <img src={logo} alt='slika' className={classes.image}/>
//         </Box>
//         <Box flexGrow={1} flemdhrink={1} className={classes.block} >
//             <Box mb={"1.5vh"}> <span className={classes.txtS}>Welcome to LearnIO </span></Box>
//             <p className={classes.txtP} >LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn. LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn.</p> 
//         </Box>
//       </Box>
//       <Box display="flex" className={classes.mobFlex2}>
//       <Box flexGrow={1} flemdhrink={1} className={classes.block} >
//         <Box mb={"1.5vh"}> <span className={classes.txtS}>Welcome to LearnIO </span></Box>
//             <p className={classes.txtP}>LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn. LearnIO is a half-intelligent WebApp that will help you learn only things you need to learn.</p> 
//         </Box>
//           <Box  width="50%" flexGrow={1} flemdhrink={1} display="flex" justifyContent="center" bgcolor="transparent" >
//             <Carousel navButtonsAlwaysInvisible={true}	 animation={"slide"} autoPlay={true} interval={2500} timeout={400}>
//             {
//                   items.map( (item, i) => <img key={i} src={item} alt='slika' className={classes.image}/> )
//             }
//             </Carousel>        
//           </Box>
//       </Box>
//     </div>
//     );
// };

// export default Home;

