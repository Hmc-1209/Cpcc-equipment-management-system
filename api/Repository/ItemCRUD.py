from models import Item, ItemClass
from schemas import BaseItem, ItemList, ItemDetailList
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

#
#
# async def get_detail_item(item_id: int) -> DetailItem:
#     stmt = (Item
#             .join(ItemClass, Item.c.class_id == ItemClass.c.class_id)
#             .select().where(Item.c.item_id == item_id))
#
#     return await db.fetch_one(stmt)
#
#
# async def create_item(new_item: CompleteItem) -> bool:
#     stmt = Item.insert().values(name=new_item.name,
#                                 description=new_item.description,
#                                 serial_number=new_item.serial_number,
#                                 model=new_item.model,
#                                 status=new_item.status,
#                                 class_id=new_item.class_id,
#                                 image=new_item.image.encode())
#     return await execute_stmt_in_tran([stmt])
#
#
# async def update_item_by_id(item_id: int, item: UpdateItem) -> bool:
#     stmt = Item.update().where(Item.c.item_id == item_id).values(name=item.name,
#                                                                  serial_number=item.serial_number,
#                                                                  status=item.status,
#                                                                  description=item.description,
#                                                                  model=item.model,
#                                                                  image=item.image.encode(),
#                                                                  class_id=item.class_id)
#     return await execute_stmt_in_tran([stmt])
#
#
# async def delete_item_by_id(item_id: int) -> bool:
#     stmt = Item.delete().where(Item.c.item_id == item_id)
#     return await execute_stmt_in_tran([stmt])
