from rest_framework import serializers
from .models import Employee, Attendance


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'employee_id', 'full_name', 'email', 'department', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_employee_id(self, value):
        if Employee.objects.filter(employee_id=value).exists():
            raise serializers.ValidationError("Employee ID already exists.")
        return value


class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)
    employee_id = serializers.CharField(source='employee.employee_id', read_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'employee_name', 'employee_id', 'date', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate(self, data):
        employee = data.get('employee')
        date = data.get('date')
        
        if Attendance.objects.filter(employee=employee, date=date).exists():
            raise serializers.ValidationError("Attendance already marked for this employee on this date.")
        
        return data