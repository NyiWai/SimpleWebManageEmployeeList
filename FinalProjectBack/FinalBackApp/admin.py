from django.contrib import admin
from .models import Employee
# Register your models here.
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'department', 'salary')

# Register your models here.

admin.site.register(Employee, EmployeeAdmin)