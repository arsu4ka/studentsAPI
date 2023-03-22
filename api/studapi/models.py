from django.db import models
from .validators import validate_year

# Create your models here.
class Student(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    year_joined = models.IntegerField(validators=[validate_year])
    date_of_birth = models.DateField()
    faculty = models.CharField(max_length=70)
    country = models.CharField(max_length=50, blank=True)