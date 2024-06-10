import { useState, useEffect } from 'react';
import { fetchRoadRepairData } from '../utils/api';
import { Container, Typography, Box, Button, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

export default function Home({ initialData }) {
    const [data, setData] = useState(initialData);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleNext = async () => {
        setPage(prevPage => prevPage + 1);
        setLoading(true);
        setError(null);

        try {
            const newData = await fetchRoadRepairData(page + 1);
            setData(newData);
        } catch (err) {
            setError('Ошибка при загрузке данных.');
        } finally {
            setLoading(false);
        }
    };

    const handlePrev = async () => {
        if (page === 1) return;

        setPage(prevPage => prevPage - 1);
        setLoading(true);
        setError(null);

        try {
            const newData = await fetchRoadRepairData(page - 1);
            setData(newData);
        } catch (err) {
            setError('Ошибка при загрузке данных.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Перечень объектов ремонта дорог
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <List>
                {data.map((item) => (
                    <ListItem key={item.id} divider>
                        <ListItemText 
                            primary={item.naimenkz}
                            secondary={
                                <>
                                    <Typography component="span">{item.naimenru}</Typography><br />
                                    <Typography component="span">Стоимость: {item.cumma}</Typography><br />
                                    <Typography component="span">Регион: {item.raion}</Typography><br />
                                    <Typography component="span">Период: {item.periodreal}</Typography><br />
                                    <Typography component="span">Подрядчик: {item.podradchik}</Typography>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="primary" onClick={handlePrev} disabled={page === 1 || loading}>
                    Предыдущая
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext} disabled={loading}>
                    Следующая
                </Button>
            </Box>
            {loading && <Box display="flex" justifyContent="center" mt={2}><CircularProgress /></Box>}
        </Container>
    );
}

export async function getServerSideProps() {
    try {
        const initialData = await fetchRoadRepairData(1);
        return { props: { initialData } };
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return { props: { initialData: [] } };
    }
}
