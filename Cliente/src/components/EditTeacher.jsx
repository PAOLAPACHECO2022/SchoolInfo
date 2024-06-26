import Sidebar from "./Sidebar";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormEditTeacher from "./FormEditTeacher";

const EditTeacher = () => {
    const token = useSelector((state) => state.token);
    const {teacherId} = useParams();
    const [teacherData, setTeacherData] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;

    const getTeacher = async () => {
        const response = await fetch(`${API_URL}/teachers/${teacherId}/teacher`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setTeacherData(data);
    };

    useEffect(() => {
        getTeacher();
    }, []); // eslint-disable-line

    if (!teacherData) return null;

    return(
        <>
            <Sidebar />
            <Aside />
            <FormEditTeacher teacherData={teacherData} setTeacherData={setTeacherData} />
        </>
    )
}

export default EditTeacher;