import { Typography, Grid } from '@mui/material';

interface IPageHeader {
    title: string;
}

function PageHeader({title}: IPageHeader) {

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
            {title}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
