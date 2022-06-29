import React from 'react';


const Users = ({ users, userId, deleteAUser })=> {
  return (
    <ul id='userlist'>
      <li className={ !userId ? 'selected': ''}>
        <a href='#'>Users</a>
      </li>
      {
        users.map( user => {
          return (
            <li className={ user.id === userId*1 ? 'selected': ''} key={ user.id }>
              <a href={`#${user.id}`}>
                { user.name }
              </a>
              <button onClick ={ ()=> {
              deleteAUser(user)
              }}>X</button>
            </li>
          );
        })
      }
    </ul>
  );
}

export default Users;


