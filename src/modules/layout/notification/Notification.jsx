import React from 'react'

const Notification = ({isOpenNotification}) => {
  return (
    <div className={`notification__container ${!isOpenNotification && "hidden"}`}>
        <div className="notification__title">
            <h5>Thông báo</h5>
        </div>
        <div className="notification__block">
            <div className="notification_item">
                <p className="notification__name">12345.S.12345</p>
                <div className="notification__i">
                    <p className="notification__note">Sale 123 đã đánh dấu hoàn thành công việc </p>
                    <label className="notification__alert"></label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification