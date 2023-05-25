import { Box, Button, Stack } from '@mui/material';
import { ParticleBg } from './components/ParticleBg';
import { useState } from 'react';

function App() {
  const [tab, setTab] = useState(0);

  return (
  <div>
    <ParticleBg />
    <Box sx={{
        position: "absolute", 
        margin: "0", 
        top: "50%", 
        left: "50%", 
        msTransform: "translate(-50%, -50%)", 
        transform: "translate(-50%, -50%)", 
        width: "50%",
        height: "50%"}}>
      <Stack direction={"column"} 
             alignItems={"center"}
             gap={"20px"}
             padding={"20px"}
             height={"100%"}
             borderRadius={"4px"}
             bgcolor={"orange"}>
        <Stack direction={"row"}>
          <Button onClick={()=>setTab(0)} 
                  sx={{color: tab === 0 ? "#383582" : "#FAFAFA",
                       borderBottom: tab === 0 ? "2px solid #383582" : "none",
                       borderBottomLeftRadius: "0",
                       borderBottomRightRadius: "0"
                  }}>
            Deploy
          </Button>
          <Button onClick={()=>setTab(1)}
                  sx={{color: tab === 1 ? "#383582" : "#FAFAFA",
                       borderBottom: tab === 1 ? "2px solid #383582" : "none",
                       borderBottomLeftRadius: "0",
                       borderBottomRightRadius: "0"
                  }}>
            View
          </Button>
        </Stack>
        {tab === 0 ?
            <Box sx={{height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #181818",
                      borderRadius: "4px"
                 }}>
              <input style={{width:"100%", 
                             height: "100%",
                     }} 
                     type="file" />
            </Box>
          : 
          <Box sx={{height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#181818",
                      borderRadius: "4px",
                      width: "100%"
                 }}>
            <Button>Hi</Button>
          </Box>
        }
        {tab === 0 ? 
          <Button variant="contained" 
                  sx={{color: "#FAFAFA"}}>
            Deploy
          </Button> 
          : 
          null
        }
      </Stack>
    </Box>
  </div>
  );
}

export default App;
