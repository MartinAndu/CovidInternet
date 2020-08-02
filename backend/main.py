from __future__ import print_function
from ortools.algorithms import pywrapknapsack_solver
import numpy as np
import csvGlobals
from termcolor import colored
from flask import Flask


# Evaluo cord cutting http://www.ebizlatam.com/7-millones-nuevos-usuarios-internet-los-proximos-4-anos-argentina/
# Latinoamerica 12,9 exabytes/mes

ARGENTINA_POPULATION =  7511371 # Cantidad de accessos fijos https://www.cabase.org.ar/wp-content/uploads/2019/12/CABASE-Internet-Index-II-Semestre-2019.pdf

# Create the solver.
solver = pywrapknapsack_solver.KnapsackSolver(
    pywrapknapsack_solver.KnapsackSolver.
    KNAPSACK_MULTIDIMENSION_BRANCH_AND_BOUND_SOLVER, 'KnapsackExample')


def main(parameters):
    global AVERAGE_INTERNET_USAGE, TIEMPO, AUMENTO_COVID, CONSUMO_PROMEDIO_MBS, CAP_MAX
    csvGlobals.setValues(parameters)
    # 324 Petabytes per day   https://www.cisco.com/c/dam/m/en_us/solutions/service-provider/vni-forecast-highlights/pdf/Latin_America_2020_Forecast_Highlights.pdf
    AVERAGE_INTERNET_USAGE = csvGlobals.avg_use #10
    

    MINUTES = 60
    SECONDS = 60
    DAYS = 30
    # Tiempo por mes
    TIEMPO = float(MINUTES * SECONDS * AVERAGE_INTERNET_USAGE * DAYS)

    AUMENTO_COVID =  csvGlobals.aumento_covid  # 1.32
    # Consumo promedio
    CONSUMO_PROMEDIO_MBS = csvGlobals.avg_mbps_monthly  # 17.8   # 17.8 Mbps de banca anda fija
    # 1TB  por mes. Son 1024 MB * 250
    # Relacion 1 Mgbs = 0,125 Mb

    TB_DATA = csvGlobals.max_cap_tb #  3 # 1.5 # Se utilizo como dato 1.5 gb de data cap REVISAR ESTE DATO
    GB_DATA = TB_DATA * 1024 # Per Month
    MB_DATA = GB_DATA * 1024 
    MBS_DATA = MB_DATA * 8 
    # 320 GB *  1024 Mb * 0,125 Mbs/Mb 2560000
    CAP_MAX =  MBS_DATA # Data cap o sea tasa de transferencia de datos mensual 28Tbps Maximum Throughput

    # print(csvGlobals.provinces.items())
    # for p in csvGlobals.provinces:
    #     print (csvGlobals.provinces[p])
    #     consumoPorProvincia(p, csvGlobals.provinces[p])
        
    print("Calculo mochila normal")
    parametros = dict()
    parametros["normal"] = calculoMochila(CONSUMO_PROMEDIO_MBS,CAP_MAX,AUMENTO_COVID = 1.1, INICIO = 1, STEP = 1)

    print("Calculo mochila con aumento covid")
    parametros["aumento_covid"] = calculoMochila(CONSUMO_PROMEDIO_MBS,CAP_MAX,AUMENTO_COVID = AUMENTO_COVID + 0.01, INICIO = 1, STEP = 0.01)

    print("Calculo mochila conservando todos los servicios")
    parametros["aumento_covid_todos_objetos"] = calculoMochila(CONSUMO_PROMEDIO_MBS,CAP_MAX,AUMENTO_COVID = parametros["aumento_covid"][2]["maximo_aumento_permitido_todos_los_objetos"], INICIO = 1, STEP = 0.01)

    # print()
    # print(parametros["normal"])
    # print()
    # print(parametros["aumento_covid"])
    # print()
    # print(parametros["aumento_covid_todos_objetos"])
    # # print(parametros["aumento_covid"].packed_items)
    # # print(parametros["aumento_covid_todos_objetos"].packed_items)
    
    return parametros

# def consumoPorProvincia(seccion, cantidad):
#     CANTIDAD_ACESOS_IFJOS = cantidad
#     CONSUMO_PROMEDIO_MBS_PROV = (CONSUMO_PROMEDIO_MBS * CANTIDAD_ACESOS_FIJOS) / ARGENTINA_POPULATION
#     CAP_MAX_PROV = (CAP_MAX * CANTIDAD_ACESOS_FIJOS) / ARGENTINA_POPULATION

#     print (CONSUMO_PROMEDIO_MBS_PROV)
#     print ("En Provincia ==", seccion)
#     calculo(CONSUMO_PROMEDIO_MBS_PROV, CAP_MAX_PROV)

def convertToVector(dict):
    lst = []
    for d in dict:
        lst.append(dict[d])
    return lst



def calculoMochila(CONSUMO_PROMEDIO_MBS_PROV,CAP_MAX_PROV,AUMENTO_COVID, INICIO, STEP):
    maximo_funcional = -1
    maximo_aumento_permitido = 0
    maximo_aumento_permitido_todos_los_objetos = 0

    lst = convertToVector(csvGlobals.weights)
    # I need a vector of weights so the best way to work around this is by using index 0
    services = []
    for value in csvGlobals.values:
        services.append(value)

    
    print()
    print ("Consumo de ", CONSUMO_PROMEDIO_MBS_PROV)
    print (f"Capacidad maxima por mes de {CAP_MAX_PROV} GB/mes")
    print()
    print(INICIO)
    print(AUMENTO_COVID)
    print(STEP)
    packed_items = []   
    packed_weights = []
    computed_value = 0
    total_weight = 0
    for i in np.arange(INICIO, AUMENTO_COVID, STEP):
    # for i in np.arange(0, AUMENTO_COVID + 0.01, 0.01):
    # for i in np.arange(0, 0.79 + 0.01, 0.01):
        # print ('Rango -->', i)
        CONSUMO_MES_TOTAL = TIEMPO * CONSUMO_PROMEDIO_MBS_PROV * i#
        # print ('Consumo del mes (MB) es', CONSUMO_MES_TOTAL , " Mb/mes")
        # print ('Consumo del mes (GB) es', CONSUMO_MES_TOTAL / 1024 , " Gb/mes")
        # print ('Capacidad maxima permitida (data cap)', CAP_MAX , " Mb/mes")


        # PORC_VIDEO_STREAMING = 0.6
        # PORC_WEB = 0.13100
        # PORC_GAMING = 0.0800
        # PORC_SOCIAL = 0.06100
        # PORC_FILE_SHARING = 0.04200
        # PORC_MARKETPLACE = 0.02600
        # PORC_SECURITY_AND_VPN = 0.01600
        # PORC_MESSAGING = 0.01600
        # PORC_CLOUD = 0.01400
        # PORC_AUDIO_STREAMING = 0.0400

        # CONSUMO_VIDEO_STREAMING = PORC_VIDEO_STREAMING * CONSUMO_MES_TOTAL
        # CONSUMO_WEB = PORC_WEB * CONSUMO_MES_TOTAL
        # CONSUMO_GAMING = PORC_GAMING * CONSUMO_MES_TOTAL
        # CONSUMO_SOCIAL = PORC_SOCIAL * CONSUMO_MES_TOTAL
        # CONSUMO_FILE_SHARING = PORC_FILE_SHARING * CONSUMO_MES_TOTAL
        # CONSUMO_MARKETPLACE = PORC_MARKETPLACE * CONSUMO_MES_TOTAL
        # CONSUMO_SECURITY_AND_VPN = PORC_SECURITY_AND_VPN * CONSUMO_MES_TOTAL
        # CONSUMO_MESSAGING = PORC_MESSAGING * CONSUMO_MES_TOTAL
        # CONSUMO_CLOUD = PORC_CLOUD * CONSUMO_MES_TOTAL
        # CONSUMO_AUDIO_STREAMING = PORC_AUDIO_STREAMING * CONSUMO_MES_TOTAL



        # values = [
        #     CONSUMO_VIDEO_STREAMING,
        #     CONSUMO_WEB,
        #     CONSUMO_GAMING,
        #     CONSUMO_SOCIAL,
        #     CONSUMO_FILE_SHARING,
        #     CONSUMO_MARKETPLACE,
        #     CONSUMO_SECURITY_AND_VPN,
        #     CONSUMO_MESSAGING,
        #     CONSUMO_CLOUD,
        #     CONSUMO_AUDIO_STREAMING,
        # ]

        # weights = [[
        #     CONSUMO_VIDEO_STREAMING,
        #     CONSUMO_WEB,
        #     CONSUMO_GAMING,
        #     CONSUMO_SOCIAL,
        #     CONSUMO_FILE_SHARING,
        #     CONSUMO_MARKETPLACE,
        #     CONSUMO_SECURITY_AND_VPN,
        #     CONSUMO_MESSAGING,
        #     CONSUMO_CLOUD,
        #     CONSUMO_AUDIO_STREAMING,
        # ]]




        weights = [[]]
        values = []
        for l in lst:
            weights[0].append(l * CONSUMO_MES_TOTAL)
            # values.append(l * CONSUMO_MES_TOTAL)

        for value in csvGlobals.values:
            values.append(float(csvGlobals.values[value]))

        # values = weights
        # for value in csvGlobals.values:
        # # values.append(float(csvGlobals.values[value]) * float(csvGlobals.weights[value]))
        #     values.append(float(csvGlobals.values[value]) * CONSUMO_MES_TOTAL)

        capacities = [CAP_MAX_PROV]

        solver.Init(values, weights, capacities)
        computed_value = solver.Solve()

        if (maximo_funcional <= computed_value) :
            # print(colored(f"Funcional actual: {computed_value}\n", 'green'), 
            # colored(f"Funcional máximo : {maximo_funcional}", 'red'))
            maximo_funcional = computed_value
            maximo_aumento_permitido = i

        packed_items = []   
        packed_weights = []
        total_weight = 0
        # print ('AUMENTO_COVID: ', i)
        print('Total value =', computed_value)
        for j in range(len(values)):
            if solver.BestSolutionContains(j):
                packed_items.append(services[j])
                packed_weights.append(weights[0][j])
                total_weight += weights[0][j]

        if (len(weights[0])) == len(packed_items):
            maximo_aumento_permitido_todos_los_objetos =  i
        # print('Total weight:', total_weight)
        # print('Packed items:', packed_items)
        # print('Packed_weights:', packed_weights)
    print('Maximo aumento trafico internet permitido:', maximo_aumento_permitido)
    print('Maximo aumento trafico conservando todos los servicios:', maximo_aumento_permitido_todos_los_objetos)
    print('Total weight:', total_weight)
    print('Packed items:', packed_items)
    print('Packed_weights:', packed_weights)            

    parametros = dict()
    parametros["total_weight"] = total_weight
    parametros["maximo_aumento_permitido"] = maximo_aumento_permitido
    parametros["maximo_aumento_permitido_todos_los_objetos"] = maximo_aumento_permitido_todos_los_objetos
    parametros["maximo_funcional"] = maximo_funcional
    parametros["total_weight"] = total_weight
    parametros["computed_value"] = computed_value

    print(packed_items)
    print(packed_weights)

    return (packed_weights, packed_items, parametros)


if __name__ == '__main__':
    packed_weights, packed_items, total_weight = main()
