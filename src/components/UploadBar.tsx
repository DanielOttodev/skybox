import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
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
            <ButtonGroup variant="contained" aria-label="outlined button group">
                <Button>Import File  <AiFillFileText size={20} className="ml-2" /> </Button>
                <Button>Read from Image <AiOutlineFileSearch size={20} className="ml-2" /> </Button>
            </ButtonGroup>
        </Box>
    );
}