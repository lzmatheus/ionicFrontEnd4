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

  public cadastrin = {
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
      this.cadastrin.name.length < 3 ||
      this.cadastrin.description.length < 5 ||
      this.cadastrin.location.length < 10
    ) return false;

  // Gera a data atual no formado ISO.
  const d = new Date();
  this.cadastrin.date = d.toISOString().split('.')[0].replace('T', ' ');

 // Salva cadastro no Firestore.
 addDoc(this.cadastroCollection, this.cadastrin)
 .then((data) => {
   console.log('Contato salvo com Id :' + data.id)
   this.cadastrin.sended = true;
 })

   

   
 
  return false;

}


Atualizar() {
  this.cadastrin.sended = false;
  this.cadastrin.name = '';
  this.cadastrin.description = '';
  this.cadastrin.location = '';
  this.cadastrin.status = '';
  this.cadastrin.date = 'received';
}

}
