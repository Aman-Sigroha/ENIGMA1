from flask import Flask,render_template,request
import pickle
import numpy as np
app=Flask(__name__)

model=pickle.load(open(model.pk1,'rb'))
@app.route('/')
def hello_world():
    return render_template('model.html')
@app.route("/predict",methods=['POST','GET'])
def predict():
    int_features=[int(x) for x in request.form.values()]
    final=[np.array(int_features)]
    prediction=model.predict_proba(final)
    output='{0:.{1}f}'.format(prediction[0][1],2)

    if output>str(0.5):
        return rende_template('forest.htm',pred='Your Forest  is in danger. \nProbability of fire occuring is {}'.format(output))
    else:
        return render_template('forest.html',pred='Your Forest is safe.\nProbabiltu of fire occuring is {}'.format(output))
if  __name__=='__main__':
    app.run()