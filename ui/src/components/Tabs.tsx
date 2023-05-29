import { Stack, Button } from '@mui/material';

interface TabsProps {
    setTab: (tab: number) => void;  
    tab: number;  
}

export default function Tabs({setTab, tab}: TabsProps) {
    return(
        <>
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
        </>
    )
}