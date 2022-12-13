import { useCallback, useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { useNavigate, useLocation } from 'react-router-dom';
import { VoiceAttendance } from '../pages/TakeAttendance';


const COMMANDS = {
    HOME_PAGE: 'home-page',
    ATTENDANCE_PAGE: 'attendance-page',
    STAFF_REG_PAGE: 'staff-reg-page',
    STUDENT_REG_PAGE: 'student-reg-page',
    MARK_ATTENDANCE: 'mark-attendance'
}

export default function useAlan() {
    const [alanInstance, setAlanInstance] = useState()
    const navigate = useNavigate();
    const location = useLocation();
    const attPage = location.state?.from?.pathname || "/attendance";
    const staffRPage = location.state?.from?.pathname || "/staff-register";
    const studRPage = location.state?.from?.pathname || "/student-register";
    const hPage = location.state?.from?.pathname || "/";

    const homePage = useCallback(() => {
        alanInstance.playText("Going back to the Home page")
        navigate(hPage, { replace: true});
    }, [alanInstance])
    
    const attendancePage = useCallback(() => {
        alanInstance.playText("Going to attendance page")
        navigate(attPage, { replace: true});
    }, [alanInstance])

    const staffRegPage = useCallback(() => {
        alanInstance.playText("Going to staff registration page")
        navigate(staffRPage, { replace: true});
    }, [alanInstance])

    const studentRegPage = useCallback(() => {
        alanInstance.playText("Going to student registration page")
        navigate(studRPage, { replace: true});
    }, [alanInstance])
    
    const markAttendance = useCallback(({ detail: {matricNumber, attendanceStatus}}) => {
        alanInstance.playText(`Matriculation Number ${matricNumber} marked ${attendanceStatus}`);
        matricNumber = matricNumber.toUpperCase();
        attendanceStatus = attendanceStatus.toUpperCase();
        if (matricNumber.length == 1) {
            matricNumber = "000" + matricNumber
        } else if (matricNumber.length == 2) {
            matricNumber = "00" + matricNumber
        } else if (matricNumber == 3) {
            matricNumber ="0" + matricNumber
        }
        VoiceAttendance(matricNumber, attendanceStatus);
    }, [alanInstance])

    useEffect(() => {
        window.addEventListener(COMMANDS.ATTENDANCE_PAGE, attendancePage)
        window.addEventListener(COMMANDS.STAFF_REG_PAGE, staffRegPage)
        window.addEventListener(COMMANDS.STUDENT_REG_PAGE, studentRegPage)
        window.addEventListener(COMMANDS.MARK_ATTENDANCE, markAttendance)
        window.addEventListener(COMMANDS.HOME_PAGE, homePage)

        return () => {
            window.removeEventListener(COMMANDS.ATTENDANCE_PAGE, attendancePage)
            window.removeEventListener(COMMANDS.STAFF_REG_PAGE, staffRegPage)
            window.removeEventListener(COMMANDS.STUDENT_REG_PAGE, studentRegPage)
            window.removeEventListener(COMMANDS.MARK_ATTENDANCE, markAttendance)
            window.removeEventListener(COMMANDS.HOME_PAGE, homePage)
        }
    }, [homePage, attendancePage, staffRegPage, studentRegPage, markAttendance])

    useEffect(() => {
        if(alanInstance != null) return

        setAlanInstance(
            alanBtn({
                bottom: "15px",
                right: "15px",
                key: 'a7aa554157c0f60a76250a6e511a4c762e956eca572e1d8b807a3e2338fdd0dc/stage',
                onCommand: ({ command, payload }) => {
                    window.dispatchEvent(new CustomEvent(command, {detail: payload}))
                }
            })
        )
    }, []) 

  return null
}
