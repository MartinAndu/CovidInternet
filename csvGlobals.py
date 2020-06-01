import csv
import json
import pandas as pd

def readFromCSV(filename):
	return pd.read_csv(filename, header=None,skiprows=1,index_col=0, squeeze=True).to_dict()

# weights = readFromCSV('weights_internet.csv') 
# values =  readFromCSV('preferences.csv')
# provinces = readFromCSV('fix_access_by_province.csv')

with open('data.json', 'r') as f:
    distros_dict = json.load(f)

weights = dict()
values = dict()
for distro in distros_dict['services']:
	weights[distro['service']] = distro['weight']
	values[distro['service']] = distro['value']