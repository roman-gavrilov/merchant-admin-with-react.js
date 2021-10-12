import React, {ChangeEvent, useEffect, useState} from "react";
import "./Outstanding.css";

import clsx from "clsx";
import {
    createStyles,
    lighten,
    makeStyles,
    Theme,
} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from '@material-ui/core/Menu';

import axios from "axios";
import { getInvoice } from "../../service/invoices";
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from "react-router-dom"
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone';
import {Link} from "react-router-dom";

interface Data {
    id: number;
    name: string;
    title: string;
    status: string;
}

function createData(
    id: number,
    name: string,
    title: string,
    status: string
): Data {
    return { id, name, title, status };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: "id", numeric: false, disablePadding: true, label: "id" },
    {
        id: "name",
        numeric: true,
        disablePadding: false,
        label: "Name",
    },
    { id: "title", numeric: true, disablePadding: false, label: "title" },
    { id: "status", numeric: true, disablePadding: false, label: "status" }
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <>
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? "right" : "left"}
                            padding={headCell.disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    </>
                ))}


                <TableCell
                    align={"right"}
                >
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === "light"
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(
                        theme.palette.secondary.light,
                        0.85
                    ),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: "1 1 100%",
        },
    })
);

interface EnhancedTableToolbarProps {
    numSelected: number;
    onClick: (e: React.MouseEvent<unknown>) => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h5"
                    id="tableTitle"
                    component="div"
                >
                    Outstanding
                </Typography>

            )}

            <Tooltip title="Open New Ticket">
                <Link to='open-ticket'>
                    <IconButton aria-label="filter list">
                        <AddTwoToneIcon />
                    </IconButton>
                </Link>
            </Tooltip>
            <Tooltip title="Export selected">
                <IconButton aria-label="filter list">
                    <ExpandLessTwoToneIcon />
                </IconButton>
            </Tooltip>

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={props.onClick}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}

        </Toolbar>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        paper: {
            width: "100%",
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: "rect(0 0 0 0)",
            height: 1,
            margin: -1,
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            top: 20,
            width: 1,
        },
    })
);

export default function AllInvoices() {
    let history = useHistory();
    const classes = useStyles();
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof Data>("name");
    const [selected, setSelected] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<Data[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0)
    const [select, setSelect] = useState(null)
    const [totalElement, setTotalElement] = useState(0)

    const apiUrl = "http://185.185.126.15:8080/api/management/invoices/delete"

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event: any, id: any) => {
        setAnchorEl(event.currentTarget)
        setSelect(id)
    };
    const handleClose = (id: any) => {
        setAnchorEl(null)
        setSelect(null)
        if (id) {
            deleteRow(id)
        }

    };

    const moveProfile = (id: any) => {
        setAnchorEl(null)
        setSelect(null)
        if (id) {
            history.push(`/profile?ids=${id}`)
        }

    };

    const intial = (page: number, rowsPerPage: number) => {
        getInvoice(page, rowsPerPage)
            .then((resp) => {
                setLoading(false)
                setTotal(resp.data.totalPages)
                setRows(resp.data.content)
                setTotalElement(resp.data.totalElements)
            })
            .catch((error) => {
                setLoading(false)
                console.error(error);
            });
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            intial(page, rowsPerPage)
        }

        getData();
    }, [page, rowsPerPage]);

    const deleteRow = (id: any) => {
        axios.delete(apiUrl + '?ids=' + id).then(result => {
            intial(page, rowsPerPage)
            setSelected([])
        })
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        // setPage(0);
    }

    const handleDeleteClick = async () => {
        // npm install qs
        var qs = require("qs");

        const response = await axios.delete(apiUrl, {
            params: {
                ids: selected,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params);
            },
        });

        if (response.status === 204 || response.status === 200) {
            intial(page, rowsPerPage)
            setSelected([])
        }
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onClick={handleDeleteClick}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {loading ? (
                                <div className="spinerr">
                                    <CircularProgress />
                                </div>
                            ) : null}
                            {stableSort(rows, getComparator(order, orderBy))
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <>
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemSelected}
                                                aria-controls="basic-menu"
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        onClick={(event) =>
                                                            handleClick(row.id)
                                                        }
                                                        inputProps={{
                                                            "aria-labelledby":
                                                            labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.title}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.status}
                                                </TableCell>
                                                <TableCell align="right" >
                                                    <IconButton
                                                        aria-label="more"
                                                        id="long-button"
                                                        aria-controls="long-menu"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        aria-haspopup="true"
                                                        onClick={(e) => handleMenuClick(e, row.id)}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={select == row.id && open ? true : false}
                                                        onClose={() => handleClose(null)}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={() => moveProfile(row.id)}>View Profile</MenuItem>
                                                        <MenuItem onClick={() => handleClose(row.id)}>Delete</MenuItem>

                                                    </Menu>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}

                            {rows.length === 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {totalElement > 0 && (
                    <div className="total-element">
                        {totalElement}
                    </div>
                )}
            </Paper>
        </div>
    );
}
