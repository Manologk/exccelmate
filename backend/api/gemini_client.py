import os
from google import genai
from google.genai import types
import json

class ExcelGeminiClient:
    def __init__(self):
        # Configure the Gemini API
        self.client = genai.Client(api_key='AIzaSyBnnuVToM1Tw6Hiox-a7PnBkfBEDw5MqD4')
        self.model = "gemini-1.5-pro"
        
    def _build_excel_prompt(self, query: str, context: dict = None) -> str:
        base_prompt = """You are an Excel expert assistant. Your role is to help users with Excel-related tasks.
        Provide clear, concise, and accurate responses. Include examples where appropriate.
        Focus on best practices and explain your reasoning.
        
        User Query: {query}
        """
        
        if context:
            context_str = "\n".join([f"{k}: {v}" for k, v in context.items()])
            base_prompt += f"\nContext:\n{context_str}"
            
        return base_prompt.format(query=query)
    
    def process_excel_query(self, query: str, context: dict = None) -> str:
        prompt = self._build_excel_prompt(query, context)
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.7,
                    top_p=0.8,
                    top_k=40,
                    max_output_tokens=2048,
                )
            )
            return response.text
        except Exception as e:
            return f"Error processing query: {str(e)}"
    
    def validate_formula(self, formula: str) -> dict:
        prompt = f"""Analyze this Excel formula and provide detailed feedback:
        Formula: {formula}
        
        Please provide a structured response with:
        1. Is the formula valid? (true/false)
        2. What does it do? (detailed explanation)
        3. Potential issues or improvements
        4. Best practices to consider
        5. Alternative approaches if applicable
        
        Format your response as JSON with these keys:
        - is_valid: boolean
        - explanation: string
        - issues: array of strings
        - best_practices: array of strings
        - alternatives: array of strings
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    top_p=0.8,
                    top_k=40,
                    max_output_tokens=1024,
                )
            )
            
            # Try to parse the response as JSON
            try:
                result = json.loads(response.text)
            except json.JSONDecodeError:
                # If not valid JSON, create a structured response from the text
                result = {
                    "is_valid": True,  # Default to True if we can't determine
                    "explanation": response.text,
                    "issues": [],
                    "best_practices": [],
                    "alternatives": []
                }
            
            return result
        except Exception as e:
            return {
                "is_valid": False,
                "explanation": f"Error validating formula: {str(e)}",
                "issues": [],
                "best_practices": [],
                "alternatives": []
            }

    def explain_formula(self, formula: str) -> dict:
        prompt = f"""Explain this Excel formula in detail:
        Formula: {formula}
        
        Please provide:
        1. A step-by-step explanation of how the formula works
        2. What each part of the formula does
        3. Common use cases
        4. Tips for using this formula effectively
        
        Format your response as JSON with these keys:
        - steps: array of strings
        - components: array of objects with 'part' and 'explanation' keys
        - use_cases: array of strings
        - tips: array of strings
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    top_p=0.8,
                    top_k=40,
                    max_output_tokens=1024,
                )
            )
            
            # Try to parse the response as JSON
            try:
                result = json.loads(response.text)
            except json.JSONDecodeError:
                # If not valid JSON, create a structured response from the text
                result = {
                    "steps": [response.text],
                    "components": [],
                    "use_cases": [],
                    "tips": []
                }
            
            return result
        except Exception as e:
            return {
                "error": str(e),
                "steps": [],
                "components": [],
                "use_cases": [],
                "tips": []
            }

    def debug_formula(self, formula: str, error_message: str = None) -> dict:
        prompt = f"""Debug this Excel formula:
        Formula: {formula}
        Error Message: {error_message if error_message else 'No specific error message provided'}
        
        Please provide:
        1. Common causes of the error
        2. How to fix the formula
        3. Prevention tips
        4. Alternative approaches
        
        Format your response as JSON with these keys:
        - causes: array of strings
        - fixes: array of strings
        - prevention: array of strings
        - alternatives: array of strings
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    top_p=0.8,
                    top_k=40,
                    max_output_tokens=1024,
                )
            )
            
            # Try to parse the response as JSON
            try:
                result = json.loads(response.text)
            except json.JSONDecodeError:
                # If not valid JSON, create a structured response from the text
                result = {
                    "causes": [],
                    "fixes": [response.text],
                    "prevention": [],
                    "alternatives": []
                }
            
            return result
        except Exception as e:
            return {
                "error": str(e),
                "causes": [],
                "fixes": [],
                "prevention": [],
                "alternatives": []
            }