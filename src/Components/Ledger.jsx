import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchTransaction} from '../Redux/Expense/action'
import styles from "./Ledger.module.css"
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
    root: {
    display: "flex",
    justifyContent:"center",
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export const Ledger = () => {
    const classes = useStyles();
    const [filterVal, setFilterVal] = useState("all")
    const dispatch = useDispatch()
    const data = useSelector(state => state.expense.transactionData)
    const userId = useSelector(state => state.auth.user_data[0].id)
    const [currentPage, setCurrentPage] = useState(1)

useEffect(() => {
    dispatch(fetchTransaction())
    
}, [])
console.log(currentPage)
const handleChange = (event,value) => {
    setCurrentPage(value);
  };

const perPage = 20
let offset = (currentPage-1)*perPage

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
                        color="primary"
                        checked={filterVal==="all"?true:false}
                        onChange={(e)=>setFilterVal(e.target.value)}
                        value="all"
                    />
                    All
                </label>
                <label >
                    <Radio
                        color="primary"
                        checked={filterVal==="credit"?true:false}
                        onChange={(e)=>setFilterVal(e.target.value)}
                        value="credit"
                    />
                    Credit
                </label>
                <label >
                    <Radio
                        color="primary"
                        checked={filterVal==="debit"?true:false}
                        onChange={(e)=>setFilterVal(e.target.value)}
                        value="debit"
                    />
                    Debit
                </label>
            </div>
            {data && <div style={{display:"grid", gridTemplateColumns:"25% 25% 25% 25%", background:"#212121", color:"white", fontSize:"18px"}}>
                <h3>Title</h3>
                <h3>Type</h3>
                <h3>Amount</h3>
                <h3>Date</h3>
                </div>}
            {data && data.reverse().filter(item=>item.user_id==userId).filter((item,index)=>index>=offset && index<offset+perPage).filter(item=>filterVal=="all" ?  item: item.type == filterVal).map(item=> <div className={styles.ledger}>
                <h3>{item.title}</h3>
                <h3>{item.type}</h3>
                <h3 style={{color: item.type=="credit"? "green": "red"}}>{item.type=="credit"? "+": "-"}{item.amount}</h3>
                <div>
                    <p>{item.timestamp.split(",")[0]}</p>
                    <p style={{marginTop:-15, color:"gray",fontSize:13}}>{item.timestamp.split(",")[1]}</p>
                    </div>
            </div>)}
            <div className={classes.root}>
                <Pagination count={data && Math.ceil(data.filter(item=>item.user_id==userId).length/20)} onChange={handleChange} variant="outlined" shape="rounded" />
            </div>
        </div>
    )
}
