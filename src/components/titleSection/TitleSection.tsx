import { Typography } from '@mui/material';

interface TitleSectionProps {
    title: string;
}

const TitleSection = ({ title }: TitleSectionProps) => {
    return <Typography variant="h3">{title}</Typography>;
};

export default TitleSection;
