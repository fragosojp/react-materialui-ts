import { Box, Paper, useTheme, Icon, Button, Divider } from "@mui/material";

export const FerramentasDeDetalhe: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      <Button
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<Icon>save</Icon>}
      >
        Salvar
      </Button>

      <Button
        variant="outlined"
        color="primary"
        disableElevation
        endIcon={<Icon>save</Icon>}
      >
        Salvar e Voltar
      </Button>

      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>delete</Icon>}
      >
        Apagar
      </Button>

      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>add</Icon>}
      >
        Novo
      </Button>

      <Divider variant="middle" orientation="vertical" />

      <Button
        variant="outlined"
        color="primary"
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
      >
        voltar
      </Button>
    </Box>
  );
};
