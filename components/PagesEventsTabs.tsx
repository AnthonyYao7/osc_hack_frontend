import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import * as React from "react";

interface PagesEventsTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PagesEventsTabs(props: PagesEventsTabsProps) {
  return (
    <Box sx={{width: '50%'}}>
      <Tabs value={props.value} onChange={props.handleChange}>
        <Tab label="Posts" {...a11yProps(0)} />
        <Tab label="Events" {...a11yProps(1)} />
      </Tabs>
    </Box>
  );
}
