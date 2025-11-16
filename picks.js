// picks.js

const PREDICCIONES_API_URL = 'http://127.0.0.1:5000/api/predicciones';
const picksContainer = document.getElementById('picks-valor-container');

// Función para crear la tarjeta (similar a script.js)
function crearTarjetaPrediccion(prediccion) {
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
                <div class="metrica">
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

// Función principal para cargar, filtrar y renderizar los picks
async function cargarYRenderizarPicks() {
    if (!picksContainer) return;

    try {
        const response = await fetch(PREDICCIONES_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // 🚨 FILTRADO CLAVE: Mostrar solo si el EV es positivo (mayor a 0)
        const picksDeValor = data.filter(p => p.valor_esperado > 0);

        if (picksDeValor.length === 0) {
            picksContainer.innerHTML = '<p class="info-msg">🎉 ¡Felicidades! Actualmente no hay Picks de Valor (EV > 0). El mercado está eficiente.</p>';
            return;
        }

        picksContainer.innerHTML = '';
        const htmlTarjetas = picksDeValor.map(crearTarjetaPrediccion).join('');
        picksContainer.innerHTML = htmlTarjetas;

    } catch (error) {
        console.error('Error al cargar Picks de Valor:', error);
        picksContainer.innerHTML = '<p class="error-msg">🚨 Error de conexión. Asegúrate de que el servidor Flask esté corriendo.</p>';
    }
}

document.addEventListener('DOMContentLoaded', cargarYRenderizarPicks);