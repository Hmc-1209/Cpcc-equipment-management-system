from pydantic import BaseModel
from datetime import date


# ----- Schemas for User table -----
class BaseUser(BaseModel):
    name: str | None = None
    password: str | None = None


class CompleteUser(BaseUser):
    user_id: int

    class Config:
        from_attributes = True


# ----- Schemas for Item_Class table -----
class BaseItemClass(BaseModel):
    class_name: str

    class Config:
        from_attributes = True


class CompleteItemClass(BaseItemClass):
    class_id: int


# ----- Schemas for Model table -----
class DetailModel(BaseModel):
    model_id: int
    model_name: str

    class Config:
        from_attributes = True


class CompleteModel(DetailModel):
    available: int


# ----- Schemas for Item table -----
class BaseItem(BaseModel):
    name: str
    serial_number: str
    description: str


class ItemList(BaseItem):
    status: int
    item_id: int


class ItemDetailList(ItemList):
    image: str


class CreateItem(BaseItem):
    status: int = 1
    model_id: int
    image: str

    class Config:
        from_attributes = True


class UpdateItem(BaseModel):
    description: str | None = None
    status: int | None = None

    class Config:
        from_attributes = True


# ----- Schemas for Rental Form table -----
class BaseRentalForm(BaseModel):
    student_id: str
    student_name: str
    lend_date: date
    due_date: date
    status: int


class RentalFormList(BaseRentalForm):
    phone_number: str
    contact_info: str | None
    note: str | None
    return_date: date | None
    rent: int
    pay_date: date

# class RentalForm(BaseRentalForm):
#     student_id: str
#     phone_number: str
#     contact_info: str | None = None
#     note: str | None = None
#     pay_date: date
#
#
# class DetailRentalForm(RentalForm):
#     return_date: date | None = None
#     rent: int
#     item_name: str
#
#
# class CreateRentalForm(RentalForm):
#     item_id: int
#
#     class Config:
#         from_attributes = True


# class UpdateRentalForm(BaseRentalForm):
#     student_name: str | None = None
#     student_id: str | None = None
#     phone_number: str | None = None
#     contact_info: str | None = None
#     note: str | None = None
#     lend_date: date | None = None
#     due_date: date | None = None
#     return_date: date | None = None
#     rent: int | None = None
#     pay_date: date | None = None
#     status: int | None = None
#     item_id: int | None = None
#
#     class Config:
#         from_attributes = True
