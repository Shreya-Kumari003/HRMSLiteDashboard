from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import IntegrityError
from django.db.models import Count, Q
from datetime import datetime, date
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer


class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            return Response(
                {'error': 'Employee ID already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class EmployeeDetailView(generics.RetrieveDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Failed to delete employee'}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class AttendanceListCreateView(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        queryset = Attendance.objects.all()
        employee_id = self.request.query_params.get('employee_id')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        
        if employee_id:
            queryset = queryset.filter(employee__employee_id=employee_id)
        
        if start_date:
            try:
                start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
                queryset = queryset.filter(date__gte=start_date)
            except ValueError:
                pass
        
        if end_date:
            try:
                end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
                queryset = queryset.filter(date__lte=end_date)
            except ValueError:
                pass
        
        return queryset

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            return Response(
                {'error': 'Attendance already marked for this date'}, 
                status=status.HTTP_400_BAD_REQUEST
            )


@api_view(['GET'])
def dashboard_summary(request):
    """Get dashboard summary statistics"""
    total_employees = Employee.objects.count()
    total_attendance_records = Attendance.objects.count()
    
    # Present/Absent counts for today
    today = date.today()
    today_present = Attendance.objects.filter(date=today, status='Present').count()
    today_absent = Attendance.objects.filter(date=today, status='Absent').count()
    
    # Employee attendance summary
    employee_stats = []
    for employee in Employee.objects.all():
        present_days = Attendance.objects.filter(
            employee=employee, 
            status='Present'
        ).count()
        total_days = Attendance.objects.filter(employee=employee).count()
        
        employee_stats.append({
            'employee_id': employee.employee_id,
            'full_name': employee.full_name,
            'department': employee.department,
            'present_days': present_days,
            'total_days': total_days,
            'attendance_percentage': round((present_days / total_days * 100) if total_days > 0 else 0, 1)
        })
    
    # Sort by attendance percentage
    employee_stats.sort(key=lambda x: x['attendance_percentage'], reverse=True)
    
    return Response({
        'total_employees': total_employees,
        'total_attendance_records': total_attendance_records,
        'today_present': today_present,
        'today_absent': today_absent,
        'today_date': today.strftime('%Y-%m-%d'),
        'employee_stats': employee_stats
    })