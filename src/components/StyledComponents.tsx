import styled from "@emotion/styled";

export const TableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const TableHeader = styled.th`
  background: #f5f5f5;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
`;

export const TableCell = styled.td<{ isEdited?: boolean }>`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  background: ${({ isEdited }) => (isEdited ? "#fff9c4" : "inherit")};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
