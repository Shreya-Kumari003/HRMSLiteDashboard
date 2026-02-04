from django.db import models
from django.core.validators import EmailValidator


class Employee(models.Model):
    employee_id = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(validators=[EmailValidator()])
    department = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.employee_id} - {self.full_name}"

    class Meta:
        ordering = ['employee_id']


class Attendance(models.Model):
    ATTENDANCE_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ]
    
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=ATTENDANCE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.full_name} - {self.date} - {self.status}"

    class Meta:
        unique_together = ['employee', 'date']
        ordering = ['-date']