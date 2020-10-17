import React, {useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {addTransaction, fetchTransaction} from '../Redux/Expense/action'
import Button from '@material-ui/core/Button'
import { FormControl } from '@material-ui/core'
import Input from '@material-ui/core/Input';
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'
import {Doughnut} from 'react-chartjs-2'



export const Dashboard = () => {

const [formData, setFormData] = useState({title:"",amount:"", type:""})
const dispatch = useDispatch()
const data = useSelector(state => state.expense.transactionData)
const [chartData, setChartData] = useState({})
const userId = useSelector(state => state.auth.user_data[0].id)
console.log(userId)
    
useEffect(() => {
    dispatch(fetchTransaction())
    
}, [])
useEffect(() => {
    chart()
}, [data])
// console.log(data)
    let userData=""
    let credit = ""
    let debit = ""
    let totalCredit=0
    let balance =0
    let totalDebit = 0
    if(data){
        userData = data.filter(item => item.user_id===userId)
        credit = userData.filter(item=> item.type=="credit").map(item=>item.amount)
        debit = userData.filter(item=> item.type=="debit").map(item=>item.amount)
        for(let i=0;i<credit.length;i++){
            totalCredit+= Number(credit[i])
        }
        for(let i=0;i<debit.length;i++){
            totalDebit+= Number(debit[i])
        }
        balance = totalCredit - totalDebit

        
        
    }

    const chart =() =>{
        setChartData({
            labels: ["Credit", 'Debit','Balance'],
                    datasets: [{
                        // label: 'Attendance',
                        data: [totalCredit,totalDebit,balance],
                        backgroundColor: ["rgb(255,142,100)","rgb(157, 0, 0)","rgb(255,102,100)"]}
                    ]
                
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        // e.preventDefault()
        dispatch(addTransaction(formData))
        setFormData({title:"",amount:"", type:""})
    }
    console.log(formData)
    return (
        <div style={{marginBottom: 50}}>
            <Link to='/ledger'><i class="fas fa-book" style={{fontSize:"30px", position:"absolute",top:"20px", right:"70px"}}></i><p style={{fontSize:"15px", position:"absolute",top:"40px", right:"15px"}}>View all transaction</p></Link>
            <h2>Dashboard</h2>
            <div style={{fontSize:30}}>
                <h3>Balance: ₹{balance}</h3>
            </div>
            {userData && <div className={styles.dashboardCard}>
                    <div>
                        Income
                        <br />
                        ₹{totalCredit}
                    </div>
                    <div>
                        Expense
                        <br />
                        ₹{totalDebit}
                    </div>
                    <div>
                        {/* Balance
                        <br />
                        ₹{balance} */}
                        <Doughnut
                            data={chartData}
                            width={300}
                            height={200}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>
                </div>}

            <div style={{display:"grid", gridTemplateColumns:"50% 50%"}}>
                <div style={{margin:"10px 15%"}}>
                    <h5>Last Transaction details</h5>
                    {userData && userData.filter((a,i)=> i>=userData.length-5 && i<userData.length ).reverse().map(item=> <div style={{display:"grid", gridTemplateColumns:"50% 49% 1%",background:"#fafafa", margin:10}}>
                        <h2 style={{textAlign:"left",paddingLeft:10}}>{item.title}</h2>
                        {/* <h2>{item.type}</h2> */}
                        <h2 style={{textAlign:"right",paddingRight:10}}>{item.type=="credit"? "+":"-"}₹{item.amount}</h2>
                        <div style={{background: item.type=="credit"? "green":"red"}}></div>
                    </div>)} 
                </div>
                <div className={styles.newForm}> 
                    {/* <h5>New Entries</h5> */}
                    
                    <form>
                        <div>
                        <FormControl>

                            <input className={styles.inp} type="string" name="title" value={formData.title} onChange={handleChange} placeholder="Enter Title" minLength="3" required/>
                        </FormControl>
                        
                        </div>
                        <br />
                        <div> Type: {" "} 
                            <input type="radio" onChange={handleChange} name="type" value="credit" checked={formData.type==="credit"? true:false} required/> Credit
                            <input type="radio" onChange={handleChange} name="type" value="debit" checked={formData.type==="debit"? true:false} required/> Debit
                        </div>
                        <br />
                        <div>
                            
                            <Input type="number" value={formData.amount} name="amount" placeholder="Enter Amount" onChange={handleChange}/>
                        </div>
                        <br />
                        <Button  onClick={handleSubmit} variant="contained">Add Transaction</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
