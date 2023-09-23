from models import Model, Item
from schemas import CompleteModel, DetailModel, UpdateModel, CreateModel
from sqlalchemy.sql import text
from database import db, execute_stmt_in_tran


async def get_model_by_id(model_id: int) -> DetailModel:
    stmt = Model.select().where(Model.c.model_id == model_id)
    return await db.fetch_one(stmt)


async def get_model_list() -> list[DetailModel]:
    stmt = Model.select()
    return await db.fetch_all(stmt)


async def get_model_by_name(name: str) -> DetailModel:
    stmt = Model.select().where(Model.c.model_name == name)
    return await db.fetch_one(stmt)


async def get_model_list_by_class(class_id: int) -> list[CompleteModel]:
    stmt = text(
        """
        SELECT i.model_id, model_name, COUNT(*) AS available FROM Item i 
        LEFT JOIN Model m ON (i.model_id = m.model_id) WHERE class_id = :class_id GROUP BY (i.model_id)
        """)
    stmt = stmt.bindparams(class_id=class_id)

    return await db.fetch_all(stmt)


async def create_model(new_model: CreateModel) -> bool:
    stmt = Model.insert().values(model_name=new_model.model_name,
                                 class_id=new_model.class_id)
    return await db.execute(stmt)


async def update_model_by_id(model_id: int, name: str) -> bool:
    stmt = Model.update().where(Model.c.model_id == model_id).values(model_name=name)
    return await execute_stmt_in_tran([stmt])


async def delete_model_by_id(model_id: int) -> bool:
    stmt1 = Item.update().where(Item.c.model_id == model_id).values(model_id=1)
    stmt2 = Model.delete().where(Model.c.model_id == model_id)
    return await execute_stmt_in_tran([stmt1, stmt2])
