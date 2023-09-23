from models import Model
from schemas import CompleteModel, DetailModel
from sqlalchemy.sql import text
from database import db


async def get_model_by_id(model_id: int) -> DetailModel:
    stmt = Model.select().where(Model.c.model_id == model_id)
    return await db.fetch_one(stmt)


async def get_model_list_by_class(class_id: int) -> list[CompleteModel]:
    stmt = text(
        """
        SELECT i.model_id, model_name, COUNT(*) AS available FROM Item i 
        LEFT JOIN Model m ON (i.model_id = m.model_id) WHERE class_id = :class_id GROUP BY (i.model_id)
        """)
    stmt = stmt.bindparams(class_id=class_id)

    return await db.fetch_all(stmt)
