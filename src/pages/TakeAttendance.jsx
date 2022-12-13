import Navigation from '../components/navigation';
import Sidebar from '../components/sidebar';
import { FcList } from "react-icons/fc";
import { useState } from "react";
import axios from '../api/axios';
import moment from 'moment';

const STUDENTS_URL = '/student/find';
const LECTURER_COURSES_URL = '/course/lecturerLevelCourses';
const ATTENDANCE_URL = 'attendance/take'

var matric, attend;

function TakeAttendance() {
    const [students, setStudents] = useState('');
    const [courses, setCourses] = useState('');
    let [session, setSession ] = useState('');
    let [level, setLevel] = useState('');
    let [courseCode, setCourseCode] = useState('');
    let [attendanceStatus, setAttendanceStatus] = useState('');
    let [matricNumber, setMatricNumber] = useState('');
    
    const getLecturerCourses = async () => {
        try {
            const response = await axios.post(LECTURER_COURSES_URL, 
                JSON.stringify({
                    level
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setCourses(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const findStudents = async () => {
        try {
            const response = await axios.post(STUDENTS_URL, 
                JSON.stringify({ 
                    session, level
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setStudents(response.data);
        } catch (err) {
            if (!err?.response) {
                console.error(err);
            } else {
                console.error(err)
            }
        }
    }

    const getCourseCode = async () => {
        setCourseCode(courseCode)
    }

    const getLevel = async () => {
        setLevel(level)
    }

    const getSession = async () => {
        setSession(session)
    }

    const getMatricNumber = async () => {
        setMatricNumber(matricNumber)
    }

    const getAttendanceStatus = async () => {
        setAttendanceStatus(attendanceStatus)
    }

    const takeAttendance = async () => {
        if(matric) setMatricNumber(matric);
        if(attend) setAttendanceStatus(attend);
        try {
            await axios.post(ATTENDANCE_URL, 
                JSON.stringify({ 
                    session, matricNumber, courseCode, attendanceStatus,
                    dayMarked: new Date()
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
        } catch (err) {
            if (!err?.response) {
                console.error(err);
            } else {
                console.error(err)
            }
        }
    }

    return (
        <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
            <Navigation />
            <div className="app-main">
                <Sidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <div className="app-page-title">
                            <div className="page-title-wrapper">
                                <div className="page-title-heading">
                                    <div className="page-title-icon">
                                        <i className="icon-gradient bg-mean-fruit"><FcList /></i>
                                    </div>
                                    <div>Attendance</div>
                                </div>    
                            </div>
                        </div>            
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <h5 className="card-title">Select Course</h5>
                                        <form>
                                            <div className="form-row">
                                                <div className="input-group col-md-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Session</span>
                                                    </div>
                                                    <select
                                                        id="session" className="form-control" name="session" required
                                                        onChange={
                                                            (e) => {
                                                                session = (e.target.value); 
                                                                getSession();
                                                                sessionStorage.setItem('session', e.target.value);
                                                            }
                                                        } 
                                                    >
                                                        <option value="">-----</option>
                                                        <option value="2019/2020">2019/2020</option>
                                                        <option value="2020/2021">2020/2021</option>
                                                        <option value="2021/2022">2021/2022</option>
                                                        <option value="2022/2023">2022/2023</option>
                                                        <option value="2023/2024">2023/2024</option>
                                                        <option value="2024/2025">2024/2025</option>
                                                        <option value="2025/2026">2025/2026</option>
                                                        <option value="2026/2027">2026/2027</option>
                                                        <option value="2027/2028">2027/2028</option>
                                                    </select>
                                                </div>
                                                <div className="input-group col-md-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Select Level</span>
                                                    </div>
                                                    <select
                                                        id="level" className="form-control" name="level" required
                                                        onChange={
                                                            (e) => {
                                                                level = (e.target.value); 
                                                                getLevel(); 
                                                                getLecturerCourses();
                                                                findStudents();
                                                                sessionStorage.setItem('level', e.target.value)
                                                            }
                                                        } 
                                                    >
                                                        <option value="">-----</option>
                                                        <option value="ND1">ND1</option>
                                                        <option value="ND2">ND2</option>
                                                        <option value="HND1">HND1</option>
                                                        <option value="HND2">HND2</option>
                                                    </select>
                                                </div>
                                                <div className="input-group col-md-5">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Courses</span>
                                                    </div>
                                                    <select
                                                        id="course" className="form-control" name="course"
                                                        onChange={(e) => {courseCode = (e.target.value); getCourseCode()}} required
                                                    >
                                                        <option value="">-----</option>
                                                    {(Object.keys(courses).map((k, i) => {
                                                        return(
                                                        <option key={i} value={courses[k].courseCode}>{courses[k].courseCode}: {courses[k].courseTitle}</option>
                                                        )
                                                    }))}
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>          
                            <div className="col-lg-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body"><h5 className="card-title">Attendance for {courseCode}, {session} Session at {moment().format("DD-MM-YYYY")}</h5>
                                        <table className="mb-0 table table-dark">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Full Name</th>
                                                <th>Matric Number</th>
                                                <th>Attendance</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {(Object.keys(students).map((k, i) => {
                                                return(
                                                    <tr key={i}>
                                                        <th scope="row">{parseInt(k) + 1}</th>
                                                        <td>{students[k].firstName} {students[k].lastName}</td>
                                                        <td>{students[k].matricNumber}</td>
                                                        <td>
                                                            <div role="group">
                                                                <label className="btn btn-primary">
                                                                <input 
                                                                    type="radio" name={"attendanceStatus"+k} 
                                                                    id={students[k].matricNumber+'present'} value='PRESENT' 
                                                                    onChange={
                                                                        (e) => {
                                                                            attendanceStatus = e.target.value;
                                                                            getAttendanceStatus(); 
                                                                            matricNumber = students[k].matricNumber;
                                                                            getMatricNumber(); 
                                                                            takeAttendance();
                                                                        }
                                                                    }
                                                                />
                                                                    Present
                                                                </label>
                                                                <label className="btn btn-primary">
                                                                    <input 
                                                                        type="radio" name={"attendanceStatus"+k} 
                                                                        id={students[k].matricNumber+'absent'} value='ABSENT' 
                                                                        onChange={
                                                                            (e) => {
                                                                                attendanceStatus = e.target.value;
                                                                                getAttendanceStatus(); 
                                                                                matricNumber = students[k].matricNumber;
                                                                                getMatricNumber(); 
                                                                                takeAttendance()
                                                                            }
                                                                        }
                                                                    />
                                                                    Absent
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    )
                                                }))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function VoiceAttendance(matNumber, attStatus) {
    console.log("voice attendance called");
    console.log(attStatus);
    let level = sessionStorage.getItem('level');
    let session = sessionStorage.getItem('session');
    attend = attStatus;

    if(level === "ND1" || "ND2") {
        level = "NCS-"
    } else {
        level = "HCS-" 
    }
    
    if(session === "2019/2020") {
        session = "19-"
    } else if(session === "2020/2021") {
        session = "20-" 
    } else if(session === "2021/2022") {
        session = "21-" 
    } else if(session === "2022/2023") {
        session = "22-" 
    } else if(session === "2023/2024") {
        session = "23-" 
    } else if(session === "2024/2025") {
        session = "24-" 
    } else if(session === "2025/2026") {
        session = "25-" 
    } else if(session === "2026/2027") {
        session = "26-" 
    } else if(session === "2027/2028") {
        session = "27-" 
    }
    matric = level+session+matNumber;
    if(attend === "PRESENT") {
        document.getElementById(matric+'present').checked = true;
        document.getElementById(matric+'absent').checked = false;
    } 
    else if(attend === "ABSENT") {
        document.getElementById(matric+'absent').checked = true;
        document.getElementById(matric+'present').checked = false;
    }
}

export default TakeAttendance;