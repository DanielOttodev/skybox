import { ButtonGroup, Button } from '@mui/material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { AiFillFileText, AiOutlineFileSearch } from 'react-icons/ai'

export default function UploadBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <Typography sx={{ pl: 1, mt: 3 }}>
                To get started write text directly in the box below, import from a file or scan an image for text.
            </Typography>



            <input style={{ "display": "none" }} id="file-upload" type="file" />
            <ButtonGroup variant="contained" aria-label="outlined button group">

                <label htmlFor="file-upload" className="custom-file-upload p-2 text-white bg-sky-700 hover:cursor-pointer hover:bg-sky-600">Import File<AiFillFileText size={20} className="ml-2 inline" /> </label>
                <Button>Read from Image <AiOutlineFileSearch size={20} className="ml-2" /> </Button>
            </ButtonGroup>
        </Box>
    );
}