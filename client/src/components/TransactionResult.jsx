import React from 'react'
import { Link } from 'react-router-dom'
import { useUpdate } from '../context/hasUpdated'
const TransactionResult = () => {
    const {setActiveForm} = useUpdate();
  return (
    <div className='card student-dash-cards my-5'>
        <div className='card-body text-center'>
            <h3 className='card-title display-5 text-success my-5'>Transaction Successful</h3>
            <Link to='/student/dashboard'><button onClick={() => setActiveForm(1)} className='btn btn-primary'>Go to Dashboard</button></Link>
            </div>

    </div>
  )
}

export default TransactionResult