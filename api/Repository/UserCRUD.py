from models import User
from database import db

from Authentication.hashing import hashing_password


async def update_user_password(user_id: int, password: str) -> bool:
    tran = db.transaction()

    try:
        tran.start()
        stmt = User.update().where(User.c.user_id == user_id).values(password=hashing_password(password))
        await db.execute(stmt)
        tran.commit()
        return True

    except NotImplementedError:
        tran.rollback()
        return False
