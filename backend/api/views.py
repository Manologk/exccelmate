from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import ExcelTemplate, UserQuery, QueryHistory
from .gemini_client import ExcelGeminiClient
from .serializers import ExcelTemplateSerializer, UserQuerySerializer

# Create your views here.


def excel_mate(request):
    query = request.data.get("query", "")
    response = f"AI-generated Excel formula for: {query}"
    return Response({"response": Response})

class ExcelAssistantViewSet(viewsets.ViewSet):
    gemini_client = ExcelGeminiClient()

    @action(detail=False, methods=['post'])
    def query(self, request):
        query = request.data.get('query')
        if not query:
            return Response(
                {'error': 'Query is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Process query with Gemini
            response = self.gemini_client.process_excel_query(query)
            
            # Save query and response without user
            UserQuery.objects.create(
                query=query,
                response=response,
                category='general'  # This should be determined based on the query content
            )
            
            # Save to history without user
            QueryHistory.objects.create(
                query=query,
                response=response
            )
            
            return Response({'response': response})
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def validate_formula(self, request):
        formula = request.data.get('formula')
        if not formula:
            return Response(
                {'error': 'Formula is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            result = self.gemini_client.validate_formula(formula)
            if 'error' in result:
                return Response(
                    {'error': result['error']}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            return Response(result)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def explain_formula(self, request):
        formula = request.data.get('formula')
        if not formula:
            return Response(
                {'error': 'Formula is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            result = self.gemini_client.explain_formula(formula)
            if 'error' in result:
                return Response(
                    {'error': result['error']}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            return Response(result)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def debug_formula(self, request):
        formula = request.data.get('formula')
        error_message = request.data.get('error_message')
        
        if not formula:
            return Response(
                {'error': 'Formula is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            result = self.gemini_client.debug_formula(formula, error_message)
            if 'error' in result:
                return Response(
                    {'error': result['error']}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            return Response(result)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ExcelTemplateViewSet(viewsets.ModelViewSet):
    queryset = ExcelTemplate.objects.all()
    serializer_class = ExcelTemplateSerializer

    def get_queryset(self):
        queryset = ExcelTemplate.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset

    @action(detail=True, methods=['post'])
    def use_template(self, request, pk=None):
        template = self.get_object()
        # Here you would implement the logic to use the template
        return Response({'message': f'Template {template.name} used successfully'})