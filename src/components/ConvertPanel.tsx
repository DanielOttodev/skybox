import { Paper, Grid, IconButton } from "@mui/material";
import VoiceSelect from "./VoiceSelect";
import LanguageSelect from "./LanguageSelect";
import Box from '@mui/material/Box';
import TextArea from "./TextArea";
import { PlayCircleOutline } from "@mui/icons-material";
import Slidebar from "./SlideBar";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";


export default function ConvertPanel() {
    const [text, setText] = useState<string>('')
    const [audio, setAudio] = useState<string>('');
    const { user } = useAuth();

    useEffect(() => { setTimeout(() => playSample(), 1000) }, [audio])

    function generateSpeech() {
        const url = `${import.meta.env.VITE_BASE_URL}/createspeech`;
        console.log('Generating speech...');
        console.log(user);
        fetch(url, {
            method: 'post',
            body: JSON.stringify({ text: text }),
            headers: {
                'Authorization': `Bearer ${user}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then((data) => {
                setAudio(data.SynthesisTask.OutputUri)
            })
            .catch(e => console.log(e));
    }
    function playSample() {

        console.log('Playing sample...', audio);
        const audioPlayer = new Audio(audio)
        audioPlayer.play();
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
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
                        <TextArea text={text} setText={setText} />
                        <IconButton onClick={() => generateSpeech()} size="medium" sx={{ color: 'skyblue' }}><PlayCircleOutline fontSize="medium" /></IconButton>
                        <Slidebar />
                    </Grid>

                </Grid>
            </Paper>
        </Box>

    )
}

