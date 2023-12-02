// import { useEffect, useState } from "react";
// import styles from './InputUsers.module.css'
// import Spacer from '@components/Spacer';
// import UserSelect from "@components/xmas/UserSelect";
// import { getGroupObject, updateGroupObject } from '@components/data_management/curr_group_data';
// import XMAS_PostGroupObject from '../mutation_apis/XMAS_PostGroupObject';
// import { useAuth0 } from "@auth0/auth0-react";

// let curr_group = getGroupObject()

// export default function InputUsers({ prompt, groupData, setGroupData }) {

//     // const [height, updateHeight] = useState(0)
//     // const [width, updateWidth] = useState(0)
//     // const [limiter, setLimiter] = useState(0)
//     // const [groupData, setGroupData] = useState('')
//     const [nameHold, setNameHold] = useState([''])
//     const [nameFloat, setNameFloat] = useState([false])
//     const [submitReady, setSubmitReady] = useState(false)
//     const [dumb, setDumb] = useState(false)
//     const [stylesState, setStyles] = useState([])
//     const [progress, setProgress] = useState(0)
//     const [descFloat, setDescFloat] = useState(false)
//     const [desc, setDesc] = useState('')
//     const { user, getAccessTokenSilently } = useAuth0();


//     useEffect(() => {
//         if (desc != '') {
//             setDescFloat(true)
//         } else {
//             setDescFloat(false)
//         }
//     }, [desc, setDesc])

//     const inputEval = (e, i) => {
//         let tempArray = nameFloat
//         let tempStyles = styles
//         let isReady = 0
//         let temp = nameHold
//         let temp2 = nameFloat
//         temp[i] = (e.target.value)

//         if (temp[i] != '' && temp[i] != null) {
//             temp2[i] = true
//         } else {
//             temp2[i] = false
//         }

//         for (let i = 0; i < curr_group.num_users; i++) {
//             ////console.log(nameHold[i])

//             if (nameHold[i] == '' || nameHold[i] == null) {        //
//                 tempStyles[i] = styles.label
//                 isReady = 2

//             } else {
//                 tempStyles[i] = styles.label_float
//                 if (isReady == 0 || isReady == 1) {
//                     isReady = 1
//                 }
//             }
//         }
//         if (isReady == 2) {
//             setSubmitReady(false)
//         } else {
//             setSubmitReady(true)
//         }

//         setDumb(!dumb)
//         setNameHold(temp)
//         setNameFloat(temp2)
//         setStyles(tempStyles)
//         ////console.log("this is submit ready")
//         ////console.log(submitReady)
//     }


//     const redirect = (loc) => {
//         // setTimeout(() => {
//         window.location.href = loc;
//         // setCode(loc)
//         // }, 100);
//     }

//     const backClick = () => {
//         setProgress(progress - 1)
//     }

//     const firstClick = () => {
//         curr_group.group_members = nameHold
//         setProgress(1)
//         setSubmitReady(false)
//     }

//     const secClick = async () => {
//         ////console.log("post group details")
//         ////console.log(curr_group.group_name)
//         ////console.log(nameHold)
//         ////console.log(desc)

//         ////console.log("STATE OF THE LOCAL GROUP OBJECT")
//         ////console.log(curr_group)
//         ////console.log(groupData)
//         const token = await getAccessTokenSilently();


//         let promise = XMAS_PostGroupObject(curr_group.group_name, nameHold, desc, token)

//         promise.then((data) => {
//             ////console.log("this is the data returned from the call ")
//             ////console.log(data)
//             localStorage.setItem('group_id', data.id)
//             curr_group.group_members = nameHold
//             curr_group.description = desc
//             ////console.log("ABOUT TO UPDATE THE GROUP LOCAL OBJECT")
//             ////console.log(curr_group)
//             updateGroupObject(curr_group)
//             setGroupData(curr_group)
//             redirect('/home')
//         }
//         )
//     }

//     useEffect(() => {
//         if (progress == -1) redirect('/begin')
//     }, [progress, setProgress])

//     return (
//         <div>
//             <button className={styles.change_data_button} onClick={backClick}><img className={styles.change_data_button_image} src='/IMGassets/arrow.png' /></button>
//             <br></br>
//             {progress == 0 ? (
//                 <>
//                     {prompt}
//                     < div >
//                         {
//                             Array.from({ length: curr_group.num_users }, (_, i) => (
//                                 <div key={i} className={styles.slowDown}>
//                                     <br></br>
//                                     <p> <label className={stylesState[i] ? stylesState[i] : styles.label}>{"user " + (i + 1)} </label></p>
//                                     <input
//                                         className={styles.input}
//                                         type="string"
//                                         // placeholder={"user " + (i + 1)}
//                                         onChange={(e) => {
//                                             inputEval(e, i)
//                                         }
//                                         } />
//                                 </div>

//                             ))
//                         }
//                         < button className={styles.go_button} onClick={firstClick} style={{ backgroundColor: submitReady ? "rgb(100, 207, 50)" : "", transition: submitReady ? "1.5s" : ".5s", }} >Let's go!</button>
//                     </div >
//                 </>

//             ) :
//                 progress == 1 ? (
//                     // <div></div>
//                     <UserSelect setProgress={setProgress} progress={progress} />
//                 ) : (
//                     <>
//                         <div className={styles.title_text}>What's the purpose for your gift exchange?</div>
//                         <div className={styles.sub_text}>e.g. Jennifer's secret santa!</div>
//                         <div className={styles.slowDown}>
//                             <br></br>
//                             <p> <label className={descFloat ? styles.label_float : styles.label} >Group Description </label></p>
//                             <input
//                                 className={styles.input}
//                                 type="string"
//                                 // placeholder={"user " + (i + 1)}
//                                 onChange={(e) => {
//                                     setDesc(e.target.value)
//                                     if (e.target.value.length > 0) {
//                                         setSubmitReady(true)
//                                     } else setSubmitReady(false)
//                                     // ////console.log(curr_group)
//                                 }
//                                 } />
//                         </div>
//                         <Spacer height="5vh"/>
//                         <div className={styles.sub_text} style={{ fontStyle: "italic" }}>This will be displayed on your homepage</div>

//                         < button
//                             className={styles.go_button}
//                             onClick={secClick}
//                             style={{ backgroundColor: submitReady ? "rgb(100, 207, 50)" : "", transition: submitReady ? "1.5s" : ".5s", }}
//                         >Let's go!</button>

//                     </>
//                 )

//             }
//         </div>
//     )
// }
