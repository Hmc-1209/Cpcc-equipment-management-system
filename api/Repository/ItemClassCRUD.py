from models import ItemClass, Model
from schemas import BaseItemClass, CompleteItemClass
from database import db, execute_stmt_in_tran


async def get_class_by_id(class_id: int) -> BaseItemClass:
    stmt = ItemClass.select().where(ItemClass.c.class_id == class_id)
    return await db.fetch_one(stmt)


async def get_class_by_name(name: str) -> BaseItemClass:
    stmt = ItemClass.select().where(ItemClass.c.class_name == name)
    return await db.fetch_one(stmt)


async def get_all_item_class() -> list[CompleteItemClass]:
    stmt = ItemClass.select()
    return await db.fetch_all(stmt)


async def create_new_class(name: str) -> bool:
    stmt = ItemClass.insert().values(class_name=name)
    return await execute_stmt_in_tran([stmt])


async def update_class(class_id: int, item_class: BaseItemClass):
    stmt = ItemClass.update().where(ItemClass.c.class_id == class_id).values(class_name=item_class.class_name)
    return await execute_stmt_in_tran([stmt])


async def delete_class(class_id: int) -> bool:
    stmt1 = Model.update().where(Model.c.class_id == class_id).values(class_id=1)
    stmt2 = ItemClass.delete().where(ItemClass.c.class_id == class_id)
    return await execute_stmt_in_tran([stmt1, stmt2])
