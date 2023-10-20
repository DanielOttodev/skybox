import { Paper, Grid, IconButton } from "@mui/material";
import VoiceSelect from "./VoiceSelect";
import LanguageSelect from "./LanguageSelect";
import Box from '@mui/material/Box';
import TextArea from "./TextArea";
import { PlayCircleOutline } from "@mui/icons-material";
import Slidebar from "./SlideBar";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { SynthVoices } from "../types";


function playSample(audio: string) {
    if (audio) {
        const audioPlayer = new Audio(audio)
        audioPlayer.play();
    }

}

export default function ConvertPanel() {
    const [text, setText] = useState<string>('')
    const [audio, setAudio] = useState<string>('');
    const [languages, setLanguages] = useState<string[]>();
    const [voices, setVoices] = useState<string[]>();

    const { user } = useAuth();

    useEffect(() => { playSample(audio) }, [audio]) // Tracks when the audio changes and plays the audio stream.

    useEffect(() => {
        async () => {
            console.log('fetching...');

            const response = await fetch(`${import.meta.env.BASE_URL}/getvoices`, {
                method: 'GET',
                headers: { 'Authorization': `${user}` }
            })
            const data = await response.json();
            console.log(data);
        }
    }, []); // Grabs the available voices and passes them to input components.


    function generateSpeech() {
        const url = `${import.meta.env.VITE_BASE_URL}/streamspeech`;
        fetch(url, {
            method: 'post',
            body: JSON.stringify({ text: text }),
            headers: {
                'Authorization': `Bearer ${user}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then((data) => {
                console.log('data:', data.location.toString());
                setAudio(data.location)
            })
            .catch(e => console.log(e));
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

