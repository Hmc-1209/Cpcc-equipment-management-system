from fastapi import APIRouter, Depends, status

from exception import bad_request, no_such_item_class, no_such_item, invalid_item_id
from Authentication.JWTtoken import get_current_user
from Repository.ItemCRUD import *
from Repository.ItemClassCRUD import get_class_by_id
from Repository.RentalFormCRUD import get_rental_form_by_item

router = APIRouter(prefix="/item", tags=["Item"])


@router.get("/")
async def item_list(_=Depends(get_current_user)) -> list[ItemList]:
    return await get_item_list()


@router.get("/{item_id}")
async def detail_item(item_id: int, _=Depends(get_current_user)) -> DetailItem:
    if not await get_item_by_id(item_id):
        raise no_such_item
    return await get_detail_item(item_id)


@router.post("/")
async def create_new_item(new_item: CompleteItem, _=Depends(get_current_user)) -> None:
    if not await get_class_by_id(new_item.class_id):
        raise no_such_item_class

    if not await create_item(new_item):
        raise bad_request


@router.patch("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_item(item_id: int, new_item: UpdateItem, _=Depends(get_current_user)) -> None:
    item = await get_item_by_id(item_id)
    if not item:
        raise no_such_item

    if not await get_class_by_id(new_item.class_id):
        raise no_such_item_class

    update_data = new_item.model_dump(exclude_unset=True, exclude_none=True)
    update = UpdateItem.model_validate(item).model_copy(update=update_data)

    if not await update_item_by_id(item_id, update):
        raise bad_request


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int) -> None:
    if not await get_item_by_id(item_id):
        raise no_such_item

    if await get_rental_form_by_item(item_id):
        raise invalid_item_id

    if not await delete_item_by_id(item_id):
        raise bad_request
