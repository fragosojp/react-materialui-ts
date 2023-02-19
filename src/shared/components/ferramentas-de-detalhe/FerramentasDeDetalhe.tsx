import {
  Box,
  Paper,
  useTheme,
  Icon,
  Button,
  Divider,
  Skeleton,
  Typography,
  useMediaQuery,
  Theme,
  ButtonGroup,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React from "react";
interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;
  mostrarGroupoBotao?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;
  mostrarGroupoBotaoCarregado?: boolean;

  aoclicarEmNovo?: () => void;
  aoclicarEmVoltar?: () => void;
  aoclicarEmApagar?: () => void;
  aoclicarEmSalvar?: () => void;
  aoclicarEmSalvarEFechar?: () => void;
  aoClicarEmGroupoBotao?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,
  mostrarGroupoBotao = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,
  mostrarGroupoBotaoCarregado = false,

  aoclicarEmNovo,
  aoclicarEmVoltar,
  aoclicarEmApagar,
  aoclicarEmSalvar,
  aoclicarEmSalvarEFechar,
  aoClicarEmGroupoBotao,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const theme = useTheme();

  const opcoesGrupoBotoes = [
    { label: "Salvar", icon: "save" },
    { label: "Salvar e Voltar", icon: "save" },
    { label: "Apagar", icon: "delete" },
    { label: "Novo", icon: "add" },
    { label: "Voltar", icon: "arrow_back" },
  ];

  const [abrir, setAbrir] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, aoSelecionar] = React.useState(0);

  const handleClick = () => {
    console.info(`Você Clicou em: ${opcoesGrupoBotoes[selectedIndex].label}`);
  };

  const aoClicarItemDoMenu = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    aoSelecionar(index);
    setAbrir(false);
  };

  const handleToggle = () => {
    setAbrir((oldAbrir) => !oldAbrir);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setAbrir(false);
  };

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
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && !smDown && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={aoclicarEmSalvar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}

      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoSalvarEFechar &&
        !mostrarBotaoSalvarEFecharCarregando &&
        !smDown &&
        !mdDown && (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            onClick={aoclicarEmSalvarEFechar}
            endIcon={<Icon>save</Icon>}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Salvar e Voltar
            </Typography>
          </Button>
        )}

      {mostrarBotaoSalvarEFecharCarregando && (
        <Skeleton width={180} height={60} />
      )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoclicarEmApagar}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}

      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoclicarEmNovo}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textoBotaoNovo}
          </Typography>
        </Button>
      )}

      {mostrarBotaoNovoCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && !smDown && (
        <Divider variant="middle" orientation="vertical" />
      )}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          onClick={aoclicarEmVoltar}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            voltar
          </Typography>
        </Button>
      )}

      {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={60} />}

      {smDown && (
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button
            onClick={handleClick}
            startIcon={<Icon>{opcoesGrupoBotoes[selectedIndex].icon}</Icon>}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {opcoesGrupoBotoes[selectedIndex].label}
            </Typography>
          </Button>
          <Button
            size="small"
            aria-controls={abrir ? "split-button-menu" : undefined}
            aria-expanded={abrir ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
      )}
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={abrir}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {opcoesGrupoBotoes.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      selected={index === selectedIndex}
                      onClick={(event) => aoClicarItemDoMenu(event, index)}
                    >
                      {<Icon>{option.icon}</Icon>}
                      {""}
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};
