// script.js

const PREDICCIONES_API_URL = 'http://127.0.0.1:5000/api/predicciones';
const partidosContainer = document.getElementById('partidos-relevantes-container');
const prediccionesContainer = document.getElementById('predicciones-container');

// --- 1. Generación de Chips/Badges de Partidos Relevantes ---
function renderPartidosRelevantes(data) {
    if (!partidosContainer) return;
    
    partidosContainer.innerHTML = '';
    const partidosHTML = data.map(partido => {
        // Obtenemos las iniciales de la liga para un look más limpio (ej: "La Liga" -> "LL")
        const ligaIniciales = partido.liga.split(' ').map(word => word[0]).join('');
        return `
            <span class="partido-chip" data-id="${partido.id}">
                ${ligaIniciales} | ${partido.equipos}
            </span>
        `;
    }).join('');
    
    partidosContainer.innerHTML = partidosHTML;
}


// --- 2. Generación de Tarjetas de Predicciones (Diseño Moderno) ---
function crearTarjetaPrediccion(prediccion) {
    // Clase para el EV (positivo o negativo)
    const evClase = prediccion.valor_esperado > 0 ? 'positivo' : 'negativo';
    
    return `
        <div class="card prediccion-card">
            
            <div class="card-header">
                <span class="liga">${prediccion.liga}</span>
                <span class="fecha">${prediccion.fecha}</span>
            </div>

            <h3>${prediccion.equipos}</h3>
            <p class="pronostico">${prediccion.pronostico_base}</p>
            
            <div class="metrica-linea">
                <div class="metrica">
                    <span class="label">Cuota</span>
                    <strong>${prediccion.cuota}</strong>
                </div>
                <div class="metrica ev-score">
                    <span class="label">Prob. Modelo</span>
                    <strong>${(prediccion.probabilidad_modelo * 100).toFixed(0)}%</strong>
                </div>
                <div class="metrica ev-score ${evClase}">
                    <span class="label">Valor Esperado (EV)</span>
                    <strong>${prediccion.valor_esperado.toFixed(2)}</strong>
                </div>
            </div>
            
            <span class="status ${prediccion.status}">${prediccion.status.toUpperCase()}</span>
        </div>
    `;
}

function renderPredicciones(data) {
    if (!prediccionesContainer) return;

    prediccionesContainer.innerHTML = '';
    const tarjetasHTML = data.map(crearTarjetaPrediccion).join('');
    prediccionesContainer.innerHTML = tarjetasHTML;
}


// --- 3. Función Principal de Carga ---
async function cargarDashboard() {
    try {
        const response = await fetch(PREDICCIONES_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Renderizar ambas secciones
        renderPartidosRelevantes(data);
        renderPredicciones(data);

    } catch (error) {
        console.error('Error al cargar el Dashboard:', error);
        // Mensaje de error si Flask no está corriendo
        if (prediccionesContainer) {
            prediccionesContainer.innerHTML = '<p class="error-msg">🚨 Error de conexión. Asegúrate de que el servidor Flask esté corriendo.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', cargarDashboard);