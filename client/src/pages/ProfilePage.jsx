import React from 'react';
import { useAuth } from '../context/authContext';

const ProfilePage = () => {
  const { auth } = useAuth();
  const user = auth?.user;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card student-dash-cards">
            <div className="card-body">
              <div className='text-center'>
              <h2 className="card-title display-6 lead "><i class="bi bi-person-circle"></i>&nbsp;Your Profile</h2>
              </div>
              {user ? (
                <div>
                  <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input type="text" className="form-control" value={user.username} disabled />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="text" className="form-control" value={user.email} disabled />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone:</label>
                    <input type="text" className="form-control" value={user.phone} disabled />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">UPI ID:</label>
                    <input type="text" className="form-control" value={user.upiId} disabled />
                  </div>
                </div>
              ) : (
                <p>No user information available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
