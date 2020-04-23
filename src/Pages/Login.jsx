import React from 'react';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: '50%',
  },
  imageContainer: {
    width: '100%',
    maxWidth: 150,
    height: 'auto',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '50%',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  textInput: {
    marginBottom: theme.spacing(2),
  },
}));

function Login() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" classes={{ root: classes.container }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <div className={classes.imageContainer}>
          <img className={classes.image} src="http://placehold.it/150x150" alt="placeholder" />
        </div>
        <form className={classes.loginForm}>
          <TextField
            required
            className={classes.textInput}
            id="email"
            name="email"
            label="Email"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            // error={error}
            // helperText={error && 'No search term found'}
          />
          <TextField
            required
            className={classes.textInput}
            id="password"
            type="password"
            name="password"
            label="Password"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            // error={error}
            // helperText={error && 'No search term found'}
          />
        </form>
        <Link href="/create">Don&apos;t have an account? Let&apos;s create one!</Link>
      </Grid>
    </Container>
  );
}

export default Login;
