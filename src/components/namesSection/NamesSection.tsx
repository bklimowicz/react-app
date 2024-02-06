import { Button, TextField, Typography } from '@mui/material';

interface NamesSectionProps {
    names: string[];
    setNames: (value: string[]) => void;
}

const NamesSection = ({ names, setNames }: NamesSectionProps) => {
    const handleAddName = () => {
        const currentNames = [...names];
        currentNames.push('Imię');
        setNames(currentNames);
    };

    const handleChangeName = (index: number, value: string) => {
        const currentNames = [...names];
        currentNames[index] = value;
        setNames(currentNames);
    };
    return (
        <>
            <Typography variant="h6">Śpiochy</Typography>
            {names.map((name, i) => (
                <TextField
                    key={i}
                    placeholder={name}
                    onChange={(e) => handleChangeName(i, e.target.value)}
                />
            ))}
            <Button onClick={() => handleAddName()}>Dodaj śpiocha</Button>
        </>
    );
};

export default NamesSection;
