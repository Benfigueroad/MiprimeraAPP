import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {

  private adopcionesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public adopciones$ = this.adopcionesSubject.asObservable();
  public database: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {
    this.initDatabase();
  }

  private async initDatabase() {
    try {
      this.database = await this.sqlite.create({
        name: 'basedatos.db',
        location: 'default'
      });

      await this.createTables();
    } catch (error) {
      console.error('Error initializing database', error);
    }
  }

  async createTables() {
    if (!this.database) {
      console.error('No se ha inicializado la base de datos.');
      return;
    }

    const createAdopcionTableQuery = `
      CREATE TABLE IF NOT EXISTS adopciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50) NOT NULL,
        raza VARCHAR(50) NOT NULL,
        imagen TEXT,
        descripcion TEXT NOT NULL
      )
    `;

    try {
      await this.database.executeSql(createAdopcionTableQuery, []);
      console.log('Tabla de adopciones creada correctamente.');
    } catch (error) {
      console.error('Error al crear la tabla de adopciones', error);
    }
  }


  async guardarAdopcion(adopcion: any) {
    if (!this.database) {
      console.error('No se ha inicializado la base de datos.');
      return;
    }
  
    const insertQuery = `
      INSERT INTO adopciones (nombre, raza, imagen, descripcion)
      VALUES (?, ?, ?, ?)
    `;
  
    try {
      await this.database.executeSql(insertQuery, [
        adopcion.nombre,
        adopcion.raza,
        adopcion.imagen,
        adopcion.descripcion
      ]);
      console.log('Adopción guardada correctamente.');
  
      // Después de guardar, obtén las adopciones actualizadas
      const adopcionesActualizadas = await this.obtenerAdopciones();
  
      // Actualizar el BehaviorSubject con la nueva lista
      this.adopcionesSubject.next(adopcionesActualizadas);
    } catch (error) {
      console.error('Error al guardar adopción', error);
    }
  }
  

  async obtenerAdopciones(): Promise < any[] > {
  if(!this.database) {
  console.error('No se ha inicializado la base de datos.');
  return [];
}

const query = `SELECT * FROM adopciones`;

try {
  const result = await this.database.executeSql(query, []);
  const adopciones = [];

  for (let i = 0; i < result.rows.length; i++) {
    adopciones.push(result.rows.item(i));
  }

  // Actualizar el BehaviorSubject con la nueva lista
  this.adopcionesSubject.next(adopciones);

  return adopciones;
} catch (error) {
  console.error('Error al obtener adopciones', error);
  return [];
}
  }
}
