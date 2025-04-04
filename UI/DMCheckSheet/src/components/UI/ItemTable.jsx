import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Pagination,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, AddBox } from "@mui/icons-material";

// Hàm chuyển đổi dữ liệu thành dạng cây
const buildTree = (data) => {
  const map = {};
  const tree = [];

  data.forEach((item) => {
    map[item.itemId] = { ...item, children: [] };
  });

  data.forEach((item) => {
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item.itemId]);
    } else {
      tree.push(map[item.itemId]);
    }
  });

  return tree;
};

// Hàm flatten dữ liệu dạng cây ra mảng có cấp độ (level)
const flattenTree = (nodes, level = 0) =>
  nodes.flatMap((node) =>
    [{ ...node, level }].concat(flattenTree(node.children, level + 1))
  );

// Component chính
const TreeTable = ({ items = [], onEdit = () => {}, onDelete = () => {} }) => {
  const [treeData, setTreeData] = useState([]);
  const [flatRows, setFlatRows] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  // Build tree & flatten khi items thay đổi
  useEffect(() => {
    const tree = buildTree(items);
    setTreeData(tree);
    setFlatRows(flattenTree(tree));
  }, [items]);

  // Lọc dữ liệu theo tìm kiếm
  const filteredRows = flatRows.filter((row) =>
    `${row.sheetCode} ${row.sheetName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Sự kiện phân trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1); // Pagination bắt đầu từ 1
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      {/* Thanh tìm kiếm + chọn số dòng */}
      <Box className="flex justify-between flex-wrap gap-2 my-5">
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <TextField
          label="Số dòng/trang"
          select
          size="small"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          sx={{ width: 150 }}
        >
          {[5, 10, 20, 50].map((option) => (
            <MenuItem key={option} value={option}>
              {option} dòng
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Bảng dữ liệu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Mã Check Sheet</TableCell>
              <TableCell>ND Check Sheet</TableCell>
              <TableCell>Form NO</TableCell>
              <TableCell>Kiểu dữ liệu</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Item ID</TableCell>
              <TableCell>Parent ID</TableCell>
              <TableCell>Thứ tự</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((node) => (
              <TableRow key={node.itemId}>
                <TableCell sx={{ paddingLeft: `${node.level * 20}px` }}>
                  {node.sheetCode}
                </TableCell>
                <TableCell>{node.sheetName}</TableCell>
                <TableCell>{node.formNO}</TableCell>
                <TableCell>{node.dataType}</TableCell>
                <TableCell>{node.content}</TableCell>
                <TableCell>{node.itemId}</TableCell>
                <TableCell>{node.parentId}</TableCell>
                <TableCell>{node.orderNumber}</TableCell>
                <TableCell className="w-40">
                  <IconButton color="primary" onClick={() => onEdit(node)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(node)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="success">
                    <AddBox />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang số */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default TreeTable;
