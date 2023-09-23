from models import RentalForm
from schemas import RentalFormList
from database import db


async def get_rental_form_by_item(item_id: int) -> list[RentalFormList]:
    stmt = RentalForm.select().where(RentalForm.c.item_id == item_id)
    return await db.fetch_all(stmt)
