import csv
import json
import pandas as pd

def readFromCSV(filename):
	return pd.read_csv(filename, header=None,skiprows=1,index_col=0, squeeze=True).to_dict()

# w = readFromCSV('weights_internet.csv') 
# values =  readFromCSV('preferences.csv')
provinces = readFromCSV('fix_access_by_province.csv')
weights = dict()
values = dict()

def setValues(parameters):
	global weights,values,avg_mbps_monthly, avg_use, max_cap_tb, aumento_covid
	weights = parameters['weights'] 
	values = parameters['values'] 
	avg_mbps_monthly = float(parameters['avg_mbps_monthly'])
	avg_use = float(parameters['avg_use'])
	max_cap_tb = float(parameters['max_cap_tb'])
	aumento_covid = float(parameters['increase_covid'])
	
# with open('data.json', 'r') as f:
#     distros_dict = json.load(f)

# weights = dict()
# values = dict()
# for distro in distros_dict['services']:
# 	weights[distro['service']] = distro['weight']
# 	values[distro['service']] = distro['value']