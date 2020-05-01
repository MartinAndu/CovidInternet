import csv
import pandas as pd


def readFromCSV(filename):
	return pd.read_csv(filename, header=None,skiprows=1,index_col=0, squeeze=True).to_dict()

weights = readFromCSV('weights_internet.csv') 
values =  readFromCSV('preferences.csv')
provinces = readFromCSV('fix_access_by_province.csv')


