import React from 'react'
import { useSelector } from 'react-redux';
import { UserRules } from '../constants';

const DotStatus = () => {
	const user = useSelector((state) => state.auth.user);

  return (
    <>
        {user?.data?.status === UserRules.STATUS.ONLINE && (
            <span className='dots_online'></span>
        )}
        {user?.data?.status === UserRules.STATUS.LEAVE && (
            <span className='dots_busy'></span>
        )}
        {user?.data?.status === UserRules.STATUS.OFFLINE && (
            <span className='dots_offline'></span>
        )}
    </>
  )
}

export default DotStatus