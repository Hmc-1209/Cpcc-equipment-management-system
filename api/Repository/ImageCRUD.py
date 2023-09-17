from models import Image, Item
from schemas import BaseImage, CompleteImage
from database import db, execute_stmt_in_tran


async def get_image_by_id(image_id: int) -> CompleteImage:
    stmt = Image.select().where(Image.c.image_id == image_id)
    return await db.fetch_one(stmt)


async def create_new_image(new_image: BaseImage) -> bool:
    stmt = Image.insert().values(data=new_image.data.encode())
    return await execute_stmt_in_tran([stmt])


async def update_image(image_id: int, new_image: BaseImage) -> bool:
    stmt = Image.update().where(Image.c.image_id == image_id).values(data=new_image.data.encode())
    return await execute_stmt_in_tran([stmt])


async def delete_image_by_id(image_id: int) -> bool:
    stmt1 = Item.update().where(Item.c.image_id == image_id).values(image_id=None)
    stmt2 = Image.delete().where(Image.c.image_id == image_id)
    return await execute_stmt_in_tran([stmt1, stmt2])
