import React, { Component, useState, useEffect } from 'react'
import styles from '@components/xmas/UserSelect.module.css'
import { getGroupObject } from '../data_management/CurrGroupData';
import Loading from "@components/xmas/Loading";
import { useAuth0 } from "@auth0/auth0-react";

let curr_group = getGroupObject()

export default function UserSelect({progress, setProgress }) {
    // const [userCheckVal, setUserCheckVal] = useState('')
    // const [userPasswordCheckVal, setUserPasswordCheckVal] = useState('')
    // const [validName, setValidName] = useState('')
    // const [addPrompt, setAddPrompt] = useState('')
    // const [addSecPrompt, setAddSecPrompt] = useState('')
    // const [greenSwitch, setGreenSwitch] = useState(false)
    // const [greenSecSwitch, setSecGreenSwitch] = useState(false)
    // const [viewPassword, setViewPassword] = useState('password')
    // const [createNew, setCreateNew] = useState(false)
    // const [userGenResult, setUserGenResult] = useState('')
    // const [data, setData] = useState('')
    const [runOnce, setRunOnce] = useState(0)
    const { user, getAccessTokenSilently } = useAuth0();

    if (runOnce === 0) {
        // validate()
        setRunOnce(2)
        // //////console.log('fetching object')
        // // curr_group = getGroupObject();
        // //////console.log('retrieved object')
        // //////console.log(curr_group)
    }


    const userChoose = (name) => {
        //////console.log(name)
        localStorage.setItem('current_user', name);
        localStorage.setItem('group_id', curr_group.group_id);

        //////console.log("at the time of choosing a user, the progress was " + progress)
        if(progress <= 1){
            setProgress(progress + 1)
        } else {
        redirect('/explore')
        }
    }


    const redirect = (loc) => {
        window.location.href = loc;
    }


    return (
        <>
            <div className={styles.title_wrapper}>
                And who might you be?
            </div>
            {curr_group.name != '' ? (<div>
                {curr_group.group_members.map((name, index) => {
                    //////console.log("----------------> this is the index: " + index)
                    //////console.log("----------------> this is the name: " + name)

                    return (
                        <div className={styles.name_option} onClick={() => userChoose(name)}>
                            <div key={index}>
                                <div key={index}>{name}</div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            ) : (
                <Loading/>)}
        </>
    )
}

