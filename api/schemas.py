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


# ----- Schemas for Item table -----
class BaseItem(BaseModel):
    name: str
    serial_number: str
    status: int = 1


class ItemList(BaseItem):
    item_id: int


class Item(BaseItem):
    description: str | None = None
    model: str
    image: str


class DetailItem(Item):
    class_name: str


class CompleteItem(Item):
    class_id: int

    class Config:
        from_attributes = True


class UpdateItem(BaseModel):
    name: str | None = None
    serial_number: str | None = None
    status: int | None = 1
    description: str | None = None
    model: str | None = None
    image: str | None = None
    class_id: int | None = None

    class Config:
        from_attributes = True


# ----- Schemas for RentalForm table -----
class BaseRentalForm(BaseModel):
    rental_id: int
    student_name: str
    student_id: str
    phone_number: str
    contact_info: str | None = None
    note: str | None = None
    lend_date: date
    due_date: date
    return_date: date | None = None
    rent: int
    pay_date: date
    item_id: int
