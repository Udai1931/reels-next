import React from 'react'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import BackupIcon from '@mui/icons-material/Backup';

function Upload() {
    return (
        <div style={{ width: "100vw", height: "10vh", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }}>
            <Button variant="outlined" color='secondary' component="label" style={{ fontWeight: "bold",width:"15rem"}} startIcon={<BackupIcon />}>
                <input type="file" accept="video/*" style={{ display: 'none' }} />
                Upload
            </Button>
        </div>
    )
}

export default Upload
