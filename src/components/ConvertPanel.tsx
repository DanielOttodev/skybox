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
    const [languages, setLanguages] = useState<string[] | undefined>();
    const [voices, setVoices] = useState<SynthVoices[] | null>(null);

    const { user } = useAuth();

    useEffect(() => { playSample(audio) }, [audio]) // Tracks when the audio changes and plays the audio stream.
    useEffect(() => {
        const languageArray = [...new Set(voices?.map(item => item.LanguageCode))];
        languageArray.sort();
        setLanguages(languageArray)
    }, [voices])
    useEffect(() => {
        if (voices == null) {
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
                        <LanguageSelect languages={languages} />
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
            <button onClick={() => { console.log(voices) }}>Click</button>
        </Box>

    )
}


"User: arn:aws:sts::818841439342:assumed-role/ratemyplate-api-getVoicesRole-hXfMUY9JnOkU/ratemyplate-api-getVoices-kixtAXYxAqgN is not authorized to perform: polly:DescribeVoices because no identity-based policy allows the polly:DescribeVoices action"