import * as React from 'react';
import { useState } from 'react';
import {Modal, TextField, Button, Alert, Box, Snackbar} from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '50vh'
};

const FormModal = ({open, setOpen}) => {
  const handleClose = () => setOpen(false);
  const [errMessage, setErrMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [snackOpen, setSnackOpen] = useState(false)
  const [value, setValue] = useState({
      name:'',
      description: ''
  });

  const handleChange = (event) => {
      console.log(event);
      setErrMessage('')
      setSuccessMessage('')
        setValue(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
  };
  const sendRequest= async() => {
      try {
        if(value.name && value.description) {
            await axios.post('/api/v1/items', value)
            setSuccessMessage('Item Posted Successfuly')
            setOpen(false)
        } else {
            setErrMessage('Fill All Fields')
        }
      } catch (err) {
        setErrMessage('Something Went Wrong')
      }
  }
 const onSubmit = () => {
     sendRequest()
 }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField
          id="outlined-multiline-static"
          label="Name"
          multiline
          name='name'
          maxRows={4}
          placeholder="Type the item's name"
          onChange={handleChange}
        />
        <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        name='description'
        rows={4}
        placeholder="Type the item's description"
        onChange={handleChange}
      />
      <Button variant="contained" onClick={onSubmit}>
          Add Item
      </Button>
      {
          errMessage ? <Alert severity="error">{errMessage}</Alert> : ''
      }
        </Box>
      </Modal>
    </div>
  );
}

export default FormModal