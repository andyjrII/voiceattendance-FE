import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import Navigation from '../components/navigation';
import Sidebar from '../components/sidebar';
import { FcList } from "react-icons/fc";

const COURSE_URL = '/course/create';

function Courses() {
    const errRef = useRef();

    const [courseTitle, setCourseTitle] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [semester, setSemester] = useState('');
    const [level, setLevel] = useState('');
    const [course, setCourse] = useState('');
    
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [courseTitle, courseCode, semester, level])

    const addCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(COURSE_URL, 
                JSON.stringify({ 
                    courseCode, courseTitle, semester, level
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setCourse(response.data);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                setErrMsg(`${courseCode} already exists!`);
            } else {
                setErrMsg(`${courseCode} already exists!`)
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
                                        <i className="icon-gradient bg-mean-fruit"><FcList /></i>
                                    </div>
                                    <div>Courses</div>
                                </div>    
                            </div>
                        </div>  
                        <div className="row">          
                            <div className="col-md-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                                        <h5 className="card-title">Add a Course</h5>
                                        <form onSubmit={addCourse}>
                                            <div className="form-row">
                                                <div className="input-group col-md-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Course Code</span>
                                                    </div>
                                                    <input
                                                        type="text" id="courseCode" className="form-control"
                                                        onChange={(e) => setCourseCode(e.target.value)} value={courseCode} required
                                                    />
                                                </div>
                                                <div className="input-group col-md-5">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Course Title</span>
                                                    </div>
                                                    <input
                                                        type="text" id="courseTitle" className="form-control"
                                                        onChange={(e) => setCourseTitle(e.target.value)} value={courseTitle} required
                                                    />
                                                </div>
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
                                                <div className="input-group col-md-2">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Semester</span>
                                                    </div>
                                                    <select
                                                        id="semester" className="form-control" name="semester"
                                                        onChange={(e) => setSemester(e.target.value)} required
                                                    >
                                                        <option value="">-----</option>
                                                        <option value="FIRST">1st</option>
                                                        <option value="SECOND">2nd</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <br />
                                            <button className='mt-1 btn btn-dark'>Add</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <table className="mb-0 table table-dark">
                                            <thead>
                                                <tr>
                                                    <th>Course Code</th>
                                                    <th>Course Title</th>
                                                    <th>Level</th>
                                                    <th>Semester</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{course.courseCode}</td>
                                                    <td>{course.courseTitle}</td>
                                                    <td>{course.level}</td>
                                                    <td>{course.semester}</td>
                                                </tr>
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

export default Courses;