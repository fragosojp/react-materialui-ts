import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas: React.FC = () => {
  //Hooks
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  //Consultar no BackEnd
  useEffect(() => {
    PessoasServices.getAll(1, busca).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result.data[0].nomeCompleto);
      }
    });
  }, [busca]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Nova"
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
        />
      }
    >
      -
    </LayoutBaseDePagina>
  );
};
