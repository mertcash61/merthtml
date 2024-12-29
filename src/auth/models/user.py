from datetime import datetime
from ..database import Database
from ..utils.security import hash_password

class User:
    def __init__(self, id=None, username=None, email=None, password=None):
        self.id = id
        self.username = username
        self.email = email
        self.password = password
        self.created_at = datetime.now()
        self.db = Database()

    def save(self):
        if self.id is None:
            query = """
                INSERT INTO users (username, email, password, created_at)
                VALUES (%s, %s, %s, %s)
            """
            values = (self.username, self.email, hash_password(self.password), self.created_at)
            return self.db.execute(query, values)

    @staticmethod
    def find_by_email(email):
        db = Database()
        query = "SELECT * FROM users WHERE email = %s"
        return db.fetch_one(query, (email,))

    @staticmethod
    def find_by_id(user_id):
        db = Database()
        query = "SELECT * FROM users WHERE id = %s"
        return db.fetch_one(query, (user_id,)) 