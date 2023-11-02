import { Paper, Grid, IconButton } from "@mui/material";
import LanguageSelect from "./LanguageSelect";
import Box from '@mui/material/Box';
import TextArea from "./TextArea";
import { PlayCircleOutline, StopCircleOutlined } from "@mui/icons-material";
import Slidebar from "./SlideBar";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { SynthVoices } from "../types";
import DragDrop from "./DragDrop";
import { secureFetch } from "../utils/fetch";

const audioPlayer = new Audio();
/*
function playSample(audio: string) {
    if (audio) {
        audioPlayer.src = audio
        audioPlayer.play();
    }

}
*/
export default function ConvertPanel() {
    const [text, setText] = useState<string>('')
    const [audio, setAudio] = useState<string>('');
    // const [languages, setLanguages] = useState<string[] | undefined>();
    const [voiceOption, setVoiceOptions] = useState<SynthVoices>({ Name: 'Matthew', LanguageCode: 'en-US' });
    const [voices, setVoices] = useState<SynthVoices[]>([]);
    const [playing, setPlaying] = useState<boolean>(false);

    const { user } = useAuth();
    //// For later: Need to be able to pass through the language code to the API.
    useEffect(() => {
        if (audio) {
            audioPlayer.src = audio
            setPlaying(true);
            audioPlayer.play();
            audioPlayer.addEventListener('ended', () => {
                setPlaying(false);

            })
        }

    }, [audio]) // Tracks when the audio changes and plays the audio stream.

    useEffect(() => {
        if (voices.length == 0) {
            fetch(`${import.meta.env.VITE_BASE_URL}/getvoices`, {
                method: 'GET', headers: { 'Authorization': `Bearer ${user}` }
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw { message: 'Unauthorized', status: response.status }

            }).then((data) => {
                const voiceArray: Array<SynthVoices> = data.map((voice: SynthVoices) => {
                    delete voice.SupportedEngines
                    delete voice.AdditionalLanguageCodes
                    return voice;
                })
                setVoices(voiceArray);
            }).catch(e => { console.log('Error:', e) })
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
                console.log(data.location);

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
                        <Paper variant="outlined" sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }} className="stripedBackground">
                            <img style={{ borderRadius: 10 }} src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="" />
                        </Paper>

                        <TextArea text={text} setText={setText} />
                        <IconButton onClick={() => {
                            if (playing) {
                                audioPlayer.pause()
                                setPlaying(false);
                            }
                            else { generateSpeech() }
                        }} size="medium" sx={{ color: 'skyblue' }}>
                            {playing && <StopCircleOutlined fontSize="medium" />}
                            {!playing && <PlayCircleOutline fontSize="medium" />}
                        </IconButton>
                        <Slidebar />
                    </Grid>

                </Grid>
            </Paper>
        </Box>

    )
}


