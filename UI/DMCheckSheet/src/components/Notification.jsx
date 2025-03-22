const Notification = ({ open, message, severity, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert onClose={onClose} severity={severity} variant="filled">
      {message}
    </Alert>
  </Snackbar>
);

export default Notification;
