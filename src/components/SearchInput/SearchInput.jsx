import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  searchInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: `${theme.spacing(5)}px 0`,
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      maxWidth: 300,
    },
  },
  searchInputActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

function SearchInput({ getSearchTerm, clearSearchTerm }) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setError(true);
    } else {
      getSearchTerm(searchTerm);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    clearSearchTerm();
  };

  return (
    <form
      className={classes.searchInput}
      noValidate
      autoComplete="off"
      onSubmit={(e) => handleSubmit(e)}
    >
      <TextField
        id="searchTerm"
        name="searchTerm"
        label="Search for Cards"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        error={error}
        helperText={error && 'No search term found'}
      />
      <div className={classes.searchInputActions}>
        <Button
          variant="contained"
          color="secondary"
          disabled={!searchTerm}
          onClick={() => handleReset()}
        >
          reset search
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!searchTerm}
          onClick={(e) => handleSubmit(e)}
        >
          search
        </Button>
      </div>
    </form>
  );
}

SearchInput.propTypes = {
  getSearchTerm: PropTypes.func.isRequired,
  clearSearchTerm: PropTypes.func.isRequired,
};

export default SearchInput;
