from flask import Flask,request,jsonify
from main import main
import json
import platform
import csvGlobals


app = Flask(__name__)

def get_json_data(parameters):
    # items = []
    # items.append(packed_items)
    # items.append(packed_weights)
    # items.append(total_weight)
    # result = []

    # for item in items:
    #     result.append(json.dumps(item))
    print (parameters["normal"])
    return json.dumps(parameters)
	
@app.route('/getJson', methods=['POST', 'GET'])
def hello_world():
    print(platform.python_version())
    if request.method == 'POST':
        print('post app')
        req = request.json
        req.pop(0)
        values = dict()
        weights = dict()       
        for r in req:
        	weights[r[0]] = float(r[1])
        	values[r[0]] = float(r[2])        


        parameters = dict()
        parameters['weights'] = weights
        parameters['values'] = values
        parameters['avg_mbps_monthly'] = req[0][3]
        parameters['avg_use'] = req[0][4]
        parameters['max_cap_tb'] = req[0][5]
        parameters['increase_covid'] = req[0][6]


        json_result = get_json_data(main(parameters))

        # json_result = get_json_data(main(weights, values))


        return json_result