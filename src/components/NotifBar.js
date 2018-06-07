import React from 'react';
import bellIcon from '../images/bell.png';

function NotifBar() {
    return (
        <div className="offset-lg-2 col-xs-6 col-lg-2 col-sm-1 offset-sm-0">
            <img alt="notif" className="bell" src={bellIcon} width="27" />
        </div>
    );
}

export default NotifBar;