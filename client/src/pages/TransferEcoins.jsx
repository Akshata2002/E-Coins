import React, { useEffect, useState } from 'react';
import TransferCoinsForm from '../components/TransferCoinsForm';
import UserSearch from '../components/UserSearch';
import { useUpdate } from '../context/hasUpdated';
import TransactionResult from '../components/TransactionResult';


const TransferEcoins = () => {

    const { activeForm,setActiveForm } = useUpdate();

    const handleClick = (number) => {
        if(number > activeForm) return;
        if(activeForm === 3) return;
        setActiveForm(number);
    }

  


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="row justify-content-center">
                    {[1, 2, 3].map((number,index) => (
                        <div key={number} className="col-auto text-center">
                            <div onClick={() => handleClick(number)} className={`circle mx-5 text-center ${activeForm >= number  ? 'bg-success' : ''}`}>
                                {number}&nbsp;
                            </div>
                            <span className="text-muted" >
                                {number === 1 ? 'Search User' : number === 2 ? 'Transfer Coins' : 'Success'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-lg-6'>
                    {activeForm === 1 && <UserSearch />}
                    {activeForm === 2 && <TransferCoinsForm />}
                    {activeForm === 3 && <TransactionResult/>}
                </div>
            </div>
        </div>
    );
};

export default TransferEcoins;
