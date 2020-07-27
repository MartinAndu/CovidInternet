from flask import Flask,request,jsonify
from tinydb import TinyDB, Query
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
    return json.dumps(parameters)
	
@app.route('/getJson', methods=['POST', 'GET'])
def hello_world():
    if request.method == 'POST':
        print('post app')
        req = request.json
        print(req)
        values = dict()
        weights = dict() 


        for r in req["services"]:
        	weights[r] = float(req["weights"][r])
        	values[r] = float(req["values"][r])        


        parameters = dict()
        parameters['weights'] = weights
        parameters['values'] = values
        parameters['avg_mbps_monthly'] = req["parameters"]["avg_mbps_monthly"] # req[0][3]
        parameters['avg_use'] =  req["parameters"]["avg_use"] # req[0][4]
        parameters['max_cap_tb'] =  req["parameters"]["max_cap_tb"] # req[0][5]
        parameters['increase_covid'] = req["parameters"]["increase_covid"] # req[0][6]


        json_result = get_json_data(main(parameters))

        # json_result = get_json_data(main(weights, values))


        return json_result

@app.route('/saveJson', methods=['POST', 'GET'])
def save():
    if request.method == 'POST':
        db = TinyDB('db.json')
        doc_id =db.insert(request.json)
        request.json["doc_id"] = doc_id
        db.update(request.json, doc_ids=[doc_id])
        return json.dumps(db.all())


@app.route('/getAll', methods=['GET'])
def getAll():
    if request.method == 'GET':
        db = TinyDB('db.json')
        return json.dumps(db.all())

@app.route('/get/<doc_id>', methods=['GET'])
def getByDocID(doc_id):
    if request.method == 'GET':
        index = int(doc_id)
        db = TinyDB('db.json')
        
        return json.dumps(db.get(doc_id=index))



@app.route('/deleteAll', methods=['GET'])
def deleteAll():
    if request.method == 'GET':
        db = TinyDB('db.json')
        print(db)
        db.truncate()
        return json.dumps(db.all())   