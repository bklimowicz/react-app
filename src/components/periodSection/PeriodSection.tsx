import { Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

interface PeriodSectionProps {
    setSleepFrom: (value: Dayjs | null) => void;
    setSleepTo: (value: Dayjs | null) => void;
}

const PeriodSection = ({ setSleepFrom, setSleepTo }: PeriodSectionProps) => {
    return (
        <div className="periodSection-container">
            <Typography variant="h6">Spanko od</Typography>
            <DateTimePicker onChange={setSleepFrom} />
            <Typography variant="h6">Spanko do</Typography>
            <DateTimePicker onChange={setSleepTo} />
        </div>
    );
};

export default PeriodSection;
