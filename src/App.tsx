import { Box, Button, Modal, Typography } from '@mui/material';
import './App.css';
import TitleSection from './components/titleSection/TitleSection';
import PeriodSection from './components/periodSection/PeriodSection';
import NamesSection from './components/namesSection/NamesSection';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Warsaw');

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Interval {
    name: string;
    sleepStart: string;
    sleepEnd: string;
}

function App() {
    const [names, setNames] = useState(['Imię']);
    const [sleepFrom, setSleepFrom] = useState<Dayjs | null>(null);
    const [sleepTo, setSleepTo] = useState<Dayjs | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [intervals, setIntervals] = useState<Interval[]>([]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleCalculateSleep = () => {
        if (!sleepFrom || !sleepTo) throw new Error();
        const diff = sleepTo.diff(sleepFrom, 'minutes');
        const intervalLength = diff / names.length;
        const tempIntervals: Interval[] = [];
        names.map((name, i) => {
            tempIntervals.push({
                name,
                sleepStart: dayjs(sleepFrom)
                    .add(i * intervalLength, 'minutes')
                    .toDate()
                    .toTimeString()
                    .split(' ')[0],
                sleepEnd: dayjs(sleepFrom)
                    .add((i + 1) * intervalLength, 'minutes')
                    .toDate()
                    .toTimeString()
                    .split(' ')[0],
            });
        });

        console.log(intervals);
        setIntervals(tempIntervals);
        setOpenModal(true);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="container">
                <TitleSection title="Śpioch app" />
                <br />
                <PeriodSection
                    setSleepFrom={setSleepFrom}
                    setSleepTo={setSleepTo}
                />
                <br />
                <NamesSection names={names} setNames={setNames} />
                <br />
                <Button
                    disabled={names.length < 2 || !sleepFrom || !sleepTo}
                    onClick={handleCalculateSleep}
                >
                    Licz spanko
                </Button>
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {intervals.map((interval, i) => (
                            <Box
                                key={i}
                                component="section"
                                sx={{ p: 2, border: '1px solid grey' }}
                            >
                                <Typography>{`Imię: ${interval.name}`}</Typography>
                                <Typography>{`Śpi: ${interval.sleepStart} - ${interval.sleepEnd}`}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Modal>
            </div>
        </LocalizationProvider>
    );
}

export default App;
