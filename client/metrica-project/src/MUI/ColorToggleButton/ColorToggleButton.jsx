import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { CategoryContext } from '../../contexts/categoryContext';


export default function ColorToggleButton(props) {

    const data = props.data;
    const [alignment, setAlignment] = React.useState('');
    const { fixOrVar, setFixOrVar } = React.useContext(CategoryContext);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        setFixOrVar(event.target.value);
        console.log(fixOrVar);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            {/* <ToggleButton value="web">Web</ToggleButton>
            <ToggleButton value="android">Android</ToggleButton> */}
            {data.map((val) => (
                <ToggleButton value={val.value}>{val.option}</ToggleButton>
            ))}

        </ToggleButtonGroup>
    );
}
