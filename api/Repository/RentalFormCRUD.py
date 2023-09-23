from models import RentalForm, Item, Model
from schemas import BaseRentalForm, RentalFormList, UpdateRentalForm, CompleteRentalFormList, CreateRentalForm
from database import db, execute_stmt_in_tran


async def get_closed_rental_form_by_item(item_id: int) -> list[RentalFormList]:
    stmt = RentalForm.select().where(RentalForm.c.item_id == item_id).where(RentalForm.c.status == 2)
    return await db.fetch_all(stmt)


async def check_form_by_item(item_id: int) -> BaseRentalForm:
    stmt = RentalForm.select().where(RentalForm.c.item_id == item_id)
    return await db.fetch_one(stmt)


async def get_rental_form_by_id(rental_id: int) -> BaseRentalForm:
    stmt = RentalForm.select().where(RentalForm.c.rental_id == rental_id)
    return await db.fetch_one(stmt)


async def get_rental_form_by_status(status: int) -> list[CompleteRentalFormList]:
    stmt = (RentalForm
            .join(Item, RentalForm.c.item_id == Item.c.item_id)
            .join(Model, Item.c.model_id == Model.c.model_id)
            .select().where(RentalForm.c.status == status))
    return await db.fetch_all(stmt)


async def create_rental_form(new_form: CreateRentalForm) -> bool:
    stmt = RentalForm.insert().values(student_name=new_form.student_name,
                                      student_id=new_form.student_id,
                                      phone_number=new_form.phone_number,
                                      contact_info=new_form.contact_info,
                                      note=new_form.note,
                                      lend_date=new_form.lend_date,
                                      due_date=new_form.due_date,
                                      rent=new_form.rent,
                                      pay_date=new_form.pay_date,
                                      status=0,
                                      item_id=new_form.item_id)
    return await execute_stmt_in_tran([stmt])


async def update_rental_form_by_id(rental_id: int, new_form: UpdateRentalForm) -> bool:
    stmt = RentalForm.update().where(RentalForm.c.rental_id == rental_id).values(return_date=new_form.return_date,
                                                                                 status=new_form.status)
    return await execute_stmt_in_tran([stmt])
