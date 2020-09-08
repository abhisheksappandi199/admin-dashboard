import React from 'react'

export default function Sitedetails(props) {
    return (
        <>
            <p>This Site has <b>{props.total_customers}</b> no. of Customers</p>
            <p>This Site has <b>{props.total_orders}</b> no. of Orders</p>
            <p>Total Orders Amount in this site : <b>Rs.{props.total_orders_amount}/-</b></p>
            <p>Customers ordered once and did not order again : <b>{props.ordered_1time.length}</b></p>
            <ul>
            {
                props.ordered_1time.map(e => {
                    return (<li>{e}</li>)
                })
            }
            </ul> 

            
        </>
    )
}
