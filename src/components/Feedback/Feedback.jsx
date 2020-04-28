import React from 'react';
import PropTypes from 'prop-types';

import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Feedback({ message, showFeedback, closeFeedback, type }) {
  return (
    <Snackbar open={showFeedback} autoHideDuration={8000} onClose={() => closeFeedback()}>
      <MuiAlert severity={type} elevation={6} variant="filled" onClose={() => closeFeedback()}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

Feedback.propTypes = {
  message: PropTypes.string.isRequired,
  showFeedback: PropTypes.bool.isRequired,
  closeFeedback: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

export default Feedback;
