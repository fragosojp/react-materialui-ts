import React, { useEffect, useState } from "react";

import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField, Vform, useVForm, IVFormErrors } from "../../shared/forms";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";

interface IformData {
  nome: string;
}

const formValidationSchema: yup.ObjectSchema<IformData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetalheDeCidades: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, IsSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      CidadesService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          setNome(result.nome);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: "",
      });
    }
  }, [id]);

  const handleSave = (dados: IformData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === "nova") {
          CidadesService.create(dadosValidados).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (IsSaveAndClose()) {
                navigate("/cidades");
              } else {
                navigate(`/cidades/detalhe/${result}`);
              }
            }
          });
        } else {
          CidadesService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (IsSaveAndClose()) {
                navigate("/cidades");
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registrado apagado com sucesso!");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id == "nova" ? "Nova cidades" : `Editar: ${nome}`}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoclicarEmSalvar={save}
          aoclicarEmSalvarEFechar={saveAndClose}
          aoclicarEmVoltar={() => navigate("/cidades")}
          aoclicarEmApagar={() => handleDelete(Number(id))}
          aoclicarEmNovo={() => navigate("/cidades/detalhe/nova")}
        />
      }
    >
      <Vform ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="nome"
                  label="Nome"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Vform>
    </LayoutBaseDePagina>
  );
};
