import React from 'react';
import bellIcon from '../images/bell.png';

function NotifBar() {
    return (
        <a href="javascript:;">
            <img className="bell" src={bellIcon} width="27" />
        </a>
    );
}

export default NotifBar;