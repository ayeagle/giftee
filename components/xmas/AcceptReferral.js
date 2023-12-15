
import * as icons from 'react-icons/fa';
import { useState, useEffect } from 'react';
import styles from './ReferralLink.module.css'

export default function AcceptReferral({ link }) {
   



    const copy = () => {
        //////console.log("we got clicked")
        navigator.clipboard.writeText(link)
        setChangeAllowed(false)
        setInternText("Copied to clipboard")
        setBoxStyle(styles.copied_box)
        setTimeout(() => {
            setChangeAllowed(true)
            setInternText(link)
        }, [2000])
    }


    return (
        <div >
            
        </div>
    )
}

