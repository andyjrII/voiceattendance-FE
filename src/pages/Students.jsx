import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import Navigation from '../components/navigation';
import Sidebar from '../components/sidebar';
import { FcGraduationCap } from "react-icons/fc";

const STUDENTS_URL = '/student/find';
const UPDATE_STUDENTS_URL = 'student/update';

function Students() {
    const errRef = useRef();

    const [session, setSession] = useState('');
    const [level, setLevel] = useState('');
    const [students, setStudents] = useState('');
    const [newLevel, setNewLevel] = useState('');
    
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [session, level])

    const findStudents = async (e) => {
        e.preventDefault();
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
                setErrMsg('No Server Response');
            } else {
                setErrMsg(`An error occured!`)
            }
            errRef.current.focus();
        }
    }

    const updateLevel = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.patch(UPDATE_STUDENTS_URL, 
                JSON.stringify({ 
                    session, level, newLevel
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setStudents(response.data);
            window.alert(`Students successfully updated`);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg(`An error occured!`)
            }
            errRef.current.focus();
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
                                        <i className="icon-gradient bg-mean-fruit"><FcGraduationCap /></i>
                                    </div>
                                    <div>Students</div>
                                </div>    
                            </div>
                        </div>  
                        <div className="row">          
                            <div className="col-md-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                                        <h5 className="card-title">Find Students</h5>
                                        <form onSubmit={findStudents}>
                                            <div className="form-row">
                                                <div className="input-group col-md-2">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Level</span>
                                                    </div>
                                                    <select
                                                        id="level" className="form-control" name="level"
                                                        onChange={(e) => setLevel(e.target.value)} required
                                                    >
                                                        <option value="">-----</option>
                                                        <option value="ND1">ND1</option>
                                                        <option value="ND2">ND2</option>
                                                        <option value="HND1">HND1</option>
                                                        <option value="HND2">HND2</option>
                                                    </select>
                                                </div>
                                                <div className="input-group col-md-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Session</span>
                                                    </div>
                                                    <select
                                                        id="session" className="form-control" name="session"
                                                        onChange={(e) => setSession(e.target.value)} required
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
                                                    </select>
                                                </div>
                                                <div className="input-group col-md-2">
                                                    <button className='mt-1 btn btn-dark'>Find</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body"><h5 className="card-title">LEVEL: {level}, SESSION: {session}</h5>
                                        <table className="mb-0 table table-dark">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Full Name</th>
                                                    <th>Matric Number</th>
                                                    <th>Gender</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {(Object.keys(students).map((k, i) => {
                                            return(
                                                <tr key={i}>
                                                    <th scope="row">{students ? parseInt(k) + 1 : ""}</th>
                                                    <td>{students[k].firstName} {students[k].lastName}</td>
                                                    <td>{students[k].matricNumber}</td>
                                                    <td>{students[k].gender}</td>
                                                </tr>
                                                )
                                            }))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <h5 className="card-title">Update Students' Level</h5>
                                        <form>
                                            <div className="form-row">
                                                <div className="col input-group col-md-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">From {level ? level : "LEVEL"} to</span>
                                                    </div>
                                                    <select
                                                        id="newLevel" className="form-control" name="newLevel"
                                                        onChange={(e) => setNewLevel(e.target.value)} required
                                                    >
                                                        <option value="">-----</option>
                                                        <option value="ND1">ND1</option>
                                                        <option value="ND2">ND2</option>
                                                        <option value="HND1">HND1</option>
                                                        <option value="HND2">HND2</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-4">
                                                    <button className='mt-1 btn btn-dark' onClick={updateLevel}>Update</button>
                                                </div>
                                            </div>
                                        </form>
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

export default Students;