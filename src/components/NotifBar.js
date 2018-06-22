import React from 'react';

function NotifBar(obj) {
    return (
        <div className={` ${obj.notifCname} `}> 
            Notifications
        </div>
    );
}

export default NotifBar;