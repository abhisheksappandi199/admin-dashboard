import React from 'react'
import { Chart } from "react-google-charts";
import html2canvas from 'html2canvas';
import 'jspdf-autotable'
import { jsPDF } from "jspdf";
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

export default function Charts(props) {
    const handleDowmload = () =>{
        const input = document.getElementById('page')

        html2canvas(input)
            .then((canvas) => {
                const imagedata = canvas.toDataURL('image/png')

                let doc = new jsPDF()
                doc.text('Generated Report',80,10)
                doc.addImage(imagedata, 'JPEG' ,12,140,0,0 )
                doc.autoTable({ html: '#my-table' })
                doc.autoTable({
                    head: [['No. of orders','Count of customers']],
                    body: props.no_of_order,
                })
                doc.text(`Total no. of Customers : ${props.total_customers} `,15,80)
                doc.text(`Total no. of Orders : ${props.total_orders}`,15,90)
                doc.text(`Total Orders Amount in this site : Rs.${props.total_orders_amount}/-`,15,100)
                doc.text(' ',15,110)
                doc.text('Bar Graph for the Information in Q2 in 2020 year',15,120)
                doc.text('Graph :',15,130)
                doc.save('table.pdf')
            })
    }
    return (
        <>
        <h3>Pdf Download :{" "} 
            <Button 
                    variant="contained"
                    color="primary" size="small"
                    startIcon={<SaveIcon />}
                    onClick={handleDowmload}
            > save 
            </Button>
        </h3>
        <div id='page'>   
            <Chart
                width={'700px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={props.bar_graph}
                options={{
                    title: 'Information of Q2 in 2020 year',
                    chartArea: { width: '60%' },
                    hAxis: {
                    title: 'Orders and Total Amount',
                    minValue: 0,
                    },
                    vAxis: {
                    title: 'Months',
                    },
                }}
                // For tests
                rootProps={{ 'data-testid': '1' }}
                />
                <small style={{color : 'red'}}>*I showed Q2 graph as Q4 data is not avaliable </small>
        </div>
        </>
    )
}
