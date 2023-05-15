import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Users from './components/users/Users';
import EditUser from './components/users/EditUser';
import AddUser from './components/users/AddUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/users/edit/:id' element={<EditUser />} />
        <Route exact path='/users/add-user' element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
