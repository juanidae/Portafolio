// Obtener elementos del DOM
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const turnOnButton = document.getElementById('turnOn');
const turnOffButton = document.getElementById('turnOff');
const temperatureChartElement = document.getElementById('temperatureChart');

// Datos simulados de sensores (en un escenario real, estos vendrían de tus dispositivos IoT)
let sensorData = {
  temperature: 22, // Temperatura inicial
  humidity: 60     // Humedad inicial
};

// Función para actualizar los datos de los sensores en la página
function updateSensorData() {
  temperatureElement.textContent = sensorData.temperature;
  humidityElement.textContent = sensorData.humidity;
}

// Simulando la actualización de los datos de los sensores (en un caso real, aquí harías la petición al servidor o a la API de IoT)
setInterval(() => {
  // Simulando cambios en los datos de temperatura y humedad
  sensorData.temperature = (Math.random() * 10 + 20).toFixed(1); // Temperatura entre 20°C y 30°C
  sensorData.humidity = (Math.random() * 30 + 50).toFixed(1); // Humedad entre 50% y 80%

  updateSensorData();
  updateTemperatureChart(sensorData.temperature);
}, 3000); // Actualiza cada 3 segundos

// Función para crear el gráfico de temperatura usando Chart.js
let temperatureChart = new Chart(temperatureChartElement, {
  type: 'line',
  data: {
    labels: [], // Las etiquetas (por ejemplo, las fechas o momentos de tiempo)
    datasets: [{
      label: 'Temperatura (°C)',
      data: [], // Los datos de la temperatura que se irán añadiendo
      borderColor: 'rgb(75, 192, 192)',
      fill: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Función para actualizar el gráfico de temperatura
function updateTemperatureChart(newTemperature) {
  const currentTime = new Date().toLocaleTimeString(); // Obtén la hora actual

  // Añadir nueva etiqueta (hora actual) y nuevo valor de temperatura al gráfico
  temperatureChart.data.labels.push(currentTime);
  temperatureChart.data.datasets[0].data.push(newTemperature);

  // Limitar el gráfico a mostrar solo los últimos 10 datos (puedes cambiar esto según tus necesidades)
  if (temperatureChart.data.labels.length > 10) {
    temperatureChart.data.labels.shift();
    temperatureChart.data.datasets[0].data.shift();
  }

  // Actualizar el gráfico
  temperatureChart.update();
}

// Función para manejar el encendido del dispositivo
turnOnButton.addEventListener('click', () => {
  console.log("Dispositivo encendido");
  // Aquí puedes agregar la lógica para encender el dispositivo a través de Node-RED o una API IoT
});

// Función para manejar el apagado del dispositivo
turnOffButton.addEventListener('click', () => {
  console.log("Dispositivo apagado");
  // Aquí puedes agregar la lógica para apagar el dispositivo a través de Node-RED o una API IoT
});
