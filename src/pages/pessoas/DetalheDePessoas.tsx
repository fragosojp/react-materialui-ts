import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasService";

interface IformData {
  email: string;
  nomeCompleto: string;
  cidadeId: number;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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
          formRef.current?.setData(result);
        }
      });
    }
  }, [id]);
  const handleSave = (dados: IformData) => {
    setIsLoading(true);

    if (id === "nova") {
      PessoasServices.create(dados).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      PessoasServices.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          }
        }
      );
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      PessoasServices.deleteById(id).then((result) => {
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
      titulo={id == "nova" ? "Nova pessoas" : `Editar: ${nome}`}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoclicarEmSalvar={() => formRef.current?.submitForm()}
          aoclicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoclicarEmApagar={() => handleDelete(Number(id))}
          aoclicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoclicarEmVoltar={() => navigate("/pessoas")}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder="Nome Completo" name="nomeCompleto" />
        <VTextField placeholder="Email" name="email" />
        <VTextField placeholder="Cidade Id" name="cidadeId" />
      </Form>
    </LayoutBaseDePagina>
  );
};
