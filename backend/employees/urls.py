from django.urls import path
from .views import EmployeeListCreateView, EmployeeDetailView, AttendanceListCreateView, dashboard_summary

urlpatterns = [
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('employees/<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    path('attendance/', AttendanceListCreateView.as_view(), name='attendance-list-create'),
    path('dashboard/', dashboard_summary, name='dashboard-summary'),
]