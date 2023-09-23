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
class UpdateModel(BaseModel):
    model_name: str

    class Config:
        from_attributes = True


class CreateModel(UpdateModel):
    class_id: int


class DetailModel(UpdateModel):
    model_id: int


class CompleteModel(DetailModel):
    available: int


# ----- Schemas for Item table -----
class BaseItem(BaseModel):
    item_name: str
    serial_number: str
    description: str


class ItemList(BaseItem):
    status: int
    item_id: int


class ItemDetailList(ItemList):
    image: str
    model_id: int


class CreateItem(BaseItem):
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
    student_name: str
    student_id: str
    lend_date: date
    due_date: date
    phone_number: str
    contact_info: str | None
    note: str | None
    pay_date: date


class RentalFormList(BaseRentalForm):
    rental_id: int
    return_date: date | None
    rent: int


class CreateRentalForm(BaseRentalForm):
    rent: int = 500
    item_id: int

    class Config:
        from_attributes = True


class CompleteRentalFormList(RentalFormList):
    item_name: str
    model_name: str


class UpdateRentalForm(BaseModel):
    return_date: date = None
    status: int

    class Config:
        from_attributes = True
