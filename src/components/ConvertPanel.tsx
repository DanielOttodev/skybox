import { Paper, Grid, IconButton } from "@mui/material";
import LanguageSelect from "./LanguageSelect";
import Box from '@mui/material/Box';
import TextArea from "./TextArea";
import { PlayCircleOutline } from "@mui/icons-material";
import Slidebar from "./SlideBar";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { SynthVoices } from "../types";
import DragDrop from "./DragDrop";


const audioPlayer = new Audio();

function playSample(audio: string) {
    if (audio) {
        audioPlayer.src = audio
        audioPlayer.play();
    }

}
export default function ConvertPanel() {
    const [text, setText] = useState<string>('')
    const [audio, setAudio] = useState<string>('');
    // const [languages, setLanguages] = useState<string[] | undefined>();
    const [voiceOption, setVoiceOptions] = useState<SynthVoices>({ Name: 'Matthew', LanguageCode: 'en-US' });
    const [voices, setVoices] = useState<SynthVoices[]>([]);

    const { user } = useAuth();
    //// For later: Need to be able to pass through the language code to the API.
    useEffect(() => { playSample(audio) }, [audio]) // Tracks when the audio changes and plays the audio stream.

    useEffect(() => {
        if (voices.length == 0) {
            fetch(`${import.meta.env.VITE_BASE_URL}/getvoices`, {
                method: 'GET', headers: { 'Authorization': `Bearer ${user}` }
            }).then(response => response.json())
                .then((data) => {
                    const voiceArray: Array<SynthVoices> = data.map((voice: SynthVoices) => {
                        delete voice.SupportedEngines
                        delete voice.AdditionalLanguageCodes
                        return voice;
                    })
                    setVoices(voiceArray);
                })
        }


    }, [user, voices]); // Grabs the available voices and passes them to input components.


    function generateSpeech() {
        const url = `${import.meta.env.VITE_BASE_URL}/streamspeech`;
        fetch(url, {
            method: 'post',
            body: JSON.stringify({ text: text, voice: voiceOption.Name, language: voiceOption.LanguageCode }),
            headers: {
                'Authorization': `Bearer ${user}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then((data) => {
                setAudio(data.location)
            })
            .catch(e => console.log(e))
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
                        <LanguageSelect setVoice={setVoiceOptions} voice={voiceOption} languages={voices} />
                    </Grid>
                    <Grid item xs={12}>
                        <DragDrop />
                        <TextArea text={text} setText={setText} />
                        <IconButton onClick={() => generateSpeech()} size="medium" sx={{ color: 'skyblue' }}><PlayCircleOutline fontSize="medium" /></IconButton>
                        <Slidebar />
                    </Grid>

                </Grid>
            </Paper>
        </Box>

    )
}


