import React from 'react';
import Button from '@mui/material/Button';
import Getallusers from '../../../components/Forms/getallUsers';
import RegisterUsersForm from '../../Forms/registerUsers.from'


function BodyHomepage() {
  return (
    <div style={{display:'flex'}}>
      <div style={{ width:'40%'}}>
        <Getallusers/>
      </div>
      
      
      <br></br>
      <div style={{ width:'40%'}}>
        <RegisterUsersForm/>
      </div>
      
      
     
    </div>
  );
}

export default BodyHomepage;
