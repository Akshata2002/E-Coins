import React, {useState} from 'react';
import { transferEcoins } from '../helpers/TransactiionFn';
import { getLocalStorageWithExpiry } from '../helpers/auth/authFn';
import { toast } from 'react-toastify';
import { useUpdate } from '../context/hasUpdated';
import Loader from './Loader';

const TransferCoinsForm = () => {
    const token = getLocalStorageWithExpiry('auth')?.token;
    const {loading, setLoading, selectedUser,setActiveForm} = useUpdate();
  

    const [formData, setFormData] = useState({

        receiverId: selectedUser._id,
        amount: 0,
        message: ""
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.amount <= 0){
            toast.warn("Amount should be greater than 0");
            return;
        }
        if(formData.message.length < 5){
            toast.warn("Message should be greater than 5 characters");
            return;
        }
        setLoading(true);
        const res = await transferEcoins(formData, token).finally(() => setLoading(false));
        if (res.status === 200) {
            toast.success(res.data.message);
            setFormData({
                ...formData,
                amount: 0,
                message: ""
            })
            setActiveForm(3);

        } else {
            toast.error(res.msg);
        }
    }

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-6'>
          <div className='card'>
            <div className='card-body'>
              <h3 className='card-title text-center lead mb-4'>Transfer Coins</h3>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='upiId' className='form-label'>
                    UPI ID
                  </label>
                  <input
                    type='text'
                    name='upiId'
                    id='upiId'
                    value={selectedUser?.upiId}
                    disabled
                    className='form-control'
                    placeholder='Enter UPI ID'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='amount' className='form-label'>
                    Amount
                  </label>
                  <input
                    type='number'
                    name='amount'
                    id='amount'
                    value={formData.amount}
                    disabled={loading}
                    onChange={handleChange}
                    className='form-control'
                    placeholder='Enter Amount'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='amount' className='form-label'>
                    Message
                  </label>
                  <textarea
                    type='text'
                    name='message'
                    disabled={loading}
                    id='message'
                    value={formData.message}
                    onChange={handleChange}
                    className='form-control'
                    placeholder='Enter Message'
                  />
                </div>
                <button disabled={loading} type='submit' className='btn btn-primary'>
                  {loading?"Transferring...":"Transfer"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferCoinsForm;
