import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.css']
})
export class TableviewComponent implements OnInit {
  fecha: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el parámetro de consulta 'date' de la URL
    this.route.queryParams.subscribe(params => {
      this.fecha = params['date'];
    });
  }

}
