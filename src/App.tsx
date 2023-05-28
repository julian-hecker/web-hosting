import { Box, Button, Stack } from '@mui/material';
import { ParticleBg } from './components/ParticleBg';
import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [tab, setTab] = useState(0);
  const [directory, setDirectory] = useState<FileList>();
  const [directoryName, setDirectoryName] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const theFiles = e.target.files;
    const relativePath = theFiles === null ? "" : theFiles[0].webkitRelativePath;
    const folderName = relativePath.split("/");
    setDirectoryName(folderName[0]);
    setDirectory(e.target.files === null ? undefined : e.target.files)
  }

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
        width: "40%",
        height: "50%"}}>
      <Stack direction={"column"} 
             alignItems={"center"}
             gap={"20px"}
             padding={"20px"}
             height={"100%"}
             borderRadius={"4px"}
             className="glass-box">
        <Stack direction={"row"}>
          <Button onClick={()=>setTab(0)} 
                  className={`${tab === 0 ? "action-button--active" : "action-button"}`}>
            Deploy
          </Button>
          <Button onClick={()=>setTab(1)}
                  className={`${tab === 1 ? "action-button--active" : "action-button"}`}>
            View
          </Button>
        </Stack>
        {tab === 0 ?
            <Box sx={{height: "100%",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #FAFAFA",
                      borderRadius: "4px"
                 }}>

              {directory ? 
                <label htmlFor="input-area" className="custom-file-upload">
                  {directoryName}
                </label>
                : 
                <label htmlFor="input-area" className="custom-file-upload">
                  Click or drag here to upload your directory!
                </label>
              }
              <input type="file" ref={ref} id='input-area' onChange={(e)=>{handleFileInput(e)}} />
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
