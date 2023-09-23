from models import Item
from schemas import BaseItem, ItemList, ItemDetailList, CreateItem, UpdateItem
from database import db, execute_stmt_in_tran


async def get_item_list() -> list[ItemDetailList]:
    stmt = Item.select()
    return await db.fetch_all(stmt)


async def get_item_by_id(item_id: int) -> BaseItem:
    stmt = Item.select().where(Item.c.item_id == item_id)
    return await db.fetch_one(stmt)


async def get_item_list_by_model(model_id: int) -> list[ItemList]:
    stmt = Item.select().where(Item.c.model_id == model_id)
    return await db.fetch_all(stmt)


async def create_item(new_item: CreateItem) -> bool:
    stmt = Item.insert().values(item_name=new_item.item_name,
                                description=new_item.description,
                                serial_number=new_item.serial_number,
                                status=0,
                                model_id=new_item.model_id,
                                image=new_item.image.encode())
    return await execute_stmt_in_tran([stmt])


async def update_item_by_id(item_id: int, new_item: UpdateItem) -> bool:
    stmt = Item.update().where(Item.c.item_id == item_id).values(description=new_item.description,
                                                                 status=new_item.status)
    return await execute_stmt_in_tran([stmt])


async def delete_item_by_id(item_id: int) -> bool:
    stmt = Item.delete().where(Item.c.item_id == item_id)
    return await execute_stmt_in_tran([stmt])
