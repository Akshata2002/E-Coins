import React, { useEffect, useState } from 'react';
import { getLocalStorageWithExpiry } from '../helpers/auth/authFn';
import { getUserTransactions } from '../helpers/TransactiionFn';
import { useAuth } from '../context/authContext';
import { useUpdate } from '../context/hasUpdated';
import Loader from '../components/Loader';

const Transactions = () => {
  const [transactions, setTransactions] = useState([{}]);
  const token = getLocalStorageWithExpiry('auth').token;
  const { auth } = useAuth();
  const { loading, setLoading } = useUpdate();
  const [msg, setMsg] = useState({
    message: '',
    senderName: '',
    receiverName: ''
  });

  useEffect(() => {
    const callHelper = async () => {
      setLoading(true);
      const result = await getUserTransactions(auth?.user?._id, token).finally(() => setLoading(false));
      if (result.status === 200) {
        console.log(result.data.transactions);
        setTransactions(result.data.transactions);
      } else {
        console.log(result.msg);
      }
    };
    callHelper();
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col d-flex justify-content-center align-items-center text-center">
            <h1 className="display-4 lead">Transactions</h1>
          </div>
          <div className="row my-3">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Desc</th>
                    <th scope="col">Debit</th>
                    <th scope="col">Credit</th>
                    <th scope="col">Date</th>
                    <th scope="col">Balance</th>
                    <th scope="col">View</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading ? (transactions.length !== 0 ? (
                    transactions.map((transaction, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {transaction?.sender?.username === auth?.user?.username
                            ? <span>An amount of <strong>{transaction?.amount}</strong> <span className='text-danger'>transferred</span> to <strong>{transaction?.receiver?.upiId}</strong></span>
                            : <span>
                              An amount of <strong>{transaction?.amount}</strong> <span className='text-success'>received</span> from <strong>{transaction?.sender?.upiId}</strong>
                            </span>}
                        </td>
                        <td className={`${transaction?.sender?.username === auth?.user?.username && transaction?.amount !== 0 ?'table-danger':''}`}>
                          {transaction?.sender?.username === auth?.user?.username
                            ? transaction?.amount
                            : 0}
                        </td>
                        <td className={`${transaction?.sender?.username !== auth?.user?.username && transaction?.amount !== 0 ?'table-success':''}`}>
                          {transaction?.sender?.username === auth?.user?.username
                            ? 0
                            : transaction?.amount}
                        </td>

                        <td>{transaction?.createdAt}</td>
                        <td>{transaction.remainingBalance ? transaction.remainingBalance : 0}</td>
                        <td>
                          <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary" onClick={() => setMsg({ message: transaction?.message, senderName: transaction?.sender?.username, receiverName: transaction?.receiver?.username })}>View</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <h4 className="display-6 lead">
                          <i>No transactions yet!</i>
                        </h4>
                      </td>
                    </tr>
                  )) : (<tr>
                    <td colSpan="7" className="text-center">
                      <Loader />
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Transaction Message</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {msg.message}
              <br />
              <br />
              {msg.senderName === auth?.user?.username ? (
                <span className=''>You sent this message to <strong>{msg?.receiverName}</strong></span>
              ) : (
                <span className=''>From: <strong>{msg?.senderName}</strong></span>
              )
              }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Transactions;
