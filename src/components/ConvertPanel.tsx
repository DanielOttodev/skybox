import { Paper, Grid, IconButton } from "@mui/material";
import VoiceSelect from "./VoiceSelect";
import LanguageSelect from "./LanguageSelect";
import Box from '@mui/material/Box';
import TextArea from "./TextArea";
import { PlayCircleOutline } from "@mui/icons-material";


export default function ConvertPanel() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 1200,
                    height: 'auto',
                    padding: 5
                },
            }}
        >
            <Paper elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <LanguageSelect />
                    </Grid>
                    <Grid item xs={6}>
                        <VoiceSelect />
                    </Grid>
                    <Grid item xs={12}>
                        <TextArea />
                        <IconButton size="medium" sx={{ color: 'skyblue' }}><PlayCircleOutline fontSize="medium" /></IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </Box>

    )
}

