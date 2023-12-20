import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { getCurrentUserCoins, getLocalStorageWithExpiry } from '../helpers/auth/authFn';
import { useUpdate } from '../context/hasUpdated';
import { getCoinsGainedAndLost, topUsers } from '../helpers/TransactiionFn';

const StudentDashboard = () => {
    const { auth } = useAuth();
    const token = getLocalStorageWithExpiry('auth')?.token;
    const {loading,setLoading} = useUpdate()
    const [rank, setRank] = useState(0); 
    const [coins, setCoins] = useState(0);
    const [userCoinsLores, setUserCoinsLores] = useState([{
        gained: 0,
        lost: 0
    }]);

    useEffect(() => {
        const updateCoins = async () => {
            setLoading(true);
            const res = await getCurrentUserCoins(token).finally(() => setLoading(false));
            if (res.status === 200) {
                setCoins(res.coins);
            }
        }
        const getRank = async () => {
            setLoading(true);
            const res = await topUsers(token).finally(() => setLoading(false));
            if (res.status === 200) {
                setRank(res.data.currentUserPosition.position)
            }
        }
        const useFetcher = async () => {
            setLoading(true);
            const res = await getCoinsGainedAndLost(token).finally(() => setLoading(false));
            if (res.status === 200) {
                setUserCoinsLores({
                    gained: res.data.received_coins,
                    lost: res.data.sent_coins
                })
       }
        }
        updateCoins();
        getRank();
        useFetcher();
    },[]);

    return (
        <div className="container my-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col d-flex justify-content-center align-items-center text-center">
                    <h1 className='lead display-4'>Hello {auth?.user?.username}👋 </h1>
                </div>
                <div className="row my-5 d-flex justify-content-center align-items-center">
                  
                        <div  className="col-lg-3 mb-4 mx-4">
                            <div className="card student-dash-cards">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Current balance: </h3>
                                    <h2 className="card-text display-3 text-center">
                                        {!loading?(<b><i className="bi bi-coin" style={{color: "gold"}}/>&nbsp;{coins < 10 ? `0${coins}` : coins}</b>):(<span className='display-6'>Calculating...</span>)}
                                       
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div  className="col-lg-3 mb-4 mx-4">
                            <div className="card student-dash-cards">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Current Rank: </h3>
                                    <h2 className="card-text display-3 text-center">
                                        {!loading?(<b><i className="bi bi-trophy" style={{color: "gold"}}></i>&nbsp;{rank}</b>):(<span className='display-6'>Calculating...</span>)}
                                       
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div  className="col-lg-3 mb-4 mx-4">
                            <div className="card student-dash-cards">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Coins Gained: </h3>
                                    <h2 className="card-text display-3 text-center">
                                        {!loading?(<b className='text-success'><i className="bi bi-arrow-up" style={{color: "green"}}></i>&nbsp;{userCoinsLores.gained}</b>):(<span className='display-6'>Calculating...</span>)}
                                       
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div  className="col-lg-3 mb-4 mx-4">
                            <div className="card student-dash-cards">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Coins Spent: </h3>
                                    <h2 className="card-text display-3 text-center">
                                        {!loading?(<b className='text-danger'><i className="bi bi-arrow-down" style={{color: "red"}}></i>&nbsp;{userCoinsLores.lost}</b>):(<span className='display-6'>Calculating...</span>)}
                                       
                                    </h2>
                                </div>
                            </div>
                        </div>
                   
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
