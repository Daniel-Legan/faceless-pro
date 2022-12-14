import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function EmployerForm() {
    const dispatch = useDispatch();

    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyLink, setCompanyLink] = useState('');
    const [companyLogoPath, setCompanyLogoPath] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('in handleSubmit');

        dispatch({
            type: 'ADD_EMPLOYER_INFO',
            payload: {
                companyName: companyName,
                companyAddress: companyAddress,
                companyPhone: companyPhone,
                companyLink: companyLink,
                companyLogoPath: companyLogoPath,
                companyDescription: companyDescription
            }
        })

        setCompanyName('');
        setCompanyAddress('');
        setCompanyPhone('');
        setCompanyLink('');
        setCompanyLogoPath('');
        setCompanyDescription('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField value={companyName} onChange={(event) => {setCompanyName(event.target.value)} } label="company name" />
            <TextField value={companyAddress} onChange={(event) => { setCompanyAddress(event.target.value) }} label="company address" />
            <TextField value={companyPhone} onChange={(event) => { setCompanyPhone(event.target.value) }} label="company phone number" />
            <TextField value={companyLink} onChange={(event) => { setCompanyLink(event.target.value) }} label="company site link" />
            <TextField value={companyLogoPath} onChange={(event) => { setCompanyLogoPath(event.target.value) }} label="company logo upload" />
            <TextField value={companyDescription} onChange={(event) => { setCompanyDescription(event.target.value) }} label="company description" />
            <Button type='submit' variant='contained'>submit</Button>
        </form>
    );
}

export default EmployerForm