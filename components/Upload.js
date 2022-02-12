import React from 'react'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

function Upload() {
    return (
        <div>
            <Button variant="outlined" color='secondary' component="span">
                <Input type="file" accept="image/*" style={{ display: 'none' }} />
                Upload
            </Button>
            <Button variant="outlined" margin='dense' fullWidth component="span" sx={{ marginTop: "1rem" }}>
                <Input accept="image/*" style={{ display: 'none' }} />
                Upload
            </Button>
        </div>
    )
}

export default Upload
