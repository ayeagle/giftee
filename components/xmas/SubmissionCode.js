// import React, { Component, useState, useEffect } from 'react'
// import styles from '@components/xmas/Login.module.css'
// import XMAS_CheckUser from '../mutation_apis/XMAS_CheckUser';
// import { getGroupObject, updateGroupObject } from '../data_management/curr_group_data';
// import XMAS_GetGroupObject from '../mutation_apis/XMAS_GetGroupObject';
// import InputUsers from '@components/xmas/InputUsers'
// import UserSelect from './UserSelect';
// import Link from 'next/link'
// import { useAuth0 } from "@auth0/auth0-react";


// let curr_group = getGroupObject()

// export default function SubmissionCode({ prompt, isNew, setCode, move, focus }) {
//     const [userCheckVal, setUserCheckVal] = useState('')
//     // const [userPasswordCheckVal, setUserPasswordCheckVal] = useState('')
//     const [validName, setValidName] = useState('')
//     const [addPrompt, setAddPrompt] = useState('')
//     const [addSecPrompt, setAddSecPrompt] = useState('')
//     const [greenSwitch, setGreenSwitch] = useState(false)
//     // const [greenSecSwitch, setSecGreenSwitch] = useState(false)
//     // const [viewPassword, setViewPassword] = useState('password')
//     const [createNew, setCreateNew] = useState(false)
//     const [numUsers, setNumUsers] = useState(0)
//     const [groupData, setGroupData] = useState(curr_group)

//     const [userFloat, setUserFloat] = useState(false)
//     const [numFloat, setNumFloat] = useState(false)
//     const { user, getAccessTokenSilently } = useAuth0();


//     const redirect = (loc) => {
//         setTimeout(() => {
//             // window.location.href = loc;
//             setCode(loc)
//         }, 1000);

//     }


//     const getGroupDataFromServer = async () => {
//         const token = await getAccessTokenSilently();

//         let promise = XMAS_GetGroupObject(localStorage.getItem('group_name'), localStorage.getItem('group_id'), token)
//         promise.then((data) => {
//             ////console.log( "from the server to update group object")
//             ////console.log(data)
//             updateGroupObject(data)
//             setValidName(!data)
//             setAddPrompt("Successful Login")
//         }
//         )
//     }


//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             ////console.log('Enter key pressed');
//             validate()
//         }
//     }


//     useEffect(() => {
//         if (userCheckVal != '') {
//             setUserFloat(true)
//         } else {
//             setUserFloat(false)
//         }

//         if (numUsers != '') {
//             setNumFloat(true)
//         } else {
//             setNumFloat(false)
//         }

//     }, [userCheckVal, numUsers])

//     useEffect( () => {
//         setAddPrompt("")
//         setAddSecPrompt("")
//     },[focus])


//     const validate = async () => {
//         // return <Link href="/">resume</Link>
//         const token = await getAccessTokenSilently();

//         let promise = XMAS_CheckUser(userCheckVal, 1, token)


//         promise.then((data) => {

//             if (isNew) {
//                 if (numUsers <= 2 || numUsers > 40) {
//                     setAddSecPrompt("That's not a valid number of users!")
//                     return
//                 } else {
//                     setAddSecPrompt("")
//                 }

//                 if (!data) {
//                     setAddSecPrompt("That group name's available!")
//                     setGreenSwitch(true)
//                     move(true)
//                     curr_group.group_name = userCheckVal
//                     curr_group.num_users = numUsers
//                     localStorage.setItem('group_name', userCheckVal);
//                     redirect(<InputUsers prompt={"What are your member's names?"} numUsers={curr_group.num_users} groupData={groupData} setGroupData={setGroupData} />
//                     )
//                 } else {
//                     setAddSecPrompt("Hmm looks like that group name is taken...")
//                     setGreenSwitch(false)
//                     setCreateNew(true)
//                 }
//             } else {
//                 if (data) {
//                     setAddPrompt("Successful Login")
//                     setGreenSwitch(true)
//                     setCreateNew(false)
//                     localStorage.setItem('group_name', data.name);
//                     localStorage.setItem('group_id', data.id);
//                     getGroupDataFromServer()
//                     redirect(<UserSelect />)
//                 } else {
//                     setAddPrompt("Hmm I don't think that group exists...")
//                     setGreenSwitch(false)
//                     setCreateNew(true)
//                 }
//             }
//         })
//     }

//     return (
//         <>
//             <div className={styles.form}>
//                 {prompt}
//                 <div className={styles.sub_text} style={{ display: focus === 'login' ? "none" : "" }}>You can always edit these details later</div>
//                 <div className={styles.inline_wrapper}>
//                     <br />
//                     <p> <label className={userFloat ? styles.label_float : styles.label}>GROUP NAME </label></p>

//                     <input
//                         className={styles.input}
//                         type="string"
//                         // placeholder="group name"
//                         onChange={(e) => {
//                             setUserCheckVal(e.target.value)
//                         }}
//                         onKeyDown={event => {
//                             if (event.key === 'Enter') {
//                                 validate()
//                             }
//                         }} />
//                     <br></br>
//                     <br></br>

//                     <div className={styles.warning} style={{ color: greenSwitch ? "green" : "red" }}>{addPrompt}</div>

//                 </div>
//                 <div className={styles.inline_wrapper} style={{ display: focus === 'login' ? "none" : "" }}>
//                     <br />
//                     <p> <label className={numFloat ? styles.label_float : styles.label}>NUM USERS </label></p>
//                     <input
//                         className={styles.input}
//                         type="number"
//                         // placeholder="# of users"
//                         onChange={(e) => {
//                             setNumUsers(e.target.value)
//                         }}
//                         onKeyDown={event => {
//                             if (event.key === 'Enter') {
//                                 validate()
//                             }
//                         }} />
//                 </div>
//                 <br></br>
//                 <div className={styles.warning} style={{ color: greenSwitch ? "green" : "red" }}>{addSecPrompt}</div>
//                 <br></br>
//                 <button className={styles.go_button} onClick={validate} style={{ backgroundColor: userFloat && (numFloat || focus == 'login') ? "rgb(100, 207, 50)" : "", transition: userFloat && (numFloat || focus == 'login') ? "1.5s" : ".5s", }}>Let's go!</button>
//             </div>

//         </>
//     )
// }