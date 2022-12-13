import Navigation from '../components/navigation';
import Sidebar from '../components/sidebar';
import { FcBusinessman } from "react-icons/fc";
import { useState } from "react";
import axios from '../api/axios';

const COURSES_URL = '/course/levelCourses';
const UPDATE_COURSE_URL = '/lecturer/course';
const LECTURER_COURSES_URL = '/course/lecturerCourses';

function Lecturer() {
    const [allCourses, setAllCourses] = useState('');
    const [courses, setCourses] = useState('');
    let [level, setLevel] = useState('');
    let [courseCode, setCourseCode] = useState('');

    const assignCourse = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(UPDATE_COURSE_URL, 
                JSON.stringify({ 
                courseCode
            }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
                }
            );
            window.alert(`${courseCode} Successfully Assigned`);
        } catch (err) {
            console.error(err);
        }
    }

    const getLecturerCourses = async () => {
        try {
            const response = await axios.get(LECTURER_COURSES_URL, {
                withCredentials: true
            });
            setCourses(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    getLecturerCourses();

    const getCourses = async () => {
        try {
            setLevel(level);
            const response = await axios.post(COURSES_URL, JSON.stringify({ 
                level
            }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setAllCourses(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const getCourseCode = async () => {
        setCourseCode(courseCode)
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
                                        <i className="icon-gradient bg-mean-fruit"><FcBusinessman /></i>
                                    </div>
                                    <div>Lecturer's Dashboard</div>
                                </div>    
                            </div>
                        </div>            
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <h5 className="card-title">Assign Course</h5>
                                        <form onSubmit={assignCourse}>
                                            <div className="form-row">
                                                <div className="input-group col-md-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Select Level</span>
                                                    </div>
                                                    <select
                                                        id="level" className="form-control" name="level"
                                                        onChange={(e) => {level = (e.target.value); getCourses()}} required
                                                    >
                                                        <option value="">-----</option>
                                                        <option value="ND1">ND1</option>
                                                        <option value="ND2">ND2</option>
                                                        <option value="HND1">HND1</option>
                                                        <option value="HND2">HND2</option>
                                                    </select>
                                                </div>
                                                <div className="input-group col-md-4">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text bg-danger text-light">Courses</span>
                                                    </div>
                                                    <select
                                                        id="course" className="form-control" name="course"
                                                        onChange={(e) => {courseCode = (e.target.value); getCourseCode()}} required
                                                    >
                                                        <option value="">-----</option>
                                                    {(Object.keys(allCourses).map((k, i) => {
                                                        return(
                                                        <option key={i} value={allCourses[k].courseCode}>{allCourses[k].courseCode}: {allCourses[k].courseTitle}</option>
                                                        )
                                                    }))}
                                                    </select>
                                                </div>
                                                <button className='mt-1 btn btn-dark'>Assign</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>          
                            <div className="col-lg-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body"><h5 className="card-title">Courses</h5>
                                        <table className="mb-0 table table-dark">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Course Code</th>
                                                <th>Course Title</th>
                                                <th>Level</th>
                                                <th>Semester</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {(Object.keys(courses).map((k, i) => {
                                                return(
                                                    <tr key={i}>
                                                        <th scope="row">{parseInt(k) + 1}</th>
                                                        <td>{courses[k].courseCode}</td>
                                                        <td>{courses[k].courseTitle}</td>
                                                        <td>{courses[k].level}</td>
                                                        <td>{courses[k].semester}</td>
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

export default Lecturer;