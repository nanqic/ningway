import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';

export interface TabData {
  children?: React.ReactNode;
  index: number;
  value?: number;
  label?: string;
}

export interface TabNavProps {
  data: TabData[]
  onSwitch?: (value: number) => void
}

function TabPanel(data: TabData) {
  const { children, value, index, ...other } = data;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
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
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
    value: index
  };
}

export default function TabsNav({ data, onSwitch }: TabNavProps) {
  const [value, setValue] = useState(data[0]?.value)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (onSwitch) {
      onSwitch(newValue)
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs"
          variant="scrollable" scrollButtons="auto">
          {data.map(item => {
            return <Tab sx={{ minWidth: 40 }} key={item.index} label={item.label} {...a11yProps(item.index)} />
          })}
        </Tabs>
        {data.map(item => {
          return <TabPanel key={item.index} value={value} index={item.index} children={item.children} />
        })}
      </Box>
    </Box>
  );
}
