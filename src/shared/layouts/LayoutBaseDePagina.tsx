import { Box } from "@mui/system";
import { ReactNode } from "react";
import {
  Typography,
  useTheme,
  IconButton,
  Icon,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
  titulo: string;
  children: ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  titulo,
  children,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();
  const { toggleDrawerOpen } = useDrawerContext();
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        padding={1}
        height={theme.spacing(12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography variant="h5" style={{ color: "#00adb5" }}>
          {titulo}
        </Typography>
      </Box>

      <Box>barra de Ferramentas</Box>

      <Box>{children}</Box>
    </Box>
  );
};
