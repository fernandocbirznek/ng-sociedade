import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { 
  AreaInteresseModel,
  UsuarioModel, 
  UsuarioPerfilModel
} from 'src/app/models';

import { 
  atualizarUsuarioPerfil,
  getAreaInteresseMany 
} from 'src/app/store';

@Component({
  selector: 'app-professor-editar-perfil',
  templateUrl: './professor-editar-perfil.component.html',
  styleUrls: ['./professor-editar-perfil.component.css']
})
export class ProfessorEditarPerfilComponent implements OnInit {

  areaInteresseManySubscription$: Subscription = new Subscription();
  areaInteresseMany$: Observable<AreaInteresseModel[]> = new Observable<AreaInteresseModel[]>();
  areaInteresseMany: AreaInteresseModel[] = [];

  areaInteresseSelecionado: AreaInteresseModel[] = [];

  formPerfil: FormGroup = null as any;

  formData = new FormControl('');
  formFoto = new FormControl('');
  formHobbie = new FormControl('', [Validators.required, Validators.maxLength(200)]);

  selectedFile: File | null = null;

  request: UsuarioPerfilModel = new UsuarioPerfilModel();

  isImagemAlterada: boolean = false;
  fotoEscolhida: File | undefined = undefined;

  constructor(
    public store: Store,
    public dialogRef: MatDialogRef<ProfessorEditarPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioModel,
  ) { }

  ngOnInit(): void {
    this.criarFormularioPerfil();
    this.setupAreaInteresse();
    this.setupAreaInteresseSelecionado();
    this.setupFormulario();
  }

  criarFormularioPerfil() {
    this.formPerfil = new FormGroup({
      formData: this.formData,
      formFoto: this.formFoto,
      formHobbie: this.formHobbie
    })
  }

  setupAreaInteresse() {
    this.areaInteresseMany$ = this.store.select(getAreaInteresseMany);
    this.areaInteresseManySubscription$ = this.areaInteresseMany$.subscribe(itens => {
      this.areaInteresseMany = itens;
    });
  }

  setupFormulario() {
    this.formPerfil.get("formData")!.setValue(this.data.dataNascimento);
    this.formPerfil.get("formHobbie")!.setValue(this.data.hobbie);
    this.setupAreaInteresseSelecionado();
  }

  setupAreaInteresseSelecionado() {
    this.data.usuarioAreaInteresses.forEach(item => {
      this.areaInteresseSelecionado.push(item);
    })
  }

  selecionouAreaInteresse(areaInteresse: AreaInteresseModel, check: any) {
    let areaInteresseSelecionado = this.areaInteresseSelecionado.find(item => item.id == areaInteresse.id);
    if (check.checked && !areaInteresseSelecionado)
      this.areaInteresseSelecionado.push(areaInteresse);
    else {
      this.areaInteresseSelecionado = this.areaInteresseSelecionado.filter(item => item.id != areaInteresse.id);
    }
  }

  imagemAlterada(event: any) {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bytes = e.target.result.split('base64,')[1];
      this.request.foto = bytes;
      this.isImagemAlterada = true;
      this.fotoEscolhida = bytes;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  requestCriarPerfil () {
    this.request.id = this.data.usuarioPerfilId;
    this.request.usuarioId = this.data.id;
    this.request.dataNascimento = this.formData.value;
    this.request.hobbie = this.formHobbie.value;
    if (!this.isImagemAlterada)
      this.request.foto = this.data.foto;
    this.store.dispatch(atualizarUsuarioPerfil({ usuarioPerfil: this.request }));
    this.fecharModal();
  }

  fecharModal() {
    this.dialogRef.close();
  }
}
