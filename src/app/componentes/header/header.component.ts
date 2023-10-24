import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../genericos';
import { CriarContaComponent } from '../topicos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public imagem: string;
  public resumoTopico: string;
  public tituloTopico: string = "Home";
  public telaInicial: boolean = true;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.imagem = "../../../assets/imagens/header/home.png";
    this.resumoTopico = "Aqui é a página principal, nela temos um resumo sobre a Física," 
                        + "na esquerda temos as últimas postagens...";
  }

  ngOnInit(): void {}

  mudarCabecalho(cabecalho: boolean) {
    this.telaInicial= cabecalho;
  }

  abrirDialogo() {
    this.dialog.open(CriarContaComponent, {
      maxHeight: '800px',
      height: 'auto',
    }).afterClosed().subscribe((evento) => {
      this.snackBar.openFromComponent(ToastComponent, {
        data: evento,
        duration: 7 * 1000,
        panelClass: 'css-toast'
      });
    });
  }

  mudaFoto (foto: string)
	{
		switch(foto) {
      case "0":
        this.tituloTopico = "Home";
        this.imagem = "../../../assets/imagens/header/home.png";
        this.resumoTopico = "Aqui é a página principal, nela temos um resumo sobre a Física," 
                            + "na esquerda temos as últimas postagens...";
        break;
      case "1":
        this.tituloTopico = "Mecânica";
        this.imagem = "../../../assets/imagens/header/mecanica.png";
        this.resumoTopico = "O que é a velocidade? Podemos prever o movimento dos planetas?" 
                            + " Essas e outras perguntas serão respondidas aqui.";
        break;
      case "2":
        this.tituloTopico = "Termodinâmica";
        this.imagem = "../../../assets/imagens/header/termodinamica.png";
        this.resumoTopico = "Aqui descobriremos o que é o calor, a diferença entre calor" 
                            + " e temperatura e muitos outros conceitos.";
        break;
      case "3":
        this.tituloTopico = "Ondulatória";
        this.imagem = "../../../assets/imagens/header/ondulatoria.png";
        this.resumoTopico = "Vamos compreender juntos como o som se propaga e porquê não existe som no espaço.";
        break;
      case "4":
        this.tituloTopico = "Eletromagnetismo";
        this.imagem = "../../../assets/imagens/header/eletromagnetismo.png";
        this.resumoTopico = "O que é corrente alternada? Encostar em 20 mil volts é seguro?" 
                            + " Vamos juntos compreender as leis do eletromagnetismo.";
        break;
      case "5":
        this.tituloTopico = "Física moderna";
        this.imagem = "../../../assets/imagens/header/fisicamoderna.png";
        this.resumoTopico = "Podemos viajar mais rápido que a luz? Qual o tamanho do átomo?" 
                            + " Nesse tópico vamos movimento relativístico e as pequenas partículas";
        break;
      case "6":
        this.tituloTopico = "Matemática";
        this.imagem = "../../../assets/imagens/header/matematica.png";
        this.resumoTopico = "Para descrevermos a natureza precisamos compreender sua linguagem." 
                            + " Essa linguagem é a matemática.";
        break;
      case "7":
        this.tituloTopico = "Especiais";
        this.imagem = "../../../assets/imagens/header/especiais.png";
        this.resumoTopico = "Aqui vamos trabalhar alguns tópicos especiais como: história da física," 
                            + " cosmologia, experimentos, etc.";
        break;
      case "8":
        this.tituloTopico = "Vestibular";
        this.imagem = "../../../assets/imagens/header/vestibular.png";
        this.resumoTopico = "Se você quer praticar exercícios de vestibular e se preparar para" 
                            + " ingressar numa universidade, aqui é o lugar certo.";
        break;
    }
	}
}
