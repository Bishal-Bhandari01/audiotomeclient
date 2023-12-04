import React from 'react'
import '../../userscreens/profile/Profile.css'
import SideNav from '../theme/SideNav'

export default function AdminChangePassword() {
  return (
    <>
      <SideNav />
      <div className="container my-5">
        <div className="card">
          <div className="card-body">
            <h4>Change Password</h4>
            <div className="form-group my-2 mt-3">
              <label className="form-label" for="form1Example1">
                Current Password
              </label>
              <input
                type="password"
                id="form1Example1"
                className="form-control form-control-lg userSettingFormControl"
                required
              />
            </div>
            <div className="form-group my-2">
              <label className="form-label" for="form1Example1">
                New Password
              </label>
              <input
                type="password"
                id="form1Example1"
                className="form-control form-control-lg userSettingFormControl"
                required
              />
            </div>
            <div className="form-group my-2">
              <label className="form-label" for="form1Example1">
                Confirm Password
              </label>
              <input
                type="password"
                id="form1Example1"
                className="form-control form-control-lg userSettingFormControl"
                required
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn- btn-lg userSettingSaveBtn">Save</button>
        </div>
      </div>
    </>
  )
}
