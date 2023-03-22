from django.core.exceptions import ValidationError
import datetime

def validate_year(value):
    if value < 2000 or value > datetime.date.today().year:
        raise ValidationError("Incorrect year", "400")