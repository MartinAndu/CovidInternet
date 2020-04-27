from __future__ import print_function
from ortools.algorithms import pywrapknapsack_solver
import numpy as np
import csv
from termcolor import colored


# Evaluo cord cutting http://www.ebizlatam.com/7-millones-nuevos-usuarios-internet-los-proximos-4-anos-argentina/
# Latinoamerica 12,9 exabytes/mes

# 324 Petabytes per day   https://www.cisco.com/c/dam/m/en_us/solutions/service-provider/vni-forecast-highlights/pdf/Latin_America_2020_Forecast_Highlights.pdf
AVERAGE_INTERNET_USAGE = 6 # hs     
MINUTES = 60
SECONDS = 60
DAYS = 30
# Tiempo por mes
TIEMPO = MINUTES * SECONDS * AVERAGE_INTERNET_USAGE * DAYS  

AUMENTO_COVID = 1.32
# Consumo promedio
CONSUMO_PROMEDIO_MBS = 17.8   # 17.8 Mbps de banca anda fija
ARGENTINA_POPULATION =  7511371 # Cantidad de accessos fijos https://www.cabase.org.ar/wp-content/uploads/2019/12/CABASE-Internet-Index-II-Semestre-2019.pdf
# 1TB  por mes. Son 1024 MB * 250
# Relacion 1 Mgbs = 0,125 Mb


TB_DATA = 1.5 # Se utilizo como dato 1.5 gb de data cap REVISAR ESTE DATO
GB_DATA = TB_DATA * 1024 # Per Month
MB_DATA = GB_DATA * 1024 
MBS_DATA = MB_DATA * 8 
# 320 GB *  1024 Mb * 0,125 Mbs/Mb 2560000
CAP_MAX =  MBS_DATA # Data cap o sea tasa de transferencia de datos mensual 28Tbps Maximum Throughput

# Create the solver.
solver = pywrapknapsack_solver.KnapsackSolver(
    pywrapknapsack_solver.KnapsackSolver.
    KNAPSACK_MULTIDIMENSION_BRANCH_AND_BOUND_SOLVER, 'KnapsackExample')
def main():

    with open('fix_access_by_province.csv', 'r') as file:
        reader = csv.reader(file)
        # Iterates through provinces
        csv_headings = next(reader)
        for row in reader:

            # 1.2000000000000002
            CANTIDAD_ACESOS_FIJOS = int(row[1].replace(",", ""))
            print(CANTIDAD_ACESOS_FIJOS)
            CONSUMO_PROMEDIO_MBS_PROV = (CONSUMO_PROMEDIO_MBS * CANTIDAD_ACESOS_FIJOS) / ARGENTINA_POPULATION
            CAP_MAX_PROV = (CAP_MAX * CANTIDAD_ACESOS_FIJOS) / ARGENTINA_POPULATION

            print ("En Provincia ==", row[0])
            calculo(CONSUMO_PROMEDIO_MBS_PROV, CAP_MAX_PROV)
    print()
    print ("Para todo el pais ")
    calculo(CONSUMO_PROMEDIO_MBS,CAP_MAX)

def calculo(CONSUMO_PROMEDIO_MBS_PROV, CAP_MAX_PROV):
    maximo_funcional = -1
    maximo_aumento_permitido = 0

    print()
    print ("Consumo de ", CONSUMO_PROMEDIO_MBS_PROV)
    print (f"Capacidad maxima por mes de {CAP_MAX_PROV} GB/mes")
    i = 1
    print()
    # for i in np.arange(0, AUMENTO_COVID, 1):
    for i in np.arange(0, AUMENTO_COVID + 0.01, 0.01):
        # print ('Rango -->', i)
        CONSUMO_MES_TOTAL = TIEMPO * CONSUMO_PROMEDIO_MBS_PROV * i#
        # print ('Consumo del mes (MB) es', CONSUMO_MES_TOTAL , " Mb/mes")
        # print ('Consumo del mes (GB) es', CONSUMO_MES_TOTAL / 1024 , " Gb/mes")
        # print ('Capacidad maxima permitida (data cap)', CAP_MAX , " Mb/mes")


        PORC_VIDEO_STREAMING = 0.6
        PORC_WEB = 0.13100
        PORC_GAMING = 0.0800
        PORC_SOCIAL = 0.06100
        PORC_FILE_SHARING = 0.04200
        PORC_MARKETPLACE = 0.02600
        PORC_SECURITY_AND_VPN = 0.01600
        PORC_MESSAGING = 0.01600
        PORC_CLOUD = 0.01400
        PORC_AUDIO_STREAMING = 0.0400

        CONSUMO_VIDEO_STREAMING = PORC_VIDEO_STREAMING * CONSUMO_MES_TOTAL
        CONSUMO_WEB = PORC_WEB * CONSUMO_MES_TOTAL
        CONSUMO_GAMING = PORC_GAMING * CONSUMO_MES_TOTAL
        CONSUMO_SOCIAL = PORC_SOCIAL * CONSUMO_MES_TOTAL
        CONSUMO_FILE_SHARING = PORC_FILE_SHARING * CONSUMO_MES_TOTAL
        CONSUMO_MARKETPLACE = PORC_MARKETPLACE * CONSUMO_MES_TOTAL
        CONSUMO_SECURITY_AND_VPN = PORC_SECURITY_AND_VPN * CONSUMO_MES_TOTAL
        CONSUMO_MESSAGING = PORC_MESSAGING * CONSUMO_MES_TOTAL
        CONSUMO_CLOUD = PORC_CLOUD * CONSUMO_MES_TOTAL
        CONSUMO_AUDIO_STREAMING = PORC_AUDIO_STREAMING * CONSUMO_MES_TOTAL

        values = [
            CONSUMO_VIDEO_STREAMING,
            CONSUMO_WEB,
            CONSUMO_GAMING,
            CONSUMO_SOCIAL,
            CONSUMO_FILE_SHARING,
            CONSUMO_MARKETPLACE,
            CONSUMO_SECURITY_AND_VPN,
            CONSUMO_MESSAGING,
            CONSUMO_CLOUD,
            CONSUMO_AUDIO_STREAMING,
        ]

        weights = [[
            CONSUMO_VIDEO_STREAMING,
            CONSUMO_WEB,
            CONSUMO_GAMING,
            CONSUMO_SOCIAL,
            CONSUMO_FILE_SHARING,
            CONSUMO_MARKETPLACE,
            CONSUMO_SECURITY_AND_VPN,
            CONSUMO_MESSAGING,
            CONSUMO_CLOUD,
            CONSUMO_AUDIO_STREAMING,
        ]]


        capacities = [CAP_MAX_PROV]

        solver.Init(values, weights, capacities)
        computed_value = solver.Solve()

        if (maximo_funcional < computed_value) :
            # print(colored(f"Funcional actual: {computed_value}\n", 'green'), 
            #     colored(f"Funcional máximo : {maximo_funcional}", 'red'))
            maximo_funcional = computed_value
            maximo_aumento_permitido = i 

        packed_items = []
        packed_weights = []
        total_weight = 0
        # print ('AUMENTO_COVID: ', i)
        # print('Total value =', computed_value)
        for i in range(len(values)):
            if solver.BestSolutionContains(i):
                packed_items.append(i)
                packed_weights.append(weights[0][i])
                total_weight += weights[0][i]
        # print('Total weight:', total_weight)
        # print('Packed items:', packed_items)
        # print('Packed_weights:', packed_weights)
    print ('Maximo aumento trafico internet permitido:', maximo_aumento_permitido)
    print('Total weight:', total_weight)
    print('Packed items:', packed_items)
    print('Packed_weights:', packed_weights)            

if __name__ == '__main__':
    main()
