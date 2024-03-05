import { Typography, Grid } from '@mui/material';

function PageHeader() {

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Поставите распоред богослужења за текућу недељу.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
