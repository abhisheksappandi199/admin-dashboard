import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import jsondata from './customer-data'
import ListTable from './ListTable'
import Grid from "@material-ui/core/Grid";
import Sitedetails from './Sitedetails'
import Charts from './Charts'

            function TabPanel(props) {
            const { children, value, index, ...other } = props;

            return (
                <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                >
                {value === index && (
                    <Box p={4}>
                    <Typography>{children}</Typography>
                    </Box>
                )}
                </div>
            );
            }

            TabPanel.propTypes = {
            children: PropTypes.node,
            index: PropTypes.any.isRequired,
            value: PropTypes.any.isRequired,
            };

            function a11yProps(index) {
            return {
                id: `simple-tab-${index}`,
                'aria-controls': `simple-tabpanel-${index}`,
            };
            }

            const useStyles = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
                backgroundColor: theme.palette.background.paper,
            },
            }));

let total_orders_amount = 0
let obj = {}
for(let i = 0; i < jsondata.length ; i++){
    if(!obj.hasOwnProperty(jsondata[i].Name)){
        obj[jsondata[i].Name] = jsondata[i].Phone
    }
    total_orders_amount += jsondata[i].Amount
}
let output = Object.entries(obj)


let bar_graph =[]
bar_graph.push(['Months', 'No. of Orders','Total Amount in Hundred [ Ex : 3 =>(3 * 100)=> Rs.300/- ]']) //jsondata[i].Date.slice(5,7) == 4
let april_order =0, may_order =0,june_order=0 , april_amount=0 ,may_amount=0 ,june_amount =0
for(let i = 0; i < jsondata.length ; i++){
    if(jsondata[i].Date.slice(5,7) == 4){
        april_order += 1
        april_amount += jsondata[i].Amount

    } else if(jsondata[i].Date.slice(5,7) == 5){

    may_order += 1
    may_amount += jsondata[i].Amount
    }
    else if(jsondata[i].Date.slice(5,7) == 6){
    june_order += 1
    june_amount += jsondata[i].Amount
    }
}
april_amount = Math.round(april_amount/100)
may_amount = Math.round(may_amount/100)
bar_graph.push(['April',april_order,april_amount] , ['May',may_order,may_amount],['June',june_order,june_amount])


const cust_count_list={}
for(let i=0;i<jsondata.length;i++)
{
    if(cust_count_list.hasOwnProperty(jsondata[i].Name))
    {
        cust_count_list[jsondata[i].Name] += 1
    }
    else
    {
        cust_count_list[jsondata[i].Name]=1
    }
}
let one =0  ,two =0,three =0,four =0, abovefive = 0 , ordered_1time = []
for(let x in cust_count_list){
    switch(Number(cust_count_list[x])){
        case 1 : { one++ 
                    ordered_1time.push(x)
                    break; }
        case 2 : { two++
                    break; }
        case 3 : { three++
                    break ;}
        case 4 : { four++
                    break; }
        default : { abovefive++
                    break; }
    }
}

let array = []
array.push(one,two,three,four,abovefive)
let total_customers = 0
array.forEach(e => total_customers += e)  


let no_of_order_array = []
let count = 1
for (let index = 0; index < 5; index++) {
    no_of_order_array.push([(count == 5) ? (count+++'+') : (count++) ,array[index]])
}


export default function Navbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [listtabledata, setlisttabledata] = React.useState(output)
  const [no_of_order, setno_of_order_array] = React.useState(no_of_order_array)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="List" {...a11yProps(0)} />
          <Tab label="Distribution" {...a11yProps(1)} />
          <Tab label="Details" {...a11yProps(2)} />
          <Tab label="Graph" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
                <Grid item xs={12} sm={6}>
                    <h3>Customer Deatils : </h3>
                    <ListTable 
                            data={listtabledata} 
                            first='Name' 
                            second='Phone' 
                            third='Action'
                        />
                </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
                <Grid item xs={12} sm={4}>
                    <h3>Customer Distribution : </h3>
                    <ListTable 
                            data={no_of_order} 
                            first='No. of orders' 
                            second='Count of customers'
                        />
                    </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
                    <h3>Site Details : </h3>
                    
                        <Sitedetails 
                        total_customers={total_customers} 
                        total_orders={jsondata.length} 
                        ordered_1time={ordered_1time} 
                        total_orders_amount={total_orders_amount} 
                        no_of_order={no_of_order}
                    />
                    
                     
      </TabPanel>
      <TabPanel value={value} index={3}>
                        <h3>Graph :</h3>
                        <Charts 
                            bar_graph={bar_graph}
                            no_of_order={no_of_order} 
                            total_customers={total_customers} 
                            total_orders={jsondata.length} 
                            total_orders_amount={total_orders_amount}
                        />     
      </TabPanel>
    </div>
  );
}
