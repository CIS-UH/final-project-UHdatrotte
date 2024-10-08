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
@app.route('/api/investor', methods=['POST'])
def add_investor(): # adding a cat through postman "post & json format." you can also use the cursor function to add the new investor to the database
    request_data = request.get_json() #payload
    newfname = request_data['firstname']
    newlname = request_data['lastname']

    cursor = conn.cursor(dictionary=True)

    query = f"INSERT INTO investor (firstname, lastname) VALUES ('{newfname}','{newlname}')"
    cursor.execute(query)
    return f"A new investor has been added to the table"

@app.route('/api/investor', methods=['PUT'])
def update_investor():
    request_data = request.get_json()
    idToUpdate = request_data['id']
    updatefname = request_data['firstname']
    updatelname = request_data['lastname']

    cursor = conn.cursor(dictionary=True)

    #this command updates the cat entry
    query = f"UPDATE investor SET firstname = '{updatefname}', lastname = '{updatelname}' WHERE id = {idToUpdate}"
    cursor.execute(query)
    return f"Investor {idToUpdate} has been updated"

@app.route('/api/investor', methods=['DELETE'])
def delete_investor(): #deleting a cat
    request_data = request.get_json()
    idToDelete = request_data['id']

    cursor = conn.cursor(dictionary=True)

    #this command deletes a cat entry
    query = f"DELETE FROM investor WHERE id = {idToDelete}"
    cursor.execute(query)
    return f"Investor {idToDelete} has been deleted"

# bonds
@app.route('/api/bond', methods=['POST'])
def add_bond(): # adding a cat through postman "post & json format." you can also use the cursor function to add the new investor to the database
    request_data = request.get_json() #payload
    newbname = request_data['bondname']
    newbabbr = request_data['abbreviation']
    newbprice = request_data['currentprice']

    cursor = conn.cursor(dictionary=True)

    query = f"INSERT INTO bond (bondname, abbreviation, currentprice) VALUES ('{newbname}','{newbabbr}','{newbprice}')"
    cursor.execute(query)
    return f"A new bond has been added to the table"

@app.route('/api/bond', methods=['PUT'])
def update_bond():
    request_data = request.get_json()
    idToUpdate = request_data['id']
    updatebname = request_data['bondname']
    updatebabbr = request_data['abbreviation']
    updatebprice = request_data['currentprice']

    cursor = conn.cursor(dictionary=True)

    #this command updates the cat entry
    query = f"UPDATE bond SET bondname = '{updatebname}', abbreviation = '{updatebabbr}', currentprice = '{updatebprice}' WHERE id = {idToUpdate}"
    cursor.execute(query)
    return f"Bond {idToUpdate} has been updated"

@app.route('/api/bond', methods=['DELETE'])
def delete_bond(): #deleting a cat
    request_data = request.get_json()
    idToDelete = request_data['id']

    cursor = conn.cursor(dictionary=True)

    #this command deletes a cat entry
    query = f"DELETE FROM bond WHERE id = {idToDelete}"
    cursor.execute(query)
    return f"Bond {idToDelete} has been deleted"


app.run()