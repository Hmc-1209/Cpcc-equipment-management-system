from models import Model
from schemas import CompleteModel
from database import db


async def get_model_by_id(model_id: int) -> CompleteModel:
    stmt = Model.select().where(Model.c.model_id == model_id)
    return await db.fetch_one(stmt)


async def get_model_list_by_class(class_id: int) -> list[CompleteModel]:
    stmt = Model.select().where(Model.c.class_id == class_id)
    return await db.fetch_all(stmt)
