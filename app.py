from flask import Flask, jsonify, request
import pickle
import numpy as np

app = Flask(__name__)
app.config['DEBUG'] = True

model = pickle.load(open('Model.pkl', 'rb'))


@app.route('/predict', methods=['POST','GET'])
def predict():
    int_features = [int(x) for x in request.form.values()]
    final = [np.array(int_features)]
    prediction = model.predict_proba(final)
    output = '{0:.{1}f}'.format(prediction[0][1], 2)

    return jsonify({'result': format(output)})

if __name__ == '__main__':
    app.run()
