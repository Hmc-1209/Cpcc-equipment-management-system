from fastapi import APIRouter, Depends, HTTPException, status
# from typing import Annotated
#
# from schemas import UpdateUser
# # from Repository.UserCRUD import get_spec_user_id_by_name, get_all_user, create_new_user, update_user_info, delete_spec_user
# # from Repository.CommonCRUD import check_user
# from Authentication.JWTtoken import get_current_user
#
#
router = APIRouter(prefix="/user", tags=["User"])
#
#
# @router.put("/update_info")
# async def update_user(user: UpdateUser, current_user: Annotated[UpdateUser, Depends(get_current_user)]) -> None:
#     """The endpoint of updating a user's info"""
#
#     # origin_user = await check_user(user.user_id)
#
#     if user.user_id != current_user.user_id:
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
#                             detail="Access denied. You are not allowed to update other user's info.")
#
#     # return await update_user_info(user, origin_user.user_name)
#
