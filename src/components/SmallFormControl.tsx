import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

export interface SmallForm {
    label: string;
    selectedValue: string;
    onChange: (e: SelectChangeEvent) => void;
    options: { name?: string, value: string }[];
}

export default function SmallFormControl({ label, selectedValue, onChange, options }: SmallForm) {
    return (
        <FormControl sx={{ mt: .5, minWidth: 20 }}>
            <InputLabel >{label}</InputLabel>
            <Select
                label={label}
                value={selectedValue}
                size='small'
                onChange={onChange}>
                {options.map((option) => (
                    <MenuItem key={option?.value} value={option?.value}>
                        {option?.name || option?.value}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    )
}
