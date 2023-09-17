from pydantic import BaseModel
# from datetime import date


# ----- Schemas for User table -----
class BaseUser(BaseModel):
    name: str | None = None
    password: str | None = None


class CompleteUser(BaseUser):
    user_id: int

    class Config:
        from_attributes = True


# ----- Schemas for Image table -----
class BaseImage(BaseModel):
    data: str

    class Config:
        from_attributes = True


class CompleteImage(BaseImage):
    image_id: int


# ----- Schemas for Item_Class table -----
class BaseItemClass(BaseModel):
    name: str

    class Config:
        from_attributes = True


class CompleteItemClass(BaseItemClass):
    class_id: int
#
#
# # ----- Schemas for Item table -----
# class BaseItem(BaseModel):
#     item_id: int
#     item_name: str
#     item_description: str
#     item_serial_number: str
#     item_status: int
#     item_class_id: int
#     image_id: int
#
#
# # ----- Schemas for RentalForm table -----
# class BaseRentalForm(BaseModel):
#     rental_id: int
#     renter_name: str
#     renter_student_id: str
#     renter_phone_number: str
#     renter_contact_info: str
#     rental_note: str
#     rental_item_lend_date: date
#     rental_item_due_date: date
#     rental_rent: int
#     rental_rent_pay_date: date
#     rental_item_return_date: date
#     rental_item_id: int
