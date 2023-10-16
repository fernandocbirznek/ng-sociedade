import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deletarConta, deslogarConta, selecionarManipularConta } from 'src/app/store';
import { ModalExcluirComponent, ToastComponent } from '../../genericos';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  criarConta$: Observable<any>;
  conta: any;

  constructor(
    public store: Store,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    this.criarConta$ = this.store.select(selecionarManipularConta);
    this.criarConta$.subscribe(item => {
      this.conta = item;
    })
  }

  ngOnInit(): void {
  }

  deletarConta() {
    this.dialog.open(ModalExcluirComponent, {
      maxHeight: '800px',
      height: 'auto',
      width: '400px',
      data: {name: "conta"},
    }).afterClosed().subscribe((evento) => {
      if(evento) {
        this.excluirConta();
      }
    });
  }

  deslogarConta() {
    this.store.dispatch(deslogarConta());
    this.snackBar.openFromComponent(ToastComponent, {
      data: "Deslogado com sucesso.",
      duration: 5 * 1000,
      panelClass: 'css-toast'
    });
    this.router.navigate(['']);
  }

  excluirConta() {
    this.store.dispatch(deletarConta({ email: this.conta.login_usuario }));
  }

}
