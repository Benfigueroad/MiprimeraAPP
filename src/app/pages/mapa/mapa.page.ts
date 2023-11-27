import * as L from 'leaflet';

const createMap = (latitude: number, longitude: number) => {
  // Crea un mapa en el contenedor 'map'
  const map = L.map('map').setView([latitude, longitude], 13);

  // Utiliza el proveedor de mapas de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  return map;
};

const addMarkerToMap = (map: L.Map, latitude: number, longitude: number) => {
  // Crea un marcador en la posición actual
  L.marker([latitude, longitude]).addTo(map);
};

const printCurrentPosition = async () => {
  try {
    navigator.geolocation.getCurrentPosition(
      (coordinates) => {
        const { latitude, longitude } = coordinates.coords;

        const map = createMap(latitude, longitude);
        addMarkerToMap(map, latitude, longitude);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error('Permiso denegado para obtener la ubicación.');
            break;
          case error.POSITION_UNAVAILABLE:
            console.error('Información de ubicación no disponible.');
            break;
          case error.TIMEOUT:
            console.error('Tiempo de espera agotado al obtener la ubicación.');
            break;
          default:
            console.error('Error al obtener la ubicación:', error.message);
        }
      }
    );
  } catch (error) {
    console.error('Error general al obtener la ubicación:', error);
  }
};

// Llama a la función para imprimir la posición actual
printCurrentPosition();
