# backend/app.py

from flask import Flask, jsonify
from flask_cors import CORS
from analisis_logic.calculos import calcular_valor_esperado, obtener_rachas_calientes, obtener_tendencias 

app = Flask(__name__)
CORS(app) 

# --- SIMULACIÓN DE DATOS BASE ---
MOCK_PARTIDOS = [
    {
        "id": 101,
        "liga": "La Liga",
        "equipos": "Real Madrid vs FC Barcelona",
        "fecha": "22 SEP 2025 - 14:00",
        "probabilidad_modelo": 0.65, 
        "cuota": 1.85,             
        "pronostico_base": "Gana Real Madrid",
        "relevancia": "ALTA"
    },
    {
        "id": 102,
        "liga": "Premier League",
        "equipos": "Arsenal vs Chelsea",
        "fecha": "22 SEP 2025 - 11:30",
        "probabilidad_modelo": 0.78, 
        "cuota": 1.62,
        "pronostico_base": "Ambos Anotan",
        "relevancia": "MEDIA"
    },
    {
        "id": 103,
        "liga": "Bundesliga",
        "equipos": "Bayern M. vs Dortmund",
        "fecha": "22 SEP 2025 - 09:30",
        "probabilidad_modelo": 0.55, 
        "cuota": 2.20,             
        "pronostico_base": "Gana Bayern M.",
        "relevancia": "ALTA"
    }
]

# --- ENDPOINT 1: Dashboard y Picks de Valor (Calcula EV) ---
@app.route('/api/predicciones', methods=['GET'])
def obtener_predicciones():
    datos_con_analisis = []
    
    for partido in MOCK_PARTIDOS:
        ev = calcular_valor_esperado(partido["probabilidad_modelo"], partido["cuota"])
        
        partido_procesado = partido.copy() 
        partido_procesado["valor_esperado"] = round(ev, 2)
        partido_procesado["status"] = "pendiente" if partido["id"] == 103 else "ganada" 

        datos_con_analisis.append(partido_procesado)
        
    return jsonify(datos_con_analisis)

# --- ENDPOINT 2: Rachas Calientes ---
@app.route('/api/rachas', methods=['GET'])
def obtener_rachas():
    # Solo llama a la función de lógica
    rachas = obtener_rachas_calientes()
    return jsonify(rachas)

# --- ENDPOINT 3: Tendencias Globales ---
@app.route('/api/tendencias', methods=['GET'])
def obtener_tendencias_globales():
    # Solo llama a la función de lógica
    tendencias = obtener_tendencias()
    return jsonify(tendencias)


if __name__ == '__main__':
    app.run(debug=True, port=5000)