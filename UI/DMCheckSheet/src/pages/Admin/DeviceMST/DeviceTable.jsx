const DeviceTable = ({ devices, onEdit, onDelete }) => (
  <TableContainer component={Paper} className="mt-4">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>STT</TableCell>
          <TableCell>Số Form</TableCell>
          <TableCell>Mã thiết bị</TableCell>
          <TableCell>Tên Thiết Bị</TableCell>
          <TableCell>Loại</TableCell>
          <TableCell>Tần suất</TableCell>
          <TableCell>Vị trí</TableCell>
          <TableCell>Hành động</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {devices.map((device, index) => (
          <TableRow key={device.deviceId}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{device.formNO}</TableCell>
            <TableCell>{device.deviceCode}</TableCell>
            <TableCell>{device.deviceName}</TableCell>
            <TableCell>{device.typeName}</TableCell>
            <TableCell>{device.frequency}</TableCell>
            <TableCell>{device.location}</TableCell>
            <TableCell>
              <IconButton color="primary" onClick={() => onEdit(device)}>
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => onDelete(device.deviceId)}
              >
                <Delete />
              </IconButton>
              <IconButton color="info">
                <Info />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DeviceTable;
