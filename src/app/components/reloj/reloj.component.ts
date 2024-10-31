import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reloj',
  templateUrl: './reloj.component.html',
  styleUrls: ['./reloj.component.css']
})
export class RelojComponent implements OnInit {
  horaActual: string = '';

  ngOnInit(): void {
    this.actualizarHora();
  }

  actualizarHora(): void {
    setInterval(() => {
      const fecha = new Date();
      this.horaActual = fecha.toLocaleTimeString();
    }, 1000);
  }
}
