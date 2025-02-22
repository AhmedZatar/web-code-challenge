import { Button } from "@mui/material";

interface SaveButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SaveButton = ({ onClick, disabled = false }: SaveButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      size="small"
      onClick={onClick}
      sx={{ height: 40, width: "100%" }}
      disabled={disabled}
    >
      Save
    </Button>
  );
};

export default SaveButton;
