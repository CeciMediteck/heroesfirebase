import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs';

export interface Item { nombre: string; url: string; }

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {
  items: Observable<Item[]>;
  private itemsCollection: AngularFirestoreCollection<Item>;
  
  loading: boolean = true; //indica si esta cargando o no

  constructor( private afs: AngularFirestore ) {
    this.itemsCollection = afs.collection<Item>('img'); 
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
  }

}

