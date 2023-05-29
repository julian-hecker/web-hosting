import { useState, useRef, useEffect } from 'react';
import Tabs from './Tabs';
import { Box, Button, Stack } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';


export default function Menu() {
    const [tab, setTab] = useState(0);
    const [directory, setDirectory] = useState<File>();
    const [directoryName, setDirectoryName] = useState<string>("");
    const ref = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      if (ref.current !== null) {
        ref.current.setAttribute("directory", "");
        ref.current.setAttribute("webkitdirectory", "");
      }
    }, [ref]);
  
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const theFiles = e.target.files;
      console.log(theFiles ? theFiles : "oof");
      const relativePath = theFiles === null ? "" : theFiles[0].webkitRelativePath;
      const folderName = relativePath.split("/");
      setDirectoryName(folderName[0]);
      setDirectory(e.target.files === null ? undefined : e.target.files[0]);
    }

    return(
        <>
            <Box sx={{
                    position: "absolute", 
                    margin: "0", 
                    top: "50%", 
                    left: "50%", 
                    msTransform: "translate(-50%, -50%)", 
                    transform: "translate(-50%, -50%)", 
                    width: "40%",
                    minWidth: "300px",
                    maxWidth: "100%",
                    height: "50%"
                }}>
                <Stack direction={"column"} 
                       alignItems={"center"}
                       gap={"20px"}
                       padding={"20px"}
                       height={"100%"}
                       borderRadius={"4px"}
                       className="glass-box">
                    <Tabs setTab={setTab} 
                          tab={tab}/>
                    {tab === 0 ?
                        <Box sx={{height: "100%",
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                            }}>
                            {directory ? 
                                <label htmlFor="input-area" 
                                       className={`custom-file-upload ${directory ? "custom-file-upload--item-submitted" : ""}`}>
                                    <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
                                        <FolderIcon fontSize="large"/> {directoryName}
                                    </Stack>
                                </label>
                                : 
                                <>
                                    <label htmlFor="input-area" 
                                           className={`custom-file-upload`}>
                                        <Stack direction={"row"} gap={"1rem"} alignItems={"center"}>
                                            <DriveFolderUploadIcon fontSize="large"/> Click to upload your directory.
                                        </Stack>
                                    </label>
                                    <input type="file"
                                           draggable
                                           ref={ref} 
                                           id='input-area' 
                                           onChange={handleFileInput}/>
                                </>
                            }
                        </Box>
                        : 
                        <Box sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#181818",
                                borderRadius: "4px",
                                width: "100%"
                            }}>
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
        </>
    )
}