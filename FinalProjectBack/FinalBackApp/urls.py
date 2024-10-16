from django.urls import path
from .views import employee_getInfo, employee_update_final, employee_update_edit, employee_update, base, create_session, delete_employee, delete_list

urlpatterns = [
    path('', base),
    path('get_info/', employee_getInfo, name='get_all_info'),
    path('delete_employee/<int:employee_id>/', delete_employee, name='delete_employee'),
    path('delete/', delete_list, name='delete'),
    path('update/', employee_update, name='employee_update'),
    path('update/<int:employee_id>', employee_update_edit, name='employee_update_edit'),
    path('update/updatefinal/<int:employee_id>', employee_update_final, name='employee_update_final'),
    path('create/', create_session, name='create_session'),
]
