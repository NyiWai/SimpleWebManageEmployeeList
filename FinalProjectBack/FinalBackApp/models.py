from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Employee(models.Model):
    name = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    salary = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
        
