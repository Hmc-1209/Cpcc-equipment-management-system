from fastapi import APIRouter, Depends, status

from exception import data_rollback, no_such_image
from Authentication.JWTtoken import get_current_user
from Repository.ImageCRUD import *

router = APIRouter(prefix="/image", tags=["Image"])


@router.put("/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_new_image(image_id: int, new_image: BaseImage, _=Depends(get_current_user)) -> None:
    if not await get_image_by_id(image_id):
        raise no_such_image

    if not await update_image(image_id, new_image):
        raise data_rollback


@router.delete("/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_image(image_id: int, _=Depends(get_current_user)) -> None:
    if not await get_image_by_id(image_id):
        raise no_such_image

    if not await delete_image_by_id(image_id):
        raise data_rollback
