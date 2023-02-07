import { Stack, TextField, TextareaAutosize } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import React from "react";

const AddReviews: React.FC = () => {
  
  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            className="textfield"
            variant="outlined"
            placeholder="Leave a Review"
            sx={{ width: '500px', marginTop: '5%', }}
            inputProps={{ sx: { height: 200 } }}           
          />
        </Stack>
      </Stack>

      <Box sx={{ marginTop: "20px",
       justifyContent: "flex-end",
       display: 'flex' }}>
        <Button variant="outlined"
        sx={{
          marginRight: '20px'
        }}
        >Cancel</Button>
        <Button variant="contained"
        style={{
          color: 'white'
        }}>Submit</Button>
      </Box>
    </>
  );
};

export default AddReviews;


