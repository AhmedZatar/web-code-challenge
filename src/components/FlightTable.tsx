import { observer } from "mobx-react-lite";

import { flightStore } from "../stores/flightStore";

import { TableData } from "../types/tableTypes";

import {
  TableContainer,
  StyledTable,
  TableHeader,
  TableCell,
  SearchInput,
} from "./StyledComponents";
import { DateCell } from "./DateCell";
import { formatHeaderCase } from "../utils/stringUtils";

const columns: (keyof TableData)[] = [
  "origin",
  "destination",
  "departureDate",
  "returnDate",
  "price",
];
const dateCells = ["departureDate", "returnDate"];

const FlightTable = observer(() => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <TableHeader key={column}>
                {formatHeaderCase(column)}
                <SearchInput
                  placeholder={`Search ${formatHeaderCase(column)}...`}
                  onChange={(e) =>
                    flightStore.debouncedFilter(column, e.target.value)
                  }
                />
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {flightStore.flights.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={`${row.id}-${column}`}
                  isEdited={flightStore.editedCells.has(`${row.id}-${column}`)}
                >
                  {dateCells.includes(column) ? (
                    <DateCell
                      value={row[column]}
                      onChange={(value) =>
                        flightStore.updateFlight(row.id, column, value)
                      }
                    />
                  ) : (
                    <input
                      value={row[column] || ""}
                      onChange={(e) =>
                        flightStore.updateFlight(row.id, column, e.target.value)
                      }
                      style={{
                        border: "none",
                        background: "transparent",
                        width: "100%",
                      }}
                    />
                  )}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
});

export default FlightTable;
