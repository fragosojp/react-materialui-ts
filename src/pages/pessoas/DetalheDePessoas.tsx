import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasService";

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      PessoasServices.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          console.log(result);
        }
      });
    }
  }, [id]);
  const handleSave = () => {
    console.log("Save");
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      PessoasServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registra apagado com sucesso!");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id == "nova" ? "Nova pessoas" : `Editar: ${nome}`}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoclicarEmSalvar={() => handleSave()}
          aoclicarEmSalvarEFechar={() => handleSave()}
          aoclicarEmApagar={() => handleDelete(Number(id))}
          aoclicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoclicarEmVoltar={() => navigate("/pessoas")}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}
      <p>Teste {id}</p>
    </LayoutBaseDePagina>
  );
};
