from django.shortcuts import render
from .models import Employee
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .forms import EmployeeForm
from django.template import loader
import logging
logger = logging.getLogger(__name__)

from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EmployeeSerializer
from .models import Employee

class TodoView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

def base(request):
    return render(request, 'base.html')

def employee_getInfo(request):
    employees = Employee.objects.all()
    return render(request, "emp_list.html", {'employees': employees}) #{'employees': employees}

def employee_create(request):
    return HttpResponseRedirect(reverse('create'))

def delete_list(request):
    employees = Employee.objects.all().values()
    template = loader.get_template('index.html')
    context = {
        'employees': employees,
    }
    return HttpResponse(template.render(context, request))

def delete_employee(request, employee_id):
    employee = Employee.objects.get(id=employee_id)
    employee.delete()
    return HttpResponseRedirect(reverse('delete'))

def employee_update(request):
    employees = Employee.objects.all().values()
    template = loader.get_template('employee_update.html')
    context = {
        'employees': employees,
    }
    return HttpResponse(template.render(context, request))

def employee_update_edit(request, employee_id):
    employees = Employee.objects.get(id=employee_id)
    template = loader.get_template('employee_update_edit.html')
    context = {
        'employee': employees,
    }
    return HttpResponse(template.render(context, request))
    
def employee_update_final(request, employee_id):         
    name = request.POST['name']
    department = request.POST['department']
    salary = request.POST['salary']
    employees = Employee.objects.get(id=employee_id)
    employees.name= name
    employees.department = department
    employees.salary = salary
    employees.save()
    return HttpResponseRedirect(reverse('employee_update')) # employee_update is not name url, it's method name

def create_session(request):
    try:
        if request.method == 'POST':
            form = EmployeeForm(request.POST)
            if form.is_valid():
                form.save()
                return render(request, 'emp_create.html', {'form': form})
        else: 
            form = EmployeeForm()
        return render(request, 'emp_create.html', {'form': form})
            
    except Exception as e:
        logger.error(f"Error in create_session view: {e}")

