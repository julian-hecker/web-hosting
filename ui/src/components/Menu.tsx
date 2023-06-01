import { useState, useEffect } from 'react';
import Tabs from './Tabs';
import { Box, Button, Stack, CircularProgress, Alert, Snackbar } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AccordianTable from './AccordianTable';
import { useTheta } from '../hooks/useTheta';
import { useWeb3Context } from '../contexts/Web3Context';
import { THETA_DATA_URL } from '../constants/config';
import { useSiteHostContract } from '../hooks/useSiteHostContract';

export default function Menu() {
  const [tab, setTab] = useState(0);
  const [directory, setDirectory] = useState<FileList>();
  const [directoryName, setDirectoryName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string>('');
  const [snackOpen, setSnackOpen] = useState<boolean>(false);

  const { account } = useWeb3Context();
  const { sendFilesToTheta } = useTheta();
  const { getSites, uploadSite } = useSiteHostContract();

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    // Store file list in variable.
    const theFiles = e.target.files;
    // Attempt to update directory name.
    updateDirectoryName(theFiles);
    // Store the file list in state.
    setDirectory(theFiles === null ? undefined : theFiles);
  };

  const updateDirectoryName = (theFiles: FileList | null) => {
    // Attempt to get the relative path.
    const relativePath =
      theFiles === null ? '' : theFiles[0].webkitRelativePath;
    // Split the relative path on the 'character'.
    const folderName = relativePath.split('/');
    // Store the directory name in state by looking at the first item.
    setDirectoryName(folderName[0]);
  };

  const handleDeploy = async () => {
    setLoading(true);
    if (!directory)
    {
      setUploadMessage(`You need to select a directory!`);
      setUploadSuccess(false);
      setSnackOpen(true);
      setLoading(false);
      return;
    }

    let token = '';
    try {
      token = await sendFilesToTheta(directory);
      await uploadSite(token);
      // succeeded
      setDirectory(undefined);
      setDirectoryName('');
      // todo: present success snackbar
      setUploadMessage(`Your site has successfully deployed! ${THETA_DATA_URL + '/' + token}`);
      setUploadSuccess(true);
      setSnackOpen(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      // if first part succeeded but not the second part
      if (token)
      {
        setUploadSuccess(true);
        setUploadMessage(`Your site was successfully deployed, but the registration on our site failed. Save this link to view your site: ${THETA_DATA_URL + '/' + token}`);
        setSnackOpen(true);
        setLoading(false);
        return;
      }
      setUploadSuccess(false);
      setUploadMessage(`Your site was was not deployed. Try again later`);
      setSnackOpen(true);
    }
  };

  const [sites, setSites] = useState<string[]>([]);
  useEffect(() => {
    if (!account) return;
    getSites().then(setSites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, account]);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        {uploadSuccess ? 
          <Alert onClose={handleClose} sx={{ width: '100%', background:"#4cc76c !important", color: "#383582" }}>
            {uploadMessage}
          </Alert>
          :
          <Alert onClose={handleClose} sx={{ width: '100%', background:"#c92626 !important", color: "#FAFAFA"}}>
            {uploadMessage}
          </Alert>
        }
      </Snackbar>
      <Box
        sx={{
          position: 'absolute',
          margin: '0',
          top: '50%',
          left: '50%',
          msTransform: 'translate(-50%, -40%)',
          transform: 'translate(-50%, -40%)',
          width: '50%',
          minWidth: '300px',
          maxWidth: '100%',
          minHeight: '300px',
          height: '70%',
          maxHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <Stack
          direction={'column'}
          alignItems={'center'}
          gap={'20px'}
          padding={'20px'}
          height={'100%'}
          borderRadius={'4px'}
          className="glass-box"
        >
          <Tabs setTab={setTab} tab={tab} />
          {tab === 0 ? (
            <Box
              sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading ? <CircularProgress /> : <>
              {directory ? (
                <label
                  htmlFor="input-area"
                  className={`custom-file-upload ${
                    directory
                      ? 'custom-file-upload--item-submitted'
                      : ''
                  }`}
                >
                  <Stack
                    direction={'row'}
                    gap={'1rem'}
                    alignItems={'center'}
                  >
                    <FolderIcon fontSize="large" /> {directoryName}
                  </Stack>
                </label>
              ) : (
                <>
                  <label
                    htmlFor="input-area"
                    className={`custom-file-upload`}
                  >
                    <Stack
                      direction={'row'}
                      gap={'20px'}
                      alignItems={'center'}
                    >
                      <DriveFolderUploadIcon fontSize="large" /> Click
                      to upload your directory.
                    </Stack>
                  </label>
                  <input
                    type="file"
                    draggable
                    id="input-area"
                    onChange={handleFileInput}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    directory=""
                    webkitdirectory=""
                  />
                </>
              )}</>
              }
            </Box>
          ) : (
            <Box
              sx={{
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '4px',
                width: '100%',
              }}
            >
              <AccordianTable rows={sites} />
            </Box>
          )}
          {tab === 0 ? (
            <Button
              disabled={loading}
              variant="contained"
              sx={{ color: '#FAFAFA' }}
              onClick={handleDeploy}
            >
              Deploy
            </Button>
          ) : null}
        </Stack>
      </Box>
    </>
  );
}
