import { Paper, Grid, Button } from "@mui/material";

import VoiceSelect from "./VoiceSelect";
import LanguageSelect from "./LanguageSelect";
import Box from '@mui/material/Box';
import TextArea from "./TextArea";


export default function ConvertPanel() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 800,
                    height: 'auto',
                    padding: 5
                },
            }}
        >
            <Paper elevation={3}>
                <Grid>
                    <LanguageSelect />
                    <VoiceSelect />
                    <TextArea />
                    <Button>Convert</Button>
                </Grid>
            </Paper>
        </Box>

    )
}

