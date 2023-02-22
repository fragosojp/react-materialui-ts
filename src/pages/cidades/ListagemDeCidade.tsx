import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const ListagemDeCidade: React.FC = () => {
  return (
    <LayoutBaseDePagina
      titulo="Listagem de cidades"
      barraDeFerramentas={
        <FerramentasDaListagem textoBotaoNovo="Nova" mostrarInputBusca />
      }
    >
      -
    </LayoutBaseDePagina>
  );
};
