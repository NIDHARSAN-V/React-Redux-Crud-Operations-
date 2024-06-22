import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudentstoServer, updateStudenttolist } from '../slices/StudentSlice';



function UpdateStu(props) {
  const dispatch = useDispatch()
  const [studentName, setStudentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setid] = useState()
  const { SelectedStudentList } = useSelector((state) => state.Students)
  const updateStudent = function () {
    props.onHide();
    const updatedStudent = { id, studentName, phoneNumber, email, password };
    dispatch(updateStudentstoServer(updatedStudent));

  }
  useEffect(() => {


    setStudentName(SelectedStudentList.studentName)
    setEmail(SelectedStudentList.email)
    setPassword(SelectedStudentList.password)
    setPhoneNumber(SelectedStudentList.phoneNumber)
    setid(SelectedStudentList.id)

  }, [SelectedStudentList])
  const handleNameChange = (e) => setStudentName(e.target.value);
  const handlePhoneChange = (e) => setPhoneNumber(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="mt-5">
          <Row className="justify-content-md-center">
            <Col md={6}>
              <h2 className="mb-4">Update Student</h2>
              <Form >
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter student name"
                    value={studentName}
                    onChange={handleNameChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>


              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>

        <Button variant="primary" type="submit" onClick={function (e) {
          updateStudent(e)
        }
        }>
          Update Student
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateStu;
