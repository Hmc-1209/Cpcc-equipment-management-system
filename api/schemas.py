from pydantic import BaseModel
# from datetime import date


# ----- Schemas for User table -----
class BaseUser(BaseModel):
    user_id: int
    name: str


class UpdateUser(BaseUser):
    password: str

#
#
# # ----- Schemas for Image table -----
# class BaseImage(BaseModel):
#     image_id: int
#     image_data: conbytes(byteorder='little', min_length=1)
#
#
# # ----- Schemas for Item_Class table -----
# class BaseItemClass(BaseModel):
#     item_class_id: int
#     item_class_name: str
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
