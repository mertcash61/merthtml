import mysql.connector
from .config.settings import DATABASE

class Database:
    def __init__(self):
        self.connection = mysql.connector.connect(**DATABASE)
        self.cursor = self.connection.cursor(dictionary=True)

    def execute(self, query, values=None):
        self.cursor.execute(query, values or ())
        self.connection.commit()
        return self.cursor.lastrowid

    def fetch_one(self, query, values=None):
        self.cursor.execute(query, values or ())
        return self.cursor.fetchone()

    def fetch_all(self, query, values=None):
        self.cursor.execute(query, values or ())
        return self.cursor.fetchall()

    def __del__(self):
        self.cursor.close()
        self.connection.close() 