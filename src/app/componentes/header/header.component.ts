import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginCriarContaComponent } from '../topicos';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AreaFisicaModel 
} from 'src/app/models';

import { 
  getManyAreaFisica,
  selecionarManyAreaFisica 
} from 'src/app/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  areaFisicaManySubscription$: Subscription = new Subscription();
  areaFisicaMany$: Observable<AreaFisicaModel[]> = new Observable<AreaFisicaModel[]>();
  areaFisicaMany: AreaFisicaModel[] = [];
  
  public imagem: string;
  public resumoTopico: string;
  public tituloTopico: string = "Home";
  public telaInicial: boolean = true;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public store: Store,
  ) { 
    this.imagem = "../../../assets/imagens/header/home.png";
    this.resumoTopico = "Aqui é a página principal, nela temos um resumo sobre a Física," 
                        + "na esquerda temos as últimas postagens...";

    this.store.dispatch(selecionarManyAreaFisica());
  }

  ngOnInit(): void {
    this.setupAreaFisica();
  }

  setupAreaFisica() {
    this.areaFisicaMany$ = this.store.select(getManyAreaFisica);
    this.areaFisicaManySubscription$ = this.areaFisicaMany$.subscribe(itens => {
      this.areaFisicaMany = itens;
    });
  }


  areaSelecionada(areaFisica: AreaFisicaModel) {
    switch(areaFisica.id) {
      case 1:
        this.router.navigate([`cosmologia`]);
        break;
      case 2:
        this.router.navigate(['mecanica'], { queryParams: { areaFisicaId: areaFisica.id }});
        break;
      case 3:
        this.router.navigate([`termodinamica`]);
        break;
      case 4:
        this.router.navigate([`eletromagnetismo`]);
        break;
      case 5:
        this.router.navigate([`fisica-moderna`]);
        break;
      case 6:
        this.router.navigate([`optica`]);
        break;
      case 7:
        this.router.navigate([`mecanica-quantica`]);
        break;
    }
  }

  conta() {
    this.dialog.open(LoginCriarContaComponent, {
      maxHeight: '800px',
      height: 'auto',
    });
  }

  mudaFoto (foto: string)
	{
		switch(foto) {
      case "2":
        this.tituloTopico = "Mecânica";
        this.imagem = "../../../assets/imagens/header/mecanica.png";
        this.resumoTopico = "O que é a velocidade? Podemos prever o movimento dos planetas?" 
                            + " Essas e outras perguntas serão respondidas aqui.";
        break;
      case "3":
        this.tituloTopico = "Termodinâmica";
        this.imagem = "../../../assets/imagens/header/termodinamica.png";
        this.resumoTopico = "Aqui descobriremos o que é o calor, a diferença entre calor" 
                            + " e temperatura e muitos outros conceitos.";
        break;
      case "6":
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
      default:
        this.tituloTopico = "Home";
        this.imagem = "../../../assets/imagens/header/home.png";
        this.resumoTopico = "Aqui é a página principal, nela temos um resumo sobre a Física," 
                            + "na esquerda temos as últimas postagens...";
    }
	}
}