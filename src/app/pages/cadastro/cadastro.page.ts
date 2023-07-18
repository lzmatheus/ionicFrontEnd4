import { Component, OnInit, inject } from '@angular/core';
import { FieldValue, Firestore, Timestamp, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  ngOnInit(): void {
   
  }
  constructor() { }

  public dastro = {
    name: '',
    description: '',
    location: '',
    date: '',
    status: '',
    sended: false


  }

  // Injeta Firestore.
  private firestore: Firestore = inject(Firestore);

  // Referência à coleção "cadastro" no Firestore.
   // Se a coleção não existe, será criada.
   cadastroCollection = collection(this.firestore, 'things');

  // Salva contato.
  sendTreco() {

    // Valida preenchimento dos campos.
    if (
      this.dastro.name.length < 3 ||
      this.dastro.description.length < 5 ||
      this.dastro.location.length < 10
    ) return false;

  // Gera a data atual no formado ISO.
  const d = new Date();
  this.dastro.date = d.toISOString().split('.')[0].replace('T', ' ');

 // Salva cadastro no Firestore.
 addDoc(this.cadastroCollection, this.dastro)
 .then((data) => {
   console.log('Contato salvo com Id :' + data.id)
   this.dastro.sended = true;
 })

   

   
 
  return false;

}


Atualizar() {
  this.dastro.sended = false;
  this.dastro.name = '';
  this.dastro.description = '';
  this.dastro.location = '';
  this.dastro.status = '';
  this.dastro.date = 'received';
}

}
