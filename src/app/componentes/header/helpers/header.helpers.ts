export class HeaderHelpers {
    static mudaFoto(foto: string): { imagem: string, resumoTopico: string } {
      let imagem = '';
      let resumoTopico = '';
  
      switch (foto) {
        case "2":
          imagem = "../../../assets/imagens/header/mecanica.png";
          resumoTopico = "O que é a velocidade? Podemos prever o movimento dos planetas? Essas e outras perguntas serão respondidas aqui.";
          break;
        case "3":
          imagem = "../../../assets/imagens/header/termodinamica.png";
          resumoTopico = "Aqui descobriremos o que é o calor, a diferença entre calor e temperatura e muitos outros conceitos.";
          break;
        case "6":
          imagem = "../../../assets/imagens/header/ondulatoria.png";
          resumoTopico = "Vamos compreender juntos como o som se propaga e porquê não existe som no espaço.";
          break;
        case "4":
          imagem = "../../../assets/imagens/header/eletromagnetismo.png";
          resumoTopico = "O que é corrente alternada? Encostar em 20 mil volts é seguro? Vamos juntos compreender as leis do eletromagnetismo.";
          break;
        case "5":
          imagem = "../../../assets/imagens/header/fisicamoderna.png";
          resumoTopico = "Podemos viajar mais rápido que a luz? Qual o tamanho do átomo? Nesse tópico vamos movimento relativístico e as pequenas partículas";
          break;
        // case "6":
        //   imagem = "../../../assets/imagens/header/matematica.png";
        //   resumoTopico = "Para descrevermos a natureza precisamos compreender sua linguagem. Essa linguagem é a matemática.";
        //   break;
        case "7":
          imagem = "../../../assets/imagens/header/especiais.png";
          resumoTopico = "Aqui vamos trabalhar alguns tópicos especiais como: história da física, cosmologia, experimentos, etc.";
          break;
        case "8":
          imagem = "../../../assets/imagens/header/vestibular.png";
          resumoTopico = "Se você quer praticar exercícios de vestibular e se preparar para ingressar numa universidade, aqui é o lugar certo.";
          break;
        default:
          imagem = "../../../assets/imagens/header/home.png";
          resumoTopico = "Aqui é a página principal, nela temos um resumo sobre a Física, na esquerda temos as últimas postagens...";
      }
  
      return { imagem, resumoTopico };
    }
  }