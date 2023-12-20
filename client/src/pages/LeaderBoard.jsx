import React, { useEffect, useState } from 'react'
import { topUsers } from '../helpers/TransactiionFn';
import { getLocalStorageWithExpiry } from '../helpers/auth/authFn';
import { useUpdate } from '../context/hasUpdated';
import { useAuth } from '../context/authContext';
import Loader from '../components/Loader';

const LeaderBoard = () => {

    const [leaderBoard, setLeaderBoard] = useState([{}]);
    const token = getLocalStorageWithExpiry('auth').token;
    const {loading, setLoading} = useUpdate()
    const {auth} = useAuth();

    useEffect(() => {
        const callHelper = async () => {
            setLoading(true);
            const res = await topUsers(token).finally(() => setLoading(false));
            if (res.status === 200) {
                setLeaderBoard(res.data.users);
            }
        }
        callHelper();
    },[])
    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className="col d-flex justify-content-center align-items-center text-center">
                    <h1 className="display-4 lead"><i class="bi bi-trophy"></i>&nbsp;LeaderBoard &nbsp;<i class="bi bi-trophy"></i></h1>
                </div>
                <div className="row my-3">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Coins</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading?(
                                    leaderBoard.map((user, index) => (
                                        <tr className={`${user._id === auth?.user?._id ? 'table-success':''}`} key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.username}</td>
                                            <td>{user.eCoins}</td>
                                        </tr>
                                    ))
                                ):(<tr>
                                    <td colSpan="6" className="text-center">
                                      <Loader />
                                    </td>
                                  </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard