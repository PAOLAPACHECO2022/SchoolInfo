import Sidebar from "./Sidebar";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormEditGrade from "./FormEditGrade";

const EditGrade = () => {
    const token = useSelector((state) => state.token);
    const {level, gradeId} = useParams();
    const [gradeData, setGradeData] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;

    const getGrade = async () => {
        const response = await fetch(`${API_URL}/grades/${gradeId}/grade`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setGradeData(data);
    };

    useEffect(() => {
        getGrade();
    }, []); // eslint-disable-line

    if (!gradeData) return null;

    return(
        <>
            <Sidebar />
            <Aside />
            <FormEditGrade gradeData={gradeData} setGradeData={setGradeData} level={level} />
        </>
    )
};

export default EditGrade;