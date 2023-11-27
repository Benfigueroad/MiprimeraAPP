import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  weatherData: any; 
  latitude: number = 0; 
  longitude: number = 0; 

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.getWeatherData();
    } catch (error) {
      console.error('Error getting current position', error);
    }
  }

  async getWeatherData() {
    try {
      // URL para la API del tiempo de 7Timer
      const apiUrl = `http://www.7timer.info/bin/civillight.php?lon=${this.longitude}&lat=${this.latitude}&ac=0&unit=metric&output=json`;

      // Realizar la petición HTTP para obtener datos meteorológicos
      this.http.get(apiUrl).subscribe((data: any) => {
        this.weatherData = data;
        console.log('Weather data:', this.weatherData);
      });
    } catch (error) {
      console.error('Error getting weather data', error);
    }
  }
}
