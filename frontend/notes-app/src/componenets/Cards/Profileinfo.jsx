import React from 'react'
import { getInitials } from '../../utils/helper';



const Profileinfo = ({userInfo, onLogout}) => {
    return (
        <div className="flex justify-end items-center gap-3 absolute top-0 right-0 m-2">
                <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 relative" style={{ top: '0px' }}>
                    {getInitials(userInfo?.fullName)}
                </div>

                <div>
                        <p className="text-sm font-medium">{userInfo?.fullName}</p>
                        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
                                Logout
                        </button>
                </div>
        </div>
    );
}

export default Profileinfo
