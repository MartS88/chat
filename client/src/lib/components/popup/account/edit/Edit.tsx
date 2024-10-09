import React, {ChangeEvent, forwardRef, useEffect, useState} from 'react';
import classes from './Edit.module.scss';
import {FaRegEdit} from "react-icons/fa";
import {useThrottle} from "@/utils/hooks/useThrottle";
import axios from "axios";

interface EditProps {
    editPopup: boolean;
    setEditPopup: (value: boolean) => void;
    type: string;
    setAccountUpdatePopup: (value: boolean) => void;
    setAccountUpdateMsg: (value: string) => void;
}

const Edit = forwardRef<HTMLDivElement, EditProps>(({
                                                        editPopup,
                                                        setEditPopup,
                                                        type,
                                                        setAccountUpdatePopup,
                                                        setAccountUpdateMsg,
                                                    }, ref) => {

    const [value, setValue] = useState<string>('');
    const [valueError, setValueError] = useState<string>('');
    const [valueDirty, setValueDirty] = useState<boolean>(false);
    const [activeForm, setActiveForm] = useState<boolean>(false);

    const closeHandler = () => {
        setEditPopup(false);
    };

    useEffect(() => {
        if (valueError.length > 0 || value.length === 0) {
            setActiveForm(false);
        } else {
            setActiveForm(true);
        }
    }, [valueError, value.length]);

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueDirty(true);
        const {name, value} = e.target;

        setValue(value);

        switch (name) {
            case 'email':
                const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!emailRegex.test(value.toLowerCase())) {
                    setValueError('Enter a valid email');
                } else {
                    setValueError('');
                }
                break;

            case 'password':
                if (value.trim().length <= 5) {
                    setValueError('Password must be longer than 5 characters');
                } else {
                    setValueError('');
                }
                break;

            default:
                setValueError('');
        }
    };

    const submitHandler = useThrottle(async (type: string) => {
        try {
            const email = localStorage.getItem('email')
            const body = {
                email,
                [type === 'email' ? 'newEmail' : 'newPassword']: value
            }
            console.log('body', body)
            if (type === 'email') {
                const response = await axios.patch(`http://localhost:5000/users/${email}/update-email`, body)
                localStorage.setItem('email', value)
                setAccountUpdateMsg(response.data.message)
                setEditPopup(false)
                setAccountUpdatePopup(true)

                return response
            } else if (type === 'password') {
                const response = await axios.patch(`http://localhost:5000/users/${email}/update-password`, body)

                setAccountUpdateMsg(response.data.message)
                setEditPopup(false)
                setAccountUpdatePopup(true)

                return response
            } else {
                return
            }

        } catch (error) {
            console.log('error', error)
            setAccountUpdateMsg(error.message)
            setEditPopup(false)
            setAccountUpdatePopup(true)
        } finally {
            setTimeout(() => {
                setAccountUpdatePopup(false)
            }, 3000)
        }

    }, 3000)

    return (
        <div className={classes.edit} ref={ref}>
            <FaRegEdit className={classes.svg}/>
            <h3 className={classes.edit_title}>Edit {type}</h3>

            <div className={classes.input_wrap}>
                <label>{type[0].toUpperCase() + type.substr(1)}</label>
                <input
                    type="text"
                    name={type === 'email' ? 'email' : 'password'}
                    autoComplete="off"
                    autoCorrect="off"
                    maxLength={30}
                    placeholder={type === 'email' ? 'user@gmail.com' : '*******'}
                    className={`${valueError && valueDirty ? classes.input_error : ''}`}
                    onChange={inputHandler}
                    onBlur={() => setValueDirty(true)}
                />

                <div className={`${classes.error} ${valueError && valueDirty ? classes.visible : ''}`}>
                    {valueError}
                </div>
            </div>
            <div className={classes.buttons_block}>
                <button onClick={closeHandler} className={classes.cancel}>Cancel</button>
                <button
                    onClick={() => submitHandler(type)}
                    className={!activeForm ? classes.disabled : classes.confirm}
                    disabled={!activeForm}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
});

export default Edit;
