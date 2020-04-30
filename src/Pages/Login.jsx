import React, { Fragment, useContext, useEffect, useState } from 'react';
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
import { UserContext } from '../Context/UserContext';

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

const INITIAL_USER_CREDENTIALS = {
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
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [redirectUser, setRedirectUser] = useState(false);
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  const [formHelperText, setFormHelperText] = useState(INITIAL_HELPER_TEXT);
  const [userCredentials, setUserCredentials] = useState(INITIAL_USER_CREDENTIALS);

  useEffect(() => {
    setFormError(false);
    const enteredUserCredentials = Object.values(userCredentials).every((elem) => Boolean(elem));
    return enteredUserCredentials ? setFormDisabled(false) : setFormDisabled(true);
  }, [userCredentials]);

  useEffect(() => {
    if (user.isAuthed) {
      history.push('/create');
    } else if (redirectUser && !formDisabled && !loading) {
      history.push('/');
    }
  }, [redirectUser, loading, formDisabled, history, user]);

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
    setUserCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormDisabled(true);
    const validEmail = validateEmail(userCredentials.email);
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
        const payload = { ...userCredentials };
        const response = await axios.post(url, payload);
        const userLogin = await handleLogin(response.data);

        if (userLogin) {
          setUser({ ...userLogin.user, isAuthed: true });
          setRedirectUser(true);
        }
      } catch (error) {
        if (!error.response) {
          handleFeedback('error', 'There is a Network Error, please try again later');
        } else {
          handleFeedback('error', error.response.data);
        }
      } finally {
        setLoading(false);
        setFormDisabled(false);
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
              value={userCredentials.email}
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
              value={userCredentials.password}
              onChange={handleFormChange}
              autoComplete="on"
              error={formError}
              helperText={formError && formHelperText.password}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formDisabled || formError}
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
