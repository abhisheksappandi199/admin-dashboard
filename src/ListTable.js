import React from 'react'
import data from './customer-data'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleTable(props) {
  const [open, setOpen] = React.useState(false);
  const [modaldata, setmodaldata] = React.useState({selected_name:[]})
  const [search, setsearch] = React.useState('')

  const classes = useStyles();

  const rows = props.data 

  const handleOpen = (row) => {
    setOpen(true)
    let total = 0
    let selected_name = data.filter(e => e.Name === row[0])
    let totalarray = selected_name.map(e => {
      total += e.Amount
    })
    //console.log(jsondata);
    // console.log('selected_name',selected_name);
    // console.log('amountarray',amountarray);
    // console.log(total , order_count);
    let obj = {
      name : row[0] ,
      phone : row[1] ,
      order_count : selected_name.length ,
      selected_name ,
      total
    }
    setmodaldata(obj)
    //console.log(obj);
  };

  const handleClose = () => {
    setOpen(false);
  }
  const handleChange = (e) => {
    setsearch(e.target.value)
  }
  return (
    <>
        { props.third && (
            <div align='center'>
            <label>Search :</label>{" "}
            <input
             type="text" 
             value={search} 
             onChange={handleChange}  
             placeholder="enter customer name" 
             /><br/><br/>
             </div>
        )}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Name : {modaldata.name}</h2>
              <p id="transition-modal-description">Order Count : {modaldata.order_count}</p>
              <p id="transition-modal-description">Amount of each Order: {modaldata.selected_name.map(e => {
                return (<li>date : {e.Date} amount : Rs.{e.Amount}/-</li>)
              })}</p>
              <p id="transition-modal-description">Total Order Amount : Rs.{modaldata.total}/-</p>
            </div>
          </Fade>
        </Modal>

    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{props.first}</TableCell>
            <TableCell align="right">{props.second}</TableCell>
            { props.third  && (<TableCell align="right">{props.third}</TableCell>) }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.filter(ele => ele[0].toString().toLowerCase().includes(search.toLowerCase())).map((row) => (
            <TableRow key={row.first}>
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell align="right">{row[1]}</TableCell>
              { props.third && 
              (
                  <TableCell align="right">
                    <Button variant="contained" color="primary" type="button" size="small" onClick={()=>{handleOpen(row)}}>show</Button>
                  </TableCell>
              ) 
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
