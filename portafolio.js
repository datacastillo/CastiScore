// portafolio.js

const kpisContainer = document.getElementById('portafolio-kpis');
const historialContainer = document.getElementById('historial-container');

// --- 1. SIMULACIÓN DE DATOS DEL PORTAFOLIO ---
const DATOS_PORTAFOLIO = {
    // Métricas para los KPIs
    ROI: "+18.5%",
    Yield: "+6.2%",
    Picks_Ganados: 78,
    Picks_Perdidos: 45,
    Capital_Total: "$5,000",
    
    // Historial de apuestas (usamos la misma estructura de datos de predicciones para simplificar)
    historial: [
        { id: 110, equipos: "Juventus vs Inter", pronostico: "Empate", resultado: "GANADO", cuota: 3.20, ganancia: 220.00 },
        { id: 111, equipos: "Man. Utd vs City", pronostico: "Más 2.5 Goles", resultado: "PERDIDO", cuota: 1.90, ganancia: -100.00 },
        { id: 112, equipos: "Boca vs River", pronostico: "Gana Boca", resultado: "GANADO", cuota: 2.10, ganancia: 110.00 },
        { id: 113, equipos: "PSG vs Lyon", pronostico: "Ambos Anotan", resultado: "PENDIENTE", cuota: 1.75, ganancia: 0.00 }
    ]
};

// --- 2. FUNCIÓN PARA CREAR KPIs ---
function crearKPIs(datos) {
    const kpisHTML = `
        <div class="kpi-card principal positivo">
            <span class="label">Retorno sobre Inversión (ROI)</span>
            <strong>${datos.ROI}</strong>
        </div>
        <div class="kpi-card">
            <span class="label">Yield Histórico</span>
            <strong>${datos.Yield}</strong>
        </div>
        <div class="kpi-card">
            <span class="label">Ganados / Perdidos</span>
            <strong>${datos.Picks_Ganados} / ${datos.Picks_Perdidos}</strong>
        </div>
        <div class="kpi-card">
            <span class="label">Capital Total en Riesgo</span>
            <strong>${datos.Capital_Total}</strong>
        </div>
    `;
    kpisContainer.innerHTML = kpisHTML;
}

// --- 3. FUNCIÓN PARA CREAR TABLA DE HISTORIAL ---
function crearHistorial(historial) {
    // Crea el encabezado de la tabla
    let tablaHTML = `
        <table>
            <thead>
                <tr>
                    <th>Partido</th>
                    <th>Pronóstico</th>
                    <th>Cuota</th>
                    <th>Resultado</th>
                    <th>Ganancia/Pérdida</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Agrega las filas
    historial.forEach(item => {
        const resultadoClase = item.resultado.toLowerCase();
        tablaHTML += `
            <tr class="${resultadoClase}">
                <td>${item.equipos}</td>
                <td>${item.pronostico}</td>
                <td>${item.cuota.toFixed(2)}</td>
                <td class="res-${resultadoClase}">
                    ${item.resultado}
                </td>
                <td class="res-${resultadoClase}">
                    ${item.ganancia.toFixed(2)}
                </td>
            </tr>
        `;
    });

    tablaHTML += '</tbody></table>';
    historialContainer.innerHTML = tablaHTML;
}

// --- 4. FUNCIÓN PRINCIPAL ---
function cargarPortafolio() {
    if (kpisContainer && historialContainer) {
        crearKPIs(DATOS_PORTAFOLIO);
        crearHistorial(DATOS_PORTAFOLIO.historial);
    }
}

document.addEventListener('DOMContentLoaded', cargarPortafolio);