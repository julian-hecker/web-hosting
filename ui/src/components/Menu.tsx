import { useState, useEffect } from 'react';
import Tabs from './Tabs';
import { Box, Button, Stack } from '@mui/material';
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
    if (!directory) return;
    let token = '';
    try {
      token = await sendFilesToTheta(directory);
      await uploadSite(token);
      // succeeded
      setDirectory(undefined);
      setDirectoryName('');
      // todo: present success snackbar
      console.log('your site has successfully deployed!');
      console.log(THETA_DATA_URL + '/' + token);
    } catch (err) {
      console.error(err);
      // if first part succeeded but not the second part
      if (token)
        alert(
          `Your site was successfully deployed, but the registration on our site failed. Save this link to view your site:
${THETA_DATA_URL}/${token}`,
        );
    }
  };

  const [sites, setSites] = useState<string[]>([]);
  useEffect(() => {
    if (!account) return;
    getSites().then(setSites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, account]);

  return (
    <>
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
              )}
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
