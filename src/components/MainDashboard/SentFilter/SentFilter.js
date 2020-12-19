import { Checkbox, FormControl, Input, InputLabel, ListItemText, makeStyles, MenuItem, Select } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const names = [
    'Quick reply',
    'No reply',
    'Schedule Date',
    'Group 1',
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const SentFilter = () => {
    
    const classes = useStyles();

    const [tagName, setTagName] = React.useState([]);

    const handleChange = (event) => {
        setTagName(event.target.value);
    };
    return (
        <div>
            <FormControl className={classes.formControl} >
                <InputLabel id="demo-mutiple-checkbox-label" style={{ color: '#fff' }}>Tag</InputLabel>
                <Select
                    style={{ color: '#fff', width: '100%' }}
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={tagName}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name} >
                            <Checkbox checked={tagName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                            <ListItemText primary="(10)" />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SentFilter;