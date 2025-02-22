import { Button } from "@mui/material";

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton = ({ onClick }: SaveButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="small"
      onClick={onClick}
      sx={{ height: "100%", width: "100%" }}
    >
      Save
    </Button>
  );
};

export default SaveButton;
