import { useState, useEffect } from 'react';
import { getPersonalities } from './api.jsx'; // API call functions
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import './App.css';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
}));

export default function Gallery() {
  const [scientistList, setScientistList] = useState([]);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPersonalities(); // Fetch personalities from API
        setScientistList(data);
      } catch (err) {
        setError(err.message); // Handle errors gracefully
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    }
    fetchData();
  }, []);

  const hasNext = index < scientistList.length - 1;

  function handleNextClick() {
    setIndex(hasNext ? index + 1 : 0);
  }

  function handlePreviousClick() {
    setIndex(index === 0 ? scientistList.length - 1 : index - 1);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (loading) return <Typography variant="h5">Loading...</Typography>; // Show loading state
  if (error) return <Typography variant="h5" color="error">Error: {error}</Typography>; // Show error state
  if (scientistList.length === 0) return <Typography variant="h5">No data available</Typography>; // Handle empty data

  const scientist = scientistList[index];

  return (
    <Card variant="outlined" sx={{ margin: 'auto', textAlign: 'center', borderRadius: 10 }} className="card">
      <CardHeader title="SCIENTISTS" subheader="NATHANIEL V. MANANSALA - C-PEITEL3" />
      <CardActions disableSpacing className="button-container">
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handlePreviousClick}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNextClick}>
            Next
          </Button>
        </Stack>
      </CardActions>
      <CardMedia
        component="img"
        sx={{
          padding: '1em 1em 0 1em',
          objectFit: 'cover',
          borderRadius: '10px 10px 0 0',
          maxHeight: '450px', // Ensure consistent sizing
        }}
        image={scientist?.url || 'https://via.placeholder.com/150'} // Fallback for missing image URLs
        alt={scientist?.alt || 'Scientist Image'} // Fallback alt text
      />
      <CardContent className="card-content">
        <Typography variant="h4" gutterBottom>
          {scientist.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {`${index + 1} of ${scientistList.length}`}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ fontSize: 50 }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>{scientist.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
