import React, {useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {addTransaction, fetchTransaction} from '../Redux/Expense/action'

export const Dashboard = () => {

const [formData, setFormData] = useState({title:"",amount:"", type:""})
const dispatch = useDispatch()
const data = useSelector(state => state.expense.productData)

useEffect(() => {
    dispatch(fetchTransaction())
}, [])
// console.log(data)
    let userData=""
    let credit = ""
    let debit = ""
    let totalCredit=""
    let totalDebit= ""
    let balance =""
    if(data){
        userData = data.filter(item => item.user_id===1)
        credit = userData.filter(item=> item.type=="credit")
        debit = userData.filter(item=> item.type=="debit")
        totalCredit = credit.reduce((a,c)=> Number(a.amount)+Number(c.amount))
        totalDebit = debit.reduce((a,c)=> Number(a.amount)+Number(c.amount))
        balance = totalCredit - totalDebit
        // console.log(totalCredit,totalDebit)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTransaction(formData))
    }
    console.log(formData)
    return (
        <div>
            <h2>Dashboard</h2>
            {userData && <div style={{display:"grid", gridTemplateColumns:"auto auto auto"}}>
                    <h1>Income: ₹{totalCredit}</h1>
                    <h1>Expense: ₹{totalDebit}</h1>
                    <h1>Balance: ₹{balance}</h1>
                </div>}

            <div style={{display:"grid", gridTemplateColumns:"50% 50%"}}>
                <div>
                    <h5>Last Transaction details</h5>
                    {userData && userData.filter((a,i)=> i>=userData.length-5 && i<userData.length ).map(item=> <div style={{display:"grid", gridTemplateColumns:"auto auto auto"}}>
                        <h2>{item.title}</h2>
                        <h2>{item.type}</h2>
                        <h2>{item.amount}</h2>
                    </div>)} 
                </div>
                <div>
                    <h5>Latest Entries</h5>
                    <form onSubmit={handleSubmit}>
                        <div> Title: {" "}
                            <input type="text" name="title" onChange={handleChange}/>
                        </div>
                        <div> Type: {" "}
                            <input type="radio" onChange={handleChange} name="type" value="credit" checked={formData.type==="credit"? true:false}/> Credit
                            <input type="radio" onChange={handleChange} name="type" value="debit" checked={formData.type==="debit"? true:false}/> Debit
                        </div>
                        <div>
                            Amount: {" "}
                            <input type="number" name="amount" onChange={handleChange}/>
                        </div>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        </div>
    )
}
