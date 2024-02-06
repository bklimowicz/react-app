import { DeleteOutlined } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';

interface NamesSectionProps {
    names: string[];
    setNames: (names: string[]) => void;
}

const NamesSection = ({ names, setNames }: NamesSectionProps) => {
    const handleAddName = () => {
        const currentNames = [...names];
        currentNames.push('');
        setNames(currentNames);
    };

    const handleChangeName = (index: number, value: string) => {
        const currentNames = [...names];
        currentNames[index] = value;
        setNames(currentNames);
    };

    const handleDelete = (index: number) => {
        let currentNames = [...names];
        currentNames.splice(index, 1);
        setNames(currentNames);
    };

    return (
        <>
            <Typography variant="h6">Śpiochy</Typography>
            {names.map((_, i) => (
                <div className="name">
                    <TextField
                        key={i}
                        placeholder="imię"
                        onChange={(e) => handleChangeName(i, e.target.value)}
                        value={names[i]}
                    />
                    <DeleteOutlined onClick={() => handleDelete(i)} />
                </div>
            ))}
            <Button onClick={() => handleAddName()}>Dodaj śpiocha</Button>
        </>
    );
};

export default NamesSection;
