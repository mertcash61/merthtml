from ..database import Database

class Role:
    def __init__(self, id=None, name=None, description=None):
        self.id = id
        self.name = name
        self.description = description
        self.db = Database()

    def save(self):
        if self.id is None:
            query = "INSERT INTO roles (name, description) VALUES (%s, %s)"
            values = (self.name, self.description)
            return self.db.execute(query, values)

    @staticmethod
    def get_user_roles(user_id):
        db = Database()
        query = """
            SELECT r.* FROM roles r
            JOIN user_roles ur ON r.id = ur.role_id
            WHERE ur.user_id = %s
        """
        return db.fetch_all(query, (user_id,)) 