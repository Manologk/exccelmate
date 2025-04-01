from rest_framework import serializers
from .models import ExcelTemplate, UserQuery, QueryHistory

class ExcelTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExcelTemplate
        fields = '__all__'

class UserQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuery
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

class QueryHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryHistory
        fields = '__all__'
        read_only_fields = ('user', 'created_at') 