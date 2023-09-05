import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabNavProps, TabPanelProps } from '@/utils/types';


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    value: index
  };
}

export default function TabsNav(props: {data:TabNavProps[], value: number}) {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          {props.data.map(item =>{
        return <Tab key={item.index} label={item.label} {...a11yProps(item.index)}/>
      })}
        </Tabs>
        {props.data.map(item =>{
        return <TabPanel key={item.index} value={value} index={item.index} children={item.children}/>
      })}
      </Box>
    </Box>
  );
}
