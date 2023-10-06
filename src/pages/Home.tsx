import { useAuth } from "../hooks/useAuth"
import { Paper } from "@mui/material";
import Box from '@mui/material/Box';
export default function Home(){
    const {onLogout} = useAuth();

    return(
        <div>
    
       
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >

      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={3} />
      <Paper elevation={1} />
    </Box>
            <button onClick={() => { onLogout()}} className="p-5 bg-slate-300 m-5 border rounded hover:cursor-pointer">Sign Out</button>
        </div>
    )

}