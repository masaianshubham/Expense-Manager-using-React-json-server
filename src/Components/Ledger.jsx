import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchTransaction} from '../Redux/Expense/action'
import styles from "./Ledger.module.css"
import Radio from '@material-ui/core/Radio';

export const Ledger = () => {
    const [filterVal, setFilterVal] = useState("all")
const dispatch = useDispatch()
const data = useSelector(state => state.expense.transactionData)

useEffect(() => {
    dispatch(fetchTransaction())
    
}, [])

console.log(data)
console.log(filterVal)

    return (
        <div>
            <Link to="/dashboard"><i class="fas fa-wallet" style={{fontSize:"30px", position:"absolute",top:"20px", right:"40px"}}></i></Link>
            <h2>Ledger</h2>
            <hr />
            <div>
                <label >
                    <Radio
                        checked={filterVal==="all"?true:false}
                        onChange={(e)=>setFilterVal(e.target.value)}
                        value="all"
                    />
                    All
                </label>
                <label >
                    <Radio
                        checked={filterVal==="credit"?true:false}
                        onChange={(e)=>setFilterVal(e.target.value)}
                        value="credit"
                    />
                    Credit
                </label>
                <label >
                    <Radio
                        checked={filterVal==="debit"?true:false}
                        onChange={(e)=>setFilterVal(e.target.value)}
                        value="debit"
                    />
                    Debit
                </label>
            </div>
            {data && <div style={{display:"grid", gridTemplateColumns:"25% 25% 25% 25%"}}>
                <h3>Title</h3>
                <h3>Type</h3>
                <h3>Amount</h3>
                <h3>Date</h3>
                </div>}
            {data && data.reverse().filter(item=>filterVal=="all" ?  item: item.type == filterVal).map(item=> <div className={styles.ledger}>
                <h3>{item.title}</h3>
                <h3>{item.type}</h3>
                <h3 style={{color: item.type=="credit"? "green": "red"}}>{item.type=="credit"? "+": "-"}{item.amount}</h3>
                <div>
                    <p>{item.timestamp.split(",")[0]}</p>
                    <p style={{marginTop:-15, color:"gray",fontSize:13}}>{item.timestamp.split(",")[1]}</p>
                    </div>
            </div>)}
        </div>
    )
}
