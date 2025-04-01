import React, { useState } from 'react';
import { excelApi, FormulaValidationResult, FormulaExplanationResult, FormulaDebugResult } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export function FormulaAssistant() {
  const [formula, setFormula] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<FormulaValidationResult | null>(null);
  const [explanationResult, setExplanationResult] = useState<FormulaExplanationResult | null>(null);
  const [debugResult, setDebugResult] = useState<FormulaDebugResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleValidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await excelApi.validateFormula(formula);
      setValidationResult(result);
    } catch (err) {
      setError('Failed to validate formula');
    } finally {
      setLoading(false);
    }
  };

  const handleExplain = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await excelApi.explainFormula(formula);
      setExplanationResult(result);
    } catch (err) {
      setError('Failed to explain formula');
    } finally {
      setLoading(false);
    }
  };

  const handleDebug = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await excelApi.debugFormula(formula, errorMessage);
      setDebugResult(result);
    } catch (err) {
      setError('Failed to debug formula');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Excel Formula Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter Excel formula..."
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleValidate} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Validate'}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="validate" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="validate">Validate</TabsTrigger>
                <TabsTrigger value="explain">Explain</TabsTrigger>
                <TabsTrigger value="debug">Debug</TabsTrigger>
              </TabsList>

              <TabsContent value="validate">
                {validationResult && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Valid:</span>
                      <span className={validationResult.is_valid ? 'text-green-500' : 'text-red-500'}>
                        {validationResult.is_valid ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Explanation:</span>
                      <p>{validationResult.explanation}</p>
                    </div>
                    {validationResult.issues.length > 0 && (
                      <div>
                        <span className="font-semibold">Issues:</span>
                        <ul className="list-disc pl-5">
                          {validationResult.issues.map((issue, index) => (
                            <li key={index}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {validationResult.best_practices.length > 0 && (
                      <div>
                        <span className="font-semibold">Best Practices:</span>
                        <ul className="list-disc pl-5">
                          {validationResult.best_practices.map((practice, index) => (
                            <li key={index}>{practice}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {validationResult.alternatives.length > 0 && (
                      <div>
                        <span className="font-semibold">Alternatives:</span>
                        <ul className="list-disc pl-5">
                          {validationResult.alternatives.map((alternative, index) => (
                            <li key={index}>{alternative}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="explain">
                <Button onClick={handleExplain} disabled={loading} className="mb-4">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Explain Formula'}
                </Button>
                {explanationResult && (
                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold">Steps:</span>
                      <ol className="list-decimal pl-5">
                        {explanationResult.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <span className="font-semibold">Components:</span>
                      <ul className="list-disc pl-5">
                        {explanationResult.components.map((component, index) => (
                          <li key={index}>
                            <span className="font-medium">{component.part}:</span> {component.explanation}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold">Use Cases:</span>
                      <ul className="list-disc pl-5">
                        {explanationResult.use_cases.map((useCase, index) => (
                          <li key={index}>{useCase}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold">Tips:</span>
                      <ul className="list-disc pl-5">
                        {explanationResult.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="debug">
                <div className="space-y-4">
                  <Input
                    placeholder="Error message (optional)"
                    value={errorMessage}
                    onChange={(e) => setErrorMessage(e.target.value)}
                    className="mb-4"
                  />
                  <Button onClick={handleDebug} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Debug Formula'}
                  </Button>
                  {debugResult && (
                    <div className="space-y-4">
                      <div>
                        <span className="font-semibold">Common Causes:</span>
                        <ul className="list-disc pl-5">
                          {debugResult.causes.map((cause, index) => (
                            <li key={index}>{cause}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-semibold">Fixes:</span>
                        <ul className="list-disc pl-5">
                          {debugResult.fixes.map((fix, index) => (
                            <li key={index}>{fix}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-semibold">Prevention Tips:</span>
                        <ul className="list-disc pl-5">
                          {debugResult.prevention.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-semibold">Alternative Approaches:</span>
                        <ul className="list-disc pl-5">
                          {debugResult.alternatives.map((alternative, index) => (
                            <li key={index}>{alternative}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 