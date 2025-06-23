import mysql.connector
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=[""],
)

# Create a connection to the database
conn = mysql.connector.connect(
    database=os.getenv("MYSQL_DATABASE"),
    user=os.getenv("MYSQL_ROOT_USER"),
    password=os.getenv("MYSQL_ROOT_PASSWORD"),
    port=3306,
    host=os.getenv("MYSQL_HOST")
)


@app.get("/users/public")
async def get_users():
    cursor = conn.cursor()
    sql_select_Query = "select username from user"
    cursor.execute(sql_select_Query)
    # get all records
    records = cursor.fetchall()
    print("Total number of rows in table: ", cursor.rowcount)
    # renvoyer nos données et 200 code OK
    return {'utilisateurs': records}


@app.get("/users/private")
async def get_private_users():
    cursor = conn.cursor()
    sql_select_Query = "SELECT id, username, email, is_admin FROM user"
    cursor.execute(sql_select_Query)
    # get all records
    records = cursor.fetchall()
    print("Total number of rows in table: ", cursor.rowcount)
    # renvoyer nos données et 200 code OK
    return {'utilisateurs': records}


@app.post("/users")
async def create_user(user: dict):
    cursor = conn.cursor()
    sql_insert_Query = "INSERT INTO user (username, email, password, is_admin) VALUES (%s, %s, %s, %s)"
    values = (user['username'], user['email'],
              user['password'], user['is_admin'])
    cursor.execute(sql_insert_Query, values)
    conn.commit()
    print("User created successfully")
    return {'message': 'User created successfully', 'user_id': cursor.lastrowid}


@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    cursor = conn.cursor()
    sql_delete_Query = "DELETE FROM user WHERE id = %s"
    cursor.execute(sql_delete_Query, (user_id,))
    conn.commit()
    if cursor.rowcount == 0:
        return {'message': 'User not found'}, 404
    print("User deleted successfully")
    return {'message': 'User deleted successfully'}
