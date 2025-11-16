// tendencias.js

const TENDENCIAS_API_URL = 'http://127.0.0.1:5000/api/tendencias';
const tendenciasContainer = document.getElementById('tendencias-container');

// Función para crear el elemento de lista de la tendencia
function crearElementoTendencia(tendencia) {
    // Clase para el cambio (verde si es positivo, rojo si es negativo)
    const cambioClase = tendencia.cambio.includes('+') ? 'positivo' : 'negativo';

    return `
        <div class="card tendencia-item">
            <div class="tendencia-header">
                <h2>${tendencia.nombre}</h2>
                <span class="tendencia-cambio ${cambioClase}">${tendencia.cambio}</span>
            </div>
            <p>${tendencia.descripcion}</p>
        </div>
    `;
}

// Función principal para cargar y renderizar las tendencias
async function cargarYRenderizarTendencias() {
    if (!tendenciasContainer) return;

    try {
        const response = await fetch(TENDENCIAS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tendenciasData = await response.json();

        tendenciasContainer.innerHTML = '';
        const htmlElementos = tendenciasData.map(crearElementoTendencia).join('');
        tendenciasContainer.innerHTML = htmlElementos;

    } catch (error) {
        console.error('Error al cargar Tendencias Globales:', error);
        tendenciasContainer.innerHTML = '<p class="error-msg">🚨 Error de conexión. Asegúrate de que el servidor Flask esté corriendo.</p>';
    }
}

document.addEventListener('DOMContentLoaded', cargarYRenderizarTendencias);