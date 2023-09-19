from models import User
from database import db, execute_stmt_in_tran
from schemas import CompleteUser


async def update_user(user: CompleteUser) -> bool:
    stmt = User.update().where(User.c.user_id == user.user_id).values(name=user.name,
                                                                      password=user.password)
    return await execute_stmt_in_tran([stmt])
