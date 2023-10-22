//Component for selecting which voice to use in the conversion process
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SynthVoices } from '../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function LanguageSelect({ languages, setVoice, voice }: { languages: Array<SynthVoices>, setVoice: (value: SynthVoices) => void, voice: SynthVoices },) {

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Voice</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={voice.Name}
                    onChange={(e) => {
                        const value = languages.find(item => item.Name == e.target.value) || { Name: 'Matthew', LanguageCode: 'en-US' } // Default to Matthew if returns undefined.
                        setVoice(value);
                    }}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {languages && languages.map((item: SynthVoices) => (
                        <MenuItem
                            key={item.Name}
                            value={item.Name}
                        >
                            {item.Name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
