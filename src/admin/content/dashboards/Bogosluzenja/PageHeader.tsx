import { Typography, Grid } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

function PageHeader() {
  // const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        {/*<Avatar*/}
        {/*  sx={{*/}
        {/*    mr: 2,*/}
        {/*    width: theme.spacing(8),*/}
        {/*    height: theme.spacing(8)*/}
        {/*  }}*/}
        {/*  variant="rounded"*/}
        {/*  alt={user.name}*/}
        {/*  src={user.avatar}*/}
        {/*/>*/}
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Поставите распоред богослужења за текућу недељу.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
