// import React, { Component, useState, useEffect } from 'react'
// import styles from '@components/xmas/Profile.module.css'
// import { getGroupObject } from '../data_management/CurrGroupData';
// import XMAS_GetGroupObject from '../mutation_apis/XMAS_GetGroupObject';
// import XMAS_PostGroupChange from '@components/mutation_apis/XMAS_PostGroupChange';
// import Spacer from '@components/Spacer';
// // import React from 'react';
// import { useUser } from '@auth0/nextjs-auth0/client';

// let curr_group = getGroupObject()


// export default function AddGift({ }) {
//     // const [userCheckVal, setUserCheckVal] = useState('')
//     // const [userPasswordCheckVal, setUserPasswordCheckVal] = useState('')
//     // const [validName, setValidName] = useState('')
//     // const [addPrompt, setAddPrompt] = useState('')
//     // const [addSecPrompt, setAddSecPrompt] = useState('')
//     const [greenSwitch, setGreenSwitch] = useState(true)
//     const [bool, setBool] = useState(true)
//     // const [greenSecSwitch, setSecGreenSwitch] = useState(true)
//     // const [viewPassword, setViewPassword] = useState('password')
//     // const [createNew, setCreateNew] = useState(false)
//     // const [numUsers, setNumUsers] = useState(0)
//     // const [groupData, setGroupData] = useState(curr_group)
//     const [giftAdded, setGiftAdded] = useState(false)
//     const [currUser, setCurrUser] = useState('')
//     const [currGroup, setCurrGroup] = useState('')
//     const [currDesc, setCurrDesc] = useState('')
//     const [currMemb, setCurrMemb] = useState([])



//     const [nameE, setNameE] = useState(false)
//     const [gnameE, setGnameE] = useState(false)
//     const [descE, setDescE] = useState(false)
//     const [modeE, setModeE] = useState(false)
//     const [membE, setMembE] = useState(false)

//     const [tempName, setTempName] = useState('')
//     const [tempGName, setTempGName] = useState('')
//     const [tempDesc, setTempDesc] = useState('')
//     const [tempMode, setTempMode] = useState('')
//     const [tempMemb, setTempMemb] = useState('')


//     useEffect(() => {
//         setGiftAdded(false)
//         setGreenSwitch(true)
//     }, [giftAdded, setGiftAdded, setGreenSwitch, greenSwitch])


//     useEffect(() => {
//         curr_group = getGroupObject()
//         setCurrUser(localStorage.getItem('current_user'))
//         setCurrGroup(curr_group.group_name)
//         setCurrDesc(curr_group.description)
//         setCurrMemb(curr_group.group_members)
//     }, [])

//     const editInfo = (val, variable, updateValue, current) => {
//         ////console.log(updateValue)
//         ////console.log("HEYO THIS IS THE CURR GROUP")
//         ////console.log(curr_group)


//         if (variable) {
//             setGiftAdded(true)
//         }

//         switch (val) {
//             case "nameE":
//                 setNameE(!nameE)
//                 if (updateValue != current && updateValue != '') {
//                     let tempUpdateVal = currMemb
//                     tempUpdateVal[findIndex(current)] = updateValue

//                     setCurrUser(updateValue)
//                     dispatchComplexChange(val, variable, tempUpdateVal)
//                 }


//                 /// need to go and update all instances of gifts matching this name and group ID across
//                 /// recipient and giver fields
//                 break
//             case "gnameE":
//                 setGnameE(!gnameE)
//                 if (updateValue != current && updateValue != '') {
//                     setCurrGroup(updateValue)
//                     dispatchDBChange(variable, updateValue)
//                 }
//                 break
//             case "descE":
//                 setDescE(!descE)
//                 if (updateValue != current && updateValue != '') {
//                     setCurrDesc(updateValue)
//                     dispatchDBChange(variable, updateValue)
//                 }
//                 break
//             case "membE":
//                 setMembE(!membE)
//                 if (updateValue != current && updateValue != '') {
//                     ////console.log("IDK WHAT THE FUCK IS NEEDED HERE")
//                     setCurrMemb(updateValue)
//                     dispatchDBChange(variable, tempUpdateVal)
//                 }
//                 break
//         }
//         ////console.log(this)
//         setBool(!bool)

//     }

//     const dispatchDBChange = (variable, updateValue) => {
//         setGiftAdded(true)

//         let group_id = localStorage.getItem('group_id')

//         let promise = XMAS_PostGroupChange(variable, updateValue, group_id)

//         promise.then((data) => {
//             ////console.log("data returned from the page load API call")
//             ////console.log(data)
//             // curr_group = data
//             // updateGroupObject(data)
//             // setGroupData(data)
//         }
//         )
//     }



//     const dispatchComplexChange = (variable, updateValue) => {
//         setGiftAdded(true)

//         let group_id = localStorage.getItem('group_id')

//         let promise = XMAS_PostGroupChange(variable, updateValue, group_id)

//         promise.then((data) => {
//             ////console.log("data returned from the page load API call")
//             ////console.log(data)
//             // curr_group = data
//             // updateGroupObject(data)
//             // setGroupData(data)
//         }
//         )
//     }




//     // export default function Profile() {
//     const { user, error, isLoading } = useUser();

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>{error.message}</div>;

//     // return (
//     //     user && (
//     //         <div style={{height: "30vw"}}>
//     //             <img src={user.picture} alt={user.name} />
//     //             <h2>{user.name}</h2>
//     //             <p>{user.email}</p>
//     //         </div>
//     //     )
//     // );





//     ////console.log(tempGName)

//     return (
//         <>
//             <div className={styles.add_gift_container}>
//                 <Spacer height="20vh"/>
//                 <div className={styles.login_container}>
//                     <div className={styles.title}>
//                         Settings
//                     </div>

//                     <br></br>

//                     <br></br>
//                     <img src={user.picture} alt={user.name} className={styles.profile_photo}/>

//                     <div className={styles.login_signup_wrapper}>
//                         <div className={styles.form}>
//                             {/* 
//                             <div className={styles.row_align}>
//                                 <div>
//                                     Logged in as:
//                                 </div>
//                                 {!nameE || bool ? (
//                                     <div>
//                                         {currUser} <button className={styles.change_data_button} onClick={() => editInfo("nameE")}><img className={styles.change_data_button_image} src='/IMGassets/edit.png' /></button>
//                                     </div>
//                                 ) : (
//                                     <div>

//                                         <input
//                                             className={styles.input}
//                                             placeholder={currUser}
//                                             onChange={(e) => {
//                                                 setTempName(e.target.value)
//                                             }}

//                                         /> <button
//                                             className={styles.change_data_button}
//                                             onClick={() =>
//                                                 editInfo("nameE", "participants", tempName, currUser)

//                                             }><img className={styles.change_data_button_image} src='/IMGassets/save.png' /></button>
//                                     </div>
//                                 )}
//                             </div> */}


//                             <div className={styles.row_align}>
//                                 <div>
//                                     Logged in as:
//                                 </div>
//                                 <div>
//                                     {user.name}
//                                 </div>
//                             </div>
//                             <div className={styles.row_align}>
//                                 <div>
//                                     Auth email:
//                                 </div>
//                                 <div>
//                                     {user.email}
//                                 </div>
//                             </div>
//                             <div className={styles.row_align}>
//                                 <div>
//                                     Group Name:
//                                 </div>
//                                 {!gnameE || bool ? (
//                                     <div>
//                                         {currGroup} <button className={styles.change_data_button} onClick={() => editInfo("gnameE")}><img className={styles.change_data_button_image} src='/IMGassets/edit.png' /></button>
//                                     </div>
//                                 ) : (
//                                     <div>

//                                         <input
//                                             className={styles.input}
//                                             placeholder={currGroup}
//                                             onChange={(e) => {
//                                                 setTempGName(e.target.value)
//                                             }}
//                                         /> <button
//                                             className={styles.change_data_button}
//                                             onClick={() =>
//                                                 editInfo("gnameE", "name", tempGName, curr_group.group_name)

//                                             }><img className={styles.change_data_button_image} src='/IMGassets/save.png' /></button>
//                                     </div>
//                                 )}

//                             </div>
//                             <div className={styles.row_align}>
//                                 <div>
//                                     Group Description:
//                                 </div>
//                                 {!descE || bool ? (

//                                     <div>
//                                         {currDesc} <button className={styles.change_data_button} onClick={() => editInfo("descE")}><img className={styles.change_data_button_image} src='/IMGassets/edit.png' /></button>
//                                     </div>
//                                 ) : (
//                                     <div>

//                                         <input
//                                             className={styles.input}
//                                             placeholder={currDesc}
//                                             onChange={(e) => {
//                                                 setTempDesc(e.target.value)
//                                             }}

//                                         /> <button
//                                             className={styles.change_data_button}
//                                             onClick={() =>
//                                                 editInfo("descE", "description", tempDesc, curr_group.description)
//                                             }
//                                         ><img className={styles.change_data_button_image} src='/IMGassets/save.png' /></button>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className={styles.row_align}>
//                                 <div>
//                                     Gift Mode:
//                                 </div>
//                                 <div>
//                                     WIP <button className={styles.change_data_button}><img className={styles.change_data_button_image} src='/IMGassets/edit.png' /></button>
//                                 </div>
//                             </div>
//                             <div className={styles.row_align}>
//                                 <div style={{ width: "40%", textAlign: "left" }}>
//                                     Current Members:
//                                 </div>
//                                 <div className={styles.name_container} >
//                                     {currMemb.map(function (names, index) {
//                                         return (
//                                             <div className={styles.name_option} key={index}>{names}</div>
//                                         )
//                                     })

//                                     }
//                                 </div> <button className={styles.change_data_button}><img className={styles.change_data_button_image} style={{ right: "0vw" }} src='/IMGassets/edit.png' /></button>

//                             </div>
//                             {giftAdded ? <div className={styles.gift_added}><div>Changes saved</div><img src="/IMGassets/good_check.png" style={{ width: "3vw", height: "3vw", marginLeft: "1vw", marginTop: "-.2vw" }} /></div> : <div className={styles.gift_added_after}><div>Changes saved</div><img src="/IMGassets/good_check.png" style={{ width: "3vw", height: "3vw", marginLeft: "1vw", marginTop: "-.2vw" }} s /></div>}

//                             <br></br>
//                             {/* {prompt} */}

//                         </div>

//                     </div>

//                 </div>
//                 <Spacer />
//             </div>
//         </>
//     )
// }


