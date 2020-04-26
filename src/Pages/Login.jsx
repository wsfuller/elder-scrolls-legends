import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MdLock } from 'react-icons/md';

import { handleLogin } from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  icon: {
    color: theme.palette.primary.dark,
    fontSize: 64,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '50%',
  },
  pageTitle: {
    marginBottom: theme.spacing(3),
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  textInput: {
    marginBottom: theme.spacing(2),
  },
}));

const INITIAL_USER = {
  email: '',
  password: '',
};

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState(INITIAL_USER);
  const [redirectUser, setRedirectUser] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const isUser = Object.values(user).every((elem) => Boolean(elem));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  useEffect(() => {
    if (redirectUser) {
      history.push('/');
    }
  }, [redirectUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_ESL_API_SERVICE}/api/v1/users/login`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      const redirect = await handleLogin(response.data);
      if (redirect) {
        setRedirectUser(true);
      }
    } catch (error) {
      console.log('errors in the right spot: ', error);
    } finally {
      setLoading(false);
    }
    console.log('user breh: ', user);
  };

  return (
    <Container maxWidth="xl" classes={{ root: classes.container }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <div className={classes.iconContainer}>
          <MdLock className={classes.icon} />
        </div>
        <Typography variant="h4" className={classes.pageTitle}>
          User Login
        </Typography>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <TextField
            required
            className={classes.textInput}
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={user.email}
            onChange={handleChange}
            // error={error}
            // helperText={error && 'Issue with e-mail'}
          />
          <TextField
            required
            className={classes.textInput}
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={user.password}
            onChange={handleChange}

            // error={error}
            // helperText={error && 'No search term found'}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
        <Link href="/create">Don&apos;t have an account? Let&apos;s create one!</Link>
      </Grid>
    </Container>
  );
}

export default Login;
