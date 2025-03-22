const ConfirmDialog = ({ open, title, content, onConfirm, onCancel }) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{content}</DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Hủy</Button>
      <Button color="error" variant="contained" onClick={onConfirm}>
        Xóa
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
