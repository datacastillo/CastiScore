// analisis.js

const PREDICCIONES_API_URL = 'http://127.0.0.1:5000/api/predicciones';
const analisisContainer = document.getElementById('analisis-detalle-container');

// Función para crear la vista detallada de un partido
function crearVistaDetallada(prediccion) {
    const evClase = prediccion.valor_esperado > 0 ? 'positivo' : 'negativo';
    
    return `
        <div class="card detalle-item">
            <div class="detalle-header">
                <h2>${prediccion.equipos}</h2>
                <span class="detalle-liga">${prediccion.liga} | ${prediccion.fecha}</span>
            </div>

            <div class="detalle-grid">
                <div class="metrica-bloque">
                    <span class="label">Pronóstico Base</span>
                    <strong>${prediccion.pronostico_base}</strong>
                </div>
                <div class="metrica-bloque">
                    <span class="label">Relevancia</span>
                    <strong>${prediccion.relevancia}</strong>
                </div>

                <div class="metrica-bloque">
                    <span class="label">Cuota (Odd)</span>
                    <strong>${prediccion.cuota}</strong>
                </div>
                <div class="metrica-bloque">
                    <span class="label">Probabilidad del Modelo</span>
                    <strong>${(prediccion.probabilidad_modelo * 100).toFixed(2)}%</strong>
                </div>
                <div class="metrica-bloque ev-score ${evClase}">
                    <span class="label">VALOR ESPERADO (EV)</span>
                    <strong>${prediccion.valor_esperado.toFixed(3)}</strong>
                </div>
            </div>
            <span class="detalle-estado status ${prediccion.status}">${prediccion.status.toUpperCase()}</span>
        </div>
    `;
}

// Función principal para cargar y renderizar el análisis
async function cargarYRenderizarAnalisis() {
    if (!analisisContainer) return;

    try {
        const response = await fetch(PREDICCIONES_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        analisisContainer.innerHTML = '';
        const htmlVistas = data.map(crearVistaDetallada).join('');
        analisisContainer.innerHTML = htmlVistas;

    } catch (error) {
        console.error('Error al cargar el Análisis Detallado:', error);
        analisisContainer.innerHTML = '<p class="error-msg">🚨 Error de conexión. Asegúrate de que el servidor Flask esté corriendo.</p>';
    }
}

document.addEventListener('DOMContentLoaded', cargarYRenderizarAnalisis);