import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { MdLock } from 'react-icons/md';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Feedback from '../components/Feedback';

import { handleLogin, validateEmail } from '../utils/auth';

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
  backdrop: {
    zIndex: 100,
  },
}));

const INITIAL_USER = {
  email: '',
  password: '',
};

const INITIAL_HELPER_TEXT = {
  email: '',
  password: '',
};

const INITIAL_FEEDBACK = {
  message: '',
  type: 'info',
  open: false,
};

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState(INITIAL_USER);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formError, setFormError] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  const [formHelperText, setFormHelperText] = useState(INITIAL_HELPER_TEXT);

  useEffect(() => {
    setFormError(false);
    const enteredUserCredentials = Object.values(user).every((elem) => Boolean(elem));
    return enteredUserCredentials ? setDisabled(false) : setDisabled(true);
  }, [user]);

  useEffect(() => {
    if (redirectUser) {
      history.push('/');
    }
    // eslint-disable react-hooks/exhaustive-deps
  }, [redirectUser]);

  const handleFeedback = (type, message) => {
    setFeedback({
      message,
      type,
      open: true,
    });
  };

  const closeFeedback = () => {
    setFeedback({
      ...feedback,
      open: false,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const validEmail = validateEmail(user.email);
    if (!validEmail) {
      setFormError(true);
      setFormHelperText({
        ...formHelperText,
        email: 'Invalid e-mail',
      });
    } else {
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
        if (!error.response) {
          handleFeedback('error', 'There is a Network Error, please try again later');
        } else {
          handleFeedback('error', error.response.data);
        }
      } finally {
        setDisabled(false);
        setLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <Container maxWidth="xl" classes={{ root: classes.container }}>
        <Grid container direction="column" justify="center" alignItems="center">
          <div className={classes.iconContainer}>
            <MdLock className={classes.icon} />
          </div>
          <Typography variant="h4" className={classes.pageTitle}>
            User Login
          </Typography>
          <form className={classes.loginForm} onSubmit={handleFormSubmit} noValidate>
            <TextField
              required
              className={classes.textInput}
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={user.email}
              onChange={handleFormChange}
              error={formError}
              helperText={formError && formHelperText.email}
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
              onChange={handleFormChange}
              error={formError}
              helperText={formError && formHelperText.password}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={disabled || formError}
            >
              Login
            </Button>
          </form>
          <Link href="/create">Don&apos;t have an account? Let&apos;s create one!</Link>
        </Grid>
      </Container>
      <Backdrop className={classes.backdrop} open={loading} color="secondary">
        <CircularProgress color="inherit" />
      </Backdrop>
      <Feedback
        message={feedback.message}
        showFeedback={feedback.open}
        closeFeedback={closeFeedback}
        type={feedback.type}
      />
    </Fragment>
  );
}

export default Login;
