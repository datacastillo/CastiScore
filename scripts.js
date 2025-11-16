document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. FUNCIONALIDAD DE FILTROS EN PICKS DE VALOR (picks-valor.html)
    // =========================================================

    const picksGrid = document.querySelector('.picks-grid-completo');
    const filtroDeporte = document.getElementById('filtro-deporte');
    const filtroLiga = document.getElementById('filtro-liga');
    
    // Verificamos que los elementos existan antes de intentar manipularlos
    if (picksGrid && filtroDeporte && filtroLiga) {
        
        function aplicarFiltrosPicks() {
            const deporteSeleccionado = filtroDeporte.value;
            // La lógica para filtroLiga está deshabilitada por ahora, pero el campo sigue en el HTML
            // const ligaSeleccionada = filtroLiga.value; 

            const picks = picksGrid.querySelectorAll('.pick-list-card');
            let picksVisibles = 0;

            picks.forEach(pick => {
                // El deporte se infiere del texto dentro del elemento con clase .liga
                const ligaElemento = pick.querySelector('.liga');
                if (!ligaElemento) return;

                const ligaTexto = ligaElemento.textContent.toLowerCase();
                
                // Mapeo simple de texto de liga a deporte (para el filtro de Deporte)
                let pickDeporte = '';
                if (ligaTexto.includes('premier league') || ligaTexto.includes('bundesliga') || ligaTexto.includes('serie a')) {
                    pickDeporte = 'futbol';
                } else if (ligaTexto.includes('nba')) {
                    pickDeporte = 'nba';
                } else if (ligaTexto.includes('tenis') || ligaTexto.includes('atp')) {
                    pickDeporte = 'tenis';
                }

                // Lógica de filtrado
                const coincideDeporte = deporteSeleccionado === 'todos' || deporteSeleccionado === pickDeporte;
                
                if (coincideDeporte) {
                    pick.style.display = 'block';
                    picksVisibles++;
                } else {
                    pick.style.display = 'none';
                }
            });

            // Actualizar el contador de picks activos
            const contadorPicks = document.querySelector('.info-adicional p');
            if (contadorPicks) {
                contadorPicks.innerHTML = `Total de Picks Activos: <strong>${picksVisibles}</strong>`;
            }
        }

        // Asignación de Event Listeners
        filtroDeporte.addEventListener('change', aplicarFiltrosPicks);
        filtroLiga.addEventListener('change', aplicarFiltrosPicks); // El listener está aquí, pero la lógica solo usa deporte por ahora
        
        // Ejecutar al cargar la página para inicializar el contador
        aplicarFiltrosPicks();
    }


    // =========================================================
    // 2. FUNCIONALIDAD DE FILTROS EN HISTORIAL DE PICKS (historial.html)
    // =========================================================
    
    const tablaHistorial = document.querySelector('.tabla-historial tbody');
    const filtroResultado = document.getElementById('filtro-resultado');

    if (tablaHistorial && filtroResultado) {
        
        function aplicarFiltrosHistorial() {
            const resultadoSeleccionado = filtroResultado.value;
            const filas = tablaHistorial.querySelectorAll('tr');
            let filasVisibles = 0;

            filas.forEach(fila => {
                // El resultado se lee de la clase CSS que se espera en cada fila (tr)
                const claseResultado = fila.classList.contains('pick-ganado') ? 'ganado' : 
                                       fila.classList.contains('pick-perdido') ? 'perdido' : 
                                       fila.classList.contains('pick-pendiente') ? 'pendiente' : 'desconocido';

                const coincideResultado = resultadoSeleccionado === 'todos' || resultadoSeleccionado === claseResultado;
                
                if (coincideResultado) {
                    fila.style.display = 'table-row';
                    filasVisibles++;
                } else {
                    fila.style.display = 'none';
                }
            });

            // Actualizar el contador de picks mostrados
            const contadorHistorial = document.querySelector('.filtros-picks-container.historial-filtros .info-adicional p');
            if (contadorHistorial) {
                 contadorHistorial.innerHTML = `Picks mostrados: <strong>${filasVisibles}</strong>`;
            }
        }

        // Asignación de Event Listener
        filtroResultado.addEventListener('change', aplicarFiltrosHistorial);
        
        // Ejecutar al cargar la página para inicializar la tabla y el contador
        aplicarFiltrosHistorial();
    }

});