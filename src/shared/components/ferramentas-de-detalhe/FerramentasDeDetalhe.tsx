import { Box, Paper, useTheme, Icon, Button, Divider } from "@mui/material";

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  aoclicarEmNovo?: () => void;
  aoclicarEmVoltar?: () => void;
  aoclicarEmApagar?: () => void;
  aoclicarEmSalvar?: () => void;
  aoclicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  aoclicarEmNovo,
  aoclicarEmVoltar,
  aoclicarEmApagar,
  aoclicarEmSalvar,
  aoclicarEmSalvarEFechar,
}) => {
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
      {mostrarBotaoSalvar && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={aoclicarEmNovo}
          startIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>
      )}

      {mostrarBotaoSalvarEFechar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoclicarEmSalvarEFechar}
          endIcon={<Icon>save</Icon>}
        >
          Salvar e Voltar
        </Button>
      )}

      {mostrarBotaoApagar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoclicarEmApagar}
          startIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>
      )}

      {mostrarBotaoNovo && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoclicarEmNovo}
          startIcon={<Icon>add</Icon>}
        >
          {textoBotaoNovo}
        </Button>
      )}

      <Divider variant="middle" orientation="vertical" />

      {mostrarBotaoVoltar && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoclicarEmVoltar}
          startIcon={<Icon>arrow_back</Icon>}
        >
          voltar
        </Button>
      )}
    </Box>
  );
};
