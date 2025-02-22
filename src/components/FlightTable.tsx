import { useState } from "react";
import { observer } from "mobx-react-lite";

import { flightStore } from "../stores/flightStore";

import { TableData } from "../types/tableTypes";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Box,
} from "@mui/material";
import { DateCell } from "./DateCell";

import { formatHeaderCase } from "../utils/stringUtils";

const initialColumns: (keyof TableData)[] = [
  "origin",
  "destination",
  "departureDate",
  "returnDate",
  "price",
];

const dateCells = ["departureDate", "returnDate"];

const FlightTable = observer(() => {
  const [columns, setColumns] = useState<(keyof TableData)[]>(initialColumns);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(result.source.index, 1);
    newColumns.splice(result.destination.index, 0, movedColumn);
    setColumns(newColumns);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Table>
            <Droppable
              droppableId="columns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <TableHead ref={provided.innerRef} {...provided.droppableProps}>
                  <TableRow>
                    {columns.map((column, index) => (
                      <Draggable
                        key={column}
                        draggableId={column}
                        index={index}
                      >
                        {(provided) => (
                          <TableCell
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              fontWeight: "bold",
                              backgroundColor: "background.default",
                              cursor: "grab",
                              userSelect: "none",
                              minWidth: 150,
                            }}
                          >
                            <Box display="flex" alignItems="center">
                              {formatHeaderCase(column)}
                            </Box>

                            <TextField
                              variant="outlined"
                              placeholder={`Search ${formatHeaderCase(column)}...`}
                              size="small"
                              onChange={(e) => {
                                flightStore.debouncedFilter(
                                  column,
                                  e.target.value
                                );

                                if (page) setPage(0);
                              }}
                              sx={{
                                width: "100%",
                                mt: 1,
                              }}
                            />
                          </TableCell>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableRow>
                </TableHead>
              )}
            </Droppable>

            <TableBody>
              {flightStore.flights
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <TableCell
                        key={`${row.id}-${column}`}
                        sx={{
                          backgroundColor: flightStore.editedCells.has(
                            `${row.id}-${column}`
                          )
                            ? "edited.light"
                            : "inherit",
                        }}
                      >
                        {dateCells.includes(column) ? (
                          <DateCell
                            value={row[column]}
                            onChange={(value) =>
                              flightStore.updateFlight(row.id, column, value)
                            }
                          />
                        ) : (
                          <TextField
                            value={row[column] || ""}
                            onChange={(e) =>
                              flightStore.updateFlight(
                                row.id,
                                column,
                                e.target.value
                              )
                            }
                            variant="standard"
                            fullWidth
                          />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DragDropContext>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={flightStore.flights.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
});

export default FlightTable;
