import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography, Box, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function Skills() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState([
    { Skill: '' },
  ]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = (e) => {
    e.preventDefault();

    formFields.forEach((form) => {
      dispatch({
        type: 'ADD_SKILL',
        payload: {
          Skill: form.Skill,
        },
      });
    });
    history.push('/hyperlink');
  };

  const addFields = () => {
    let object = {
      Skill: '',
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };




  return (
    <>
      {/* <CandidateBreadcrumb /> */}
      <Box className='container'>
        <div className="Skill" style={{
        }}>
          <Typography style={{ marginTop: '1em' }} id='populateCandidateSkills' variant="h3">Skills</Typography>
          <Typography variant='h6' style={{ marginTop: '2em', marginBottom: '2em' }}>This information will be shared with employers as part of your application.</Typography>
          <Typography>Step 5 of 6</Typography>

          <Box sx={{ marginTop: '5em' }}>
            <form id='candidateSkills' onSubmit={submit}>
              {formFields.map((form, index) => {
                return (
                  <div key={index}>
                    <TextField
                      className='textField'
                      style={{ width: '20em', marginBottom: '2em', marginRight: '2em' }}
                      id='skill'
                      name="Skill"
                      onChange={event => handleFormChange(event, index)}
                      value={form.Skill}
                    />
                    <IconButton onClick={() => removeFields(index)}><DeleteIcon /></IconButton>
                  </div>
                );
              })}

            </form>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3em', width: '25%' }}>
              <Button variant="contained" color="error" onClick={addFields}>add more</Button>
              <Button className='formButtons' variant="contained" color="primary" onClick={submit}>Next</Button>
            </Box>
          </Box>
          <div>
          </div>
        </div>
      </Box>
    </>

  );
}

export default Skills;
