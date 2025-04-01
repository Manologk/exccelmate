from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExcelAssistantViewSet, ExcelTemplateViewSet

router = DefaultRouter()
router.register(r'excel-assistant', ExcelAssistantViewSet, basename='excel-assistant')
router.register(r'templates', ExcelTemplateViewSet, basename='excel-templates')

urlpatterns = [
    path('', include(router.urls)),
]