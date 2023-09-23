from fastapi import APIRouter, Depends, status

from exception import bad_request, no_such_model, no_such_item, invalid_item_id
from Authentication.JWTtoken import get_current_user
from Repository.ItemCRUD import *
from Repository.ModelCRUD import get_model_by_id
from Repository.RentalFormCRUD import check_form_by_id

router = APIRouter(prefix="/item", tags=["Item"])


@router.get("/")
async def item_list(_=Depends(get_current_user)) -> list[ItemDetailList]:
    return await get_item_list()


@router.get("/by_model/{model_id}")
async def item_list_by_model(model_id: int, _=Depends(get_current_user)) -> list[ItemList]:
    if not await get_model_by_id(model_id):
        raise no_such_model

    return await get_item_list_by_model(model_id)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_new_item(new_item: CreateItem, _=Depends(get_current_user)) -> None:
    if not await get_model_by_id(new_item.model_id):
        raise no_such_model

    if not await create_item(new_item):
        raise bad_request


@router.patch("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_item(item_id: int, new_item: UpdateItem, _=Depends(get_current_user)) -> None:
    item = await get_item_by_id(item_id=item_id)
    if not item:
        raise no_such_item

    update_data = new_item.model_dump(exclude_unset=True, exclude_none=True)
    update = UpdateItem.model_validate(item).model_copy(update=update_data)

    if not await update_item_by_id(item_id, update):
        raise bad_request


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int, _=Depends(get_current_user)) -> None:
    if not await get_item_by_id(item_id):
        raise no_such_item

    if await check_form_by_id(item_id):
        raise invalid_item_id

    if not await delete_item_by_id(item_id):
        raise bad_request
