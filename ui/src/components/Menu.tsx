import { useState, useRef, useEffect } from 'react';
import Tabs from './Tabs';
import { Box, Button, Stack } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AccordianTable, { RowData } from './AccordianTable';
import { useTheta } from '../hooks/useTheta';
import { useWeb3Context } from '../contexts/Web3Context';
import { supabase } from '../constants/supabase';
import { THETA_DATA_URL } from '../constants/config';

export default function Menu() {
  const [tab, setTab] = useState(0);
  const [directory, setDirectory] = useState<FileList>();
  const [directoryName, setDirectoryName] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);
  const { account } = useWeb3Context();
  const { sendFilesToTheta } = useTheta();

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute('directory', '');
      ref.current.setAttribute('webkitdirectory', '');
    }
  }, [ref]);

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
    const token = await sendFilesToTheta(directory);
    await uploadSite(token);
    // todo: present success snackbar
    console.log('your site has successfully deployed!');
    console.log(THETA_DATA_URL + '/' + token);
  };

  const uploadSite = async (site_token: string) => {
    if (!account) throw new Error('MetaMask Account not found');
    const { data, error } = await supabase
      .from('sites')
      .insert({ account, site_token });
    if (error) throw new Error('Failed to upload site.');
    return data;
  };

  const getSites = async () => {
    if (!account) throw new Error('MetaMask Account not found');
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('account', account)
      .order('created_at', { ascending: false });
    if (error) throw new Error('Failed to get your sites.');
    return data as RowData[];
  };

  const [sites, setSites] = useState<RowData[]>([]);
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
          msTransform: 'translate(-50%, -50%)',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          minWidth: '300px',
          maxWidth: '100%',
          height: '50%',
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
                    ref={ref}
                    id="input-area"
                    onChange={handleFileInput}
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
