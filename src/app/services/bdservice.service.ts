import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {
  public database: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {
    this.initDatabase();
  }

  async initDatabase() {
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

    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(50) NOT NULL,
        apellido VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `;

    try {
      await this.database.executeSql(createUserTableQuery, []);
      console.log('Tabla de usuarios creada correctamente.');
    } catch (error) {
      console.error('Error al crear la tabla de usuarios', error);
    }
  }

  async insertarUsuario(usuario: any) {
    if (!this.database) {
      console.error('No se ha inicializado la base de datos.');
      return;
    }

    const insertQuery = `
      INSERT INTO usuarios (nombre, apellido, email, password)
      VALUES (?, ?, ?, ?)
    `;

    try {
      const hashedPassword = await bcrypt.hash(usuario.password, 10);
      await this.database.executeSql(insertQuery, [
        usuario.nombre,
        usuario.apellido,
        usuario.email,
        hashedPassword
      ]);
      console.log('Usuario insertado correctamente.');
    } catch (error) {
      console.error('Error al insertar usuario', error);
    }
  }

  async verificarCredenciales(email: string, password: string): Promise<{ authenticated: boolean, user?: any }> {
    if (!this.database) {
      console.error('No se ha inicializado la base de datos.');
      return { authenticated: false };
    }

    const getUserQuery = `
      SELECT * FROM usuarios WHERE email = ?
    `;

    try {
      const result = await this.database.executeSql(getUserQuery, [email]);

      if (result.rows.length > 0) {
        const user = result.rows.item(0);
        const passwordMatch = await bcrypt.compare(password, user.password);
        return { authenticated: passwordMatch, user: passwordMatch ? user : undefined };
      } else {
        return { authenticated: false };
      }
    } catch (error) {
      console.error('Error al verificar credenciales', error);
      return { authenticated: false };
    }
  }
}
