const DeviceFormDialog = ({
  open,
  formData,
  setFormData,
  onSave,
  onClose,
  deviceTypes,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      {formData.deviceId ? "Cập Nhật Thiết Bị" : "Thêm Thiết Bị"}
    </DialogTitle>
    <DialogContent>
      <FormControl fullWidth margin="dense">
        <label>Loại thiết bị</label>
        <Select
          value={formData.typeId}
          onChange={(e) => setFormData({ ...formData, typeId: e.target.value })}
        >
          {deviceTypes.map((type) => (
            <MenuItem key={type.typeId} value={type.typeId}>
              {type.typeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Số Form"
        fullWidth
        margin="dense"
        value={formData.formNO ?? ""}
        onChange={(e) => setFormData({ ...formData, formNO: e.target.value })}
      />
      <TextField
        label="Mã thiết bị"
        fullWidth
        margin="dense"
        value={formData.deviceCode ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, deviceCode: e.target.value })
        }
      />
      <TextField
        label="Tên thiết bị"
        fullWidth
        margin="dense"
        value={formData.deviceName ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, deviceName: e.target.value })
        }
      />
      <TextField
        label="Tần suất"
        fullWidth
        margin="dense"
        value={formData.frequency ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, frequency: e.target.value })
        }
      />
      <TextField
        label="Vị trí"
        fullWidth
        margin="dense"
        value={formData.location ?? ""}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Hủy</Button>
      <Button onClick={onSave} variant="contained">
        Lưu
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeviceFormDialog;
