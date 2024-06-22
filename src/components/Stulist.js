import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import UpdateStu from './UpdateStu';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedStudent, removeStudenttolist, getStudentsfromServer, deleteStudentstoServer } from '../slices/StudentSlice';

function Stulist() {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    const { StudentList } = useSelector((state) => state.Students);



    useEffect(() => {
        dispatch(getStudentsfromServer());
    }, [dispatch]);


    const updateStu = (stu) => {
        setModalShow(true);
        dispatch(setSelectedStudent(stu));
        console.log("Update");
    };

    const deleteStu = (stu) => {

        console.log("Delete", stu);
        dispatch(deleteStudentstoServer(stu))   ///both list and server used because when we delete in server we use to get an empty object so we dont know 
            .unwrap()
            .then(function () {
                dispatch(removeStudenttolist(stu))

            })
    };




    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {StudentList && StudentList.map((stu, index) => (
                        <tr className='text-center' key={stu.id}>
                            <td>{index + 1}</td>
                            <td>{stu.studentName}</td>
                            <td>{stu.phoneNumber}</td>
                            <td>{stu.email}</td>
                            <td>{stu.password}</td>
                            <td>
                                <Button variant="primary" className='mx-3' onClick={() => updateStu(stu)}>
                                    <i className="bi bi-pencil-square"></i>
                                </Button>
                                <Button variant="danger" onClick={() => deleteStu(stu)}>
                                    <i className="bi bi-trash-fill"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <UpdateStu show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}

export default Stulist;
