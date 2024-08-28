import React from 'react';
import Button from '@mui/material/Button';
import Getallusers from '../../../components/Forms/getallUsers';
import RegisterUsersForm from '../../Forms/registerUsers.from'


function BodyHomepage() {
  return (
    <div style={{ width:'100%'}}>
      
      
      
      <Getallusers/>
      <br></br>
      <RegisterUsersForm/>
     
    </div>
  );
}

export default BodyHomepage;
