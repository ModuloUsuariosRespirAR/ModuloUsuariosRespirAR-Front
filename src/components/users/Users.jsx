import React from 'react';
import Header from './Header';
import User from './User';

const users = [
  {
    _id: '6170ce2fb392b40016be18fa',
    firstName: 'Jose',
    lastName: 'Valero',
    email: 'josemiguelvaleroreyes@gmail.com',
    document: '95959595',
    address: 'J.M. Estrada 2515, Mendoza',
    created: '2021-10-21T02:19:27.706Z',
    createdBy: '6167593bc2291d41d062045d',
    __v: 0
  },
  {
    _id: '6170a01d5287f3001623b19e',
    firstName: 'Cesar Luis',
    lastName: 'Velez',
    email: 'cesarlvelez@gmail.com',
    document: '19741258',
    address: 'Hortiguera 3652, Bahía Blanca, Bs. As.',
    created: '2021-10-20T23:02:53.170Z',
    createdBy: '6167593bc2291d41d062045d',
    __v: 0
  },
  {
    _id: '61709fd35287f3001623b19d',
    firstName: 'Alberto',
    lastName: 'Sosa',
    email: 'albersosa@hotmail.com',
    document: '27896214',
    address: 'Reconquista 121, Rosario, Santa Fe.',
    created: '2021-10-20T23:01:39.874Z',
    createdBy: '6167593bc2291d41d062045d',
    __v: 0
  },
  {
    _id: '61709b025287f3001623b19c',
    firstName: 'Juan José',
    lastName: 'Lopez',
    email: 'jjlopez@hotmail.com',
    document: '16987456',
    address: 'Sarmiento 3258, Piso 3, Depto B, CABA.',
    created: '2021-10-20T22:41:06.788Z',
    createdBy: '6167593bc2291d41d062045d',
    __v: 0
  },
  {
    _id: '61705f7dc69a6d0016be0bd9',
    firstName: 'Silvia',
    lastName: 'Juarez',
    email: 'silviajuarez@gmail.com',
    document: '13456787',
    address: 'San Martin 210, San Isidro, Bs. As.',
    created: '2021-10-20T18:27:09.972Z',
    createdBy: '6167593bc2291d41d062045d',
    __v: 0
  },
  {
    _id: '616d9e529c011519946c4259',
    firstName: 'Jorge',
    lastName: 'Morales',
    email: 'jmorales@gmail.com',
    document: '29123456',
    address: 'Salta 4125, General Pico, La Pampa',
    created: '2021-10-18T16:18:26.505Z',
    createdBy: '6167593bc2291d41d062045d',
    __v: 0
  }
];

const AdminUsers = () => {
  return (
    <>
      <Header />
      <div className='table-responsive-lg'>
        <table className='table table-striped'>
          <thead className='bg-primary table-dark'>
            <tr>
              <th scope='col'>Nombres</th>
              <th scope='col'>Apellido</th>
              <th scope='col'>DNI</th>
              <th scope='col'>Dirección</th>
              <th scope='col'>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </table>
      </div>
    </>
  );
};

export default AdminUsers;
