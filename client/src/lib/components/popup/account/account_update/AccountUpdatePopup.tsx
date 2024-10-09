import React from 'react';
import classes from './AccountUpdatePopup.module.scss';


interface AccountUpdatePopup {
    message: string;
}

const AccountUpdatePopup: React.FC<AccountUpdatePopup> = ({message}) => {

    return (
        <div className={classes.account_update_popup}>

            <div className={classes.popup_block}>
                {(message === 'Error updating email' || message === 'You already have this email' || message === 'Request failed with status code 404' || message === 'Request failed with status code 500')
                    ? <span className={classes.error_title}>{message}</span>
                    : <span className={classes.popup_title}>{message}</span>
                }
            </div>
        </div>
    );
};

export default AccountUpdatePopup;
