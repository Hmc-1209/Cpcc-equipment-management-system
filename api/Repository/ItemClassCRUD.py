from models import ItemClass, Item
from schemas import BaseItemClass, CompleteItemClass
from database import db


async def get_specific_class(name: str) -> BaseItemClass:
    stmt = ItemClass.select().where(ItemClass.c.name == name)
    return await db.fetch_one(stmt)


async def get_all_item_class() -> list[CompleteItemClass]:
    stmt = ItemClass.select()
    return await db.fetch_all(stmt)


async def create_new_class(name: str) -> bool:
    stmt = ItemClass.insert().values(name=name)
    tran = db.transaction()

    try:
        tran.start()
        await db.execute(stmt)
        tran.commit()
        return True

    except NotImplementedError:
        tran.rollback()
        return False


async def update_class(class_id: int, item_class: BaseItemClass):
    stmt = ItemClass.update().where(ItemClass.c.class_id == class_id).values(name=item_class.name)
    tran = db.transaction()

    try:
        tran.start()
        await db.execute(stmt)
        tran.commit()
        return True

    except NotImplementedError:
        tran.rollback()
        return False


async def delete_class(class_id: int) -> bool:
    stmt1 = Item.update().where(ItemClass.c.class_id == class_id).values(class_id=1)
    stmt2 = ItemClass.delete().where(ItemClass.c.class_id == class_id)

    tran = db.transaction()

    try:
        tran.start()
        await db.execute(stmt1)
        await db.execute(stmt2)
        tran.commit()
        return True

    except NotImplementedError:
        tran.rollback()
        return False
