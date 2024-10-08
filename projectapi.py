import mysql.connector
from mysql.connector import Error
import creds
from sql import create_con
from sql import execute_query
from sql import execute_read_query
import flask
from flask import jsonify
from flask import request

# creating a connection to mysql database
myCreds = creds.Creds()

conn = create_con(myCreds.conString, myCreds.userName, myCreds.password, myCreds.dbName)

# setting up an app name
app = flask.Flask(__name__) # sets up the app
app.config["DEBUG"] = True

# investors
@app.route('/api/investor', methods=['POST']) # create investor
def add_investor(): # adding a cat through postman "post & json format." you can also use the cursor function to add the new investor to the database
    request_data = request.get_json() #payload
    newfname = request_data['firstname']
    newlname = request_data['lastname']

    cursor = conn.cursor(dictionary=True)

    query = f"INSERT INTO investor (firstname, lastname) VALUES ('{newfname}','{newlname}')"
    cursor.execute(query)
    return f"A new investor has been added to the table"

@app.route('/api/investor', methods=['PUT']) # update investor
def update_investor():
    request_data = request.get_json()
    idToUpdate = request_data['id']
    updatefname = request_data['firstname']
    updatelname = request_data['lastname']

    cursor = conn.cursor(dictionary=True)

    query = f"UPDATE investor SET firstname = '{updatefname}', lastname = '{updatelname}' WHERE id = {idToUpdate}"
    cursor.execute(query)
    return f"Investor {idToUpdate} has been updated"

@app.route('/api/investor', methods=['DELETE']) # delete investor
def delete_investor(): 
    request_data = request.get_json()
    idToDelete = request_data['id']

    cursor = conn.cursor(dictionary=True)

    query = f"DELETE FROM investor WHERE id = {idToDelete}"
    cursor.execute(query)
    return f"Investor {idToDelete} has been deleted"

# bonds
@app.route('/api/bond', methods=['POST']) # create bond
def add_bond(): 
    request_data = request.get_json() #payload
    newbname = request_data['bondname']
    newbabbr = request_data['abbreviation']
    newbprice = request_data['currentprice']

    cursor = conn.cursor(dictionary=True)

    query = f"INSERT INTO bond (bondname, abbreviation, currentprice) VALUES ('{newbname}','{newbabbr}','{newbprice}')"
    cursor.execute(query)
    return f"A new bond has been added to the table"

@app.route('/api/bond', methods=['PUT']) # update bond
def update_bond():
    request_data = request.get_json()
    idToUpdate = request_data['id']
    updatebname = request_data['bondname']
    updatebabbr = request_data['abbreviation']
    updatebprice = request_data['currentprice']

    cursor = conn.cursor(dictionary=True)

    query = f"UPDATE bond SET bondname = '{updatebname}', abbreviation = '{updatebabbr}', currentprice = '{updatebprice}' WHERE id = {idToUpdate}"
    cursor.execute(query)
    return f"Bond {idToUpdate} has been updated"

@app.route('/api/bond', methods=['DELETE']) # delete bond
def delete_bond():
    request_data = request.get_json()
    idToDelete = request_data['id']

    cursor = conn.cursor(dictionary=True)

    query = f"DELETE FROM bond WHERE id = {idToDelete}"
    cursor.execute(query)
    return f"Bond {idToDelete} has been deleted"

# bond transactions
@app.route('/api/stock/transaction', methods=['POST']) # create stock
def add_bondtrans(): 
    request_data = request.get_json() #payload
    invid = request_data['investorid']
    stockid = request_data['stockid']
    quantity = request_data['quantity']

    cursor = conn.cursor(dictionary=True)

    query = f"INSERT INTO bondtransaction (investorid, stockid, quantity) VALUES ('{invid}','{stockid}','{quantity}')"
    cursor.execute(query)
    return f"Investor {invid} created a new bond transaction for bond {stockid}."

@app.route('/api/stock/transaction', methods=['DELETE']) # delete stock
def delete_bondtrans(): 
    request_data = request.get_json()
    idToDelete = request_data['id']

    cursor = conn.cursor(dictionary=True)

    query = f"DELETE FROM bondtransaction WHERE id = {idToDelete}"
    cursor.execute(query)
    return f"Bond transaction {idToDelete} has been deleted"

# stocks
@app.route('/api/stock', methods=['POST']) # create stock
def add_stock(): 
    request_data = request.get_json() #payload
    newsname = request_data['stockname']
    newsabbr = request_data['abbreviation']
    newsprice = request_data['currentprice']

    cursor = conn.cursor(dictionary=True)

    query = f"INSERT INTO stock (stockname, abbreviation, currentprice) VALUES ('{newsname}','{newsabbr}','{newsprice}')"
    cursor.execute(query)
    return f"A new stock has been added to the table"

@app.route('/api/stock', methods=['PUT']) # update stock
def update_stock():
    request_data = request.get_json()
    idToUpdate = request_data['id']
    updatesname = request_data['stockname']
    updatesabbr = request_data['abbreviation']
    updatesprice = request_data['currentprice']

    cursor = conn.cursor(dictionary=True)

    query = f"UPDATE stock SET stockname = '{updatesname}', abbreviation = '{updatesabbr}', currentprice = '{updatesprice}' WHERE id = {idToUpdate}"
    cursor.execute(query)
    return f"Stock {idToUpdate} has been updated"

@app.route('/api/stock', methods=['DELETE']) # delete stock
def delete_stock(): 
    request_data = request.get_json()
    idToDelete = request_data['id']

    cursor = conn.cursor(dictionary=True)

    query = f"DELETE FROM stock WHERE id = {idToDelete}"
    cursor.execute(query)
    return f"Stock {idToDelete} has been deleted"

# stock transactions
@app.route('/api/stock/transaction', methods=['POST']) # create stock
def add_stocktrans(): 
    request_data = request.get_json() #payload
    invid = request_data['investorid']
    stockid = request_data['stockid']
    quantity = request_data['quantity']

    cursor = conn.cursor(dictionary=True)

    query = f"INSERT INTO stocktransaction (investorid, stockid, quantity) VALUES ('{invid}','{stockid}','{quantity}')"
    cursor.execute(query)
    return f"Investor {invid} created a new stock transaction for stock {stockid}."

@app.route('/api/stock/transaction', methods=['DELETE']) # delete stock
def delete_stocktrans(): 
    request_data = request.get_json()
    idToDelete = request_data['id']

    cursor = conn.cursor(dictionary=True)

    query = f"DELETE FROM stocktransaction WHERE id = {idToDelete}"
    cursor.execute(query)
    return f"Stock transaction {idToDelete} has been deleted"


app.run()