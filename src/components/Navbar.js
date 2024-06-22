import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

function Navbar() {
  const { StudentList, error } = useSelector((state) => state.Students);

  const show = function () {
    console.log(StudentList);
    console.log(error)
  };

  return (
    <div className="navbar bg-light">
      <h1 className="navbar-brand">Student Management</h1>
      <p className="ml-auto my-2 my-lg-0">
        Currently tasks pending: {StudentList.length}
      </p>
      {error !== null ? (
        <h5 className='text-center text-danger'>{error}</h5>
      ) : (
        <h5 className='text-center text-success'>Done</h5>
      )}

      <button onClick={show} style={{ backgroundColor: "pink" }}>
        Click
      </button>
    </div>
  );
}

export default Navbar;
