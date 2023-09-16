from models import User
from database import db
from schemas import CompleteUser

from Authentication.hashing import hashing_password


async def update_user(user: CompleteUser):
    stmt = User.update().where(User.c.user_id == user.user_id).values(name=user.name,
                                                                      password=hashing_password(user.password))
    tran = db.transaction()

    try:
        tran.start()
        await db.execute(stmt)
        tran.commit()
        return True

    except NotImplementedError:
        tran.rollback()
        return False
