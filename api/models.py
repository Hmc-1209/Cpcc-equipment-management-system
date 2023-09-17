import sqlalchemy
from sqlalchemy import Column, ForeignKey
from database import metadata

User = sqlalchemy.Table(
    "User",
    metadata,
    Column("user_id", sqlalchemy.INTEGER, primary_key=True, index=True),
    Column("name", sqlalchemy.VARCHAR(50), nullable=False, unique=True),
    Column("password", sqlalchemy.CHAR(64), nullable=False),
)

ItemClass = sqlalchemy.Table(
    "ItemClass",
    metadata,
    Column("class_id", sqlalchemy.INTEGER, primary_key=True, index=True),
    Column("name", sqlalchemy.VARCHAR(25), nullable=False, unique=True)
)

Image = sqlalchemy.Table(
    "Image",
    metadata,
    Column("image_id", sqlalchemy.INTEGER, primary_key=True, index=True),
    Column("data", sqlalchemy.BLOB, nullable=False)
)

Item = sqlalchemy.Table(
    "Item",
    metadata,
    Column("item_id", sqlalchemy.INTEGER, primary_key=True, index=True),
    Column("name", sqlalchemy.VARCHAR(25), nullable=False),
    Column("description", sqlalchemy.VARCHAR(255)),
    Column("serial_number", sqlalchemy.VARCHAR(25), nullable=False),
    Column("model", sqlalchemy.VARCHAR(25), nullable=False),
    Column("status", sqlalchemy.INTEGER, nullable=False),
    Column("class_id", sqlalchemy.INTEGER, ForeignKey("ItemClass.class_id"), nullable=False),
    Column("image_id", sqlalchemy.INTEGER, ForeignKey("Image.image_id"))
)

RentalForm = sqlalchemy.Table(
    "RentalForm",
    metadata,
    Column("rental_id", sqlalchemy.INTEGER, primary_key=True, index=True),
    Column("student_name", sqlalchemy.VARCHAR(16), nullable=False),
    Column("student_id", sqlalchemy.CHAR(9), nullable=False),
    Column("phone_number", sqlalchemy.CHAR(10), nullable=False),
    Column("contact_info", sqlalchemy.VARCHAR(55)),
    Column("note", sqlalchemy.VARCHAR(55)),
    Column("lend_date", sqlalchemy.DATE, nullable=False),
    Column("due_date", sqlalchemy.DATE, nullable=False),
    Column("return_date", sqlalchemy.DATE),
    Column("rent", sqlalchemy.INTEGER, nullable=False),
    Column("pay_date", sqlalchemy.DATE, nullable=False),
    Column("status", sqlalchemy.INTEGER, nullable=False),
    Column("item_id", sqlalchemy.INTEGER, ForeignKey("Item.item_id"), nullable=False)
)
