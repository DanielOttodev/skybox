// Plays a sample of the selected voice / language

import { Button } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
export default function SamplePlayer({ audio }: { audio: string }) {

    function playMedia() {
        console.log('audio:', audio);

        const audioPlayer = new Audio(audio)
        audioPlayer.play();

    }
    /*
    function pauseAudio() {
        const audio = new Audio('')
        audio.pause();

    } 
    */
    return (
        <div>
            <audio controls>
                <source src={audio} type="audio/ogg" />
                Audio not supported in this browser.
            </audio>
            <Button onClick={() => { playMedia() }} variant="text" sx={{ ml: 1 }}>Play Sample<PlayCircleIcon sx={{ ml: 1 }} /> </Button>

        </div>
    )
}