# backend/analisis_logic/calculos.py

def calcular_valor_esperado(probabilidad, cuota):
    """Calcula el Valor Esperado (Expected Value - EV)."""
    return (probabilidad * cuota) - 1

def obtener_rachas_calientes():
    """Simula la identificación de tendencias de rachas."""
    rachas = [
        {
            "id": 1,
            "equipo": "Manchester City",
            "racha_tipo": "Más de 2.5 Goles Consecutivos",
            "partidos_consecutivos": 6,
            "proximo__partido": "vs Liverpool", 
            "prioridad": "Alta",
            "color_clase": "rojo" 
        },
        {
            "id": 2,
            "equipo": "Atlético de Madrid",
            "racha_tipo": "Portería a Cero (Clean Sheets)",
            "partidos_consecutivos": 4,
            "proximo__partido": "vs Valencia",
            "prioridad": "Media",
            "color_clase": "verde"
        },
        {
            "id": 3,
            "equipo": "Boca Juniors",
            "racha_tipo": "EV Positivo Identificado",
            "partidos_consecutivos": 5,
            "proximo__partido": "vs River Plate",
            "prioridad": "Alta",
            "color_clase": "azul"
        }
    ]
    return rachas

def obtener_tendencias():
    """Simula tendencias globales."""
    tendencias = [
        {"id": 1, "nombre": "Aumento del Goles en La Liga", "cambio": "+15%", "descripcion": "Media de goles por partido en los últimos 30 días."},
        {"id": 2, "nombre": "Disminución del Favorito en Premier", "cambio": "-8%", "descripcion": "Menor acierto del favorito según la cuota promedio."},
    ]
    return tendencias