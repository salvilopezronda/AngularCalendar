import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { addHours, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { Tarea } from './model/tarea.model';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider'

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{

  title = 'angularCalendar';
  listaTareas: Tarea[] = [
    new Tarea({
      id: 1,
      titulo: 'Hacer la compra',
      descripcion: 'Comprar los ingredientes para cocinar la cena',
      estado: 1,
      tipologia: 1,
      fecha:  addHours(startOfDay(new Date()), 1),
    }),
    new Tarea({
      id: 2,
      titulo: 'Limpiar el garaje',
      descripcion: 'Ordenar y limpiar el garaje',
      estado: 2,
      tipologia: 2,
      fecha:  addHours(startOfDay(new Date()), 5),
    }),
    new Tarea({
      id: 3,
      titulo: 'Hacer ejercicio',
      descripcion: 'Ir al gimnasio y hacer una rutina de ejercicios',
      estado: 3,
      tipologia: 3,
      fecha:  addHours(startOfDay(new Date()), 5),
    }),
    new Tarea({
      id: 4,
      titulo: 'Estudiar para el examen',
      descripcion: 'Repasar los apuntes y hacer ejercicios prácticos',
      estado: 3,
      tipologia: 4,
      fecha:  addHours(startOfDay(new Date()), 5),
    }),
    new Tarea({
      id: 5,
      titulo: 'Enviar el informe',
      descripcion: 'Enviar el informe mensual al supervisor',
      estado: 1,
      tipologia: 1,
      fecha:  addHours(startOfDay(new Date()), 5),
    }),
    new Tarea({
      id: 6,
      titulo: 'Llamar al médico',
      descripcion: 'Hacer una cita para el chequeo anual',
      estado: 2,
      tipologia: 2,
      fecha:  addHours(startOfDay(new Date()), 5),
    }),
    new Tarea({
      id: 7,
      titulo: 'Revisar el correo electrónico',
      descripcion: 'Responder a los correos importantes',
      estado: 3,
      tipologia: 3,
      fecha:  new Date(),
    }),
    // Agrega las tareas restantes aquí...
  ];

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [ ];
  activeDayIsOpen: boolean;










  ngOnInit(): void {
    this.listaTareas.forEach((tarea) => {
      this.events.push(this.mapTareaToEvent(tarea));
    });
  }









  mapTareaToEvent(tarea: Tarea): any {
    const objeto = {
      title: tarea.titulo + " \n " + tarea.descripcion,
      start: tarea.fecha,
      description: tarea.descripcion, // Agrega la descripción al objeto de propiedades extendidas
      backgroundColor: this.getColorCaja(tarea.estado),
      color: this.getColorTitulo(tarea.tipologia), // Agrega la clase CSS personalizada
    };
    return objeto;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  getColorCaja(estado: any): string {
    // Lógica para determinar el color en función del estado
    if (estado === 2) {
      return '#ABEBC6'; // Cambiar al color deseado
    } else if (estado === 1) {
      return '#F8C471'; // Cambiar al color deseado
    } else if (estado === 3) {
      return '#EC7063'; // Cambiar al color deseado
    } else {
      return 'transparent'; // Cambiar al color deseado por defecto
    }
  }

  getColorTitulo(tipologia: any): string {
    // Lógica para determinar el color en función del estado
    if (tipologia === 1) {
      return '#000000'; // Cambiar al color deseado
    } else if (tipologia === 2) {
      return '#0000FF'; // Cambiar al color deseado
    } else if (tipologia === 3) {
      return '#1E8449'; // Cambiar al color deseado
    } else if (tipologia === 4) {
      return '#7D3C98'; // Cambiar al color deseado
    } else {
      return 'transparent'; // Cambiar al color deseado por defecto
    }
  }
}

