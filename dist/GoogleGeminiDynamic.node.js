"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleGeminiDynamic = void 0;
const google_genai_1 = require("@langchain/google-genai");

class GoogleGeminiDynamic {
    constructor() {
        this.description = {
            displayName: 'Google Gemini Dynamic',
            name: 'googleGeminiDynamic',
            icon: 'fa:robot',
            group: ['transform'],
            version: 1,
            description: 'Gemini Chat Model com Chave Dinâmica via Expressão',
            defaults: {
                name: 'Google Gemini Dynamic',
            },
            baseDescription: 'chat_model',
            properties: [
                {
                    displayName: 'API Key',
                    name: 'apiKey',
                    type: 'string',
                    typeOptions: { password: true },
                    default: '',
                    required: true,
                    description: 'Insira a expressão da sua API interna aqui',
                },
                {
                    displayName: 'Model Name',
                    name: 'model',
                    type: 'options',
                    options: [
                        { name: 'Gemini 1.5 Pro', value: 'gemini-1.5-pro' },
                        { name: 'Gemini 1.5 Flash', value: 'gemini-1.5-flash' },
                    ],
                    default: 'gemini-1.5-flash',
                },
                {
                    displayName: 'Temperature',
                    name: 'temperature',
                    type: 'number',
                    default: 0.7,
                    typeOptions: { minValue: 0, maxValue: 2 },
                },
            ],
        };
    }
    // Método supplyData é o que o AI Agent usa para identificar o modelo
    async supplyData() {
        const apiKey = this.getNodeParameter('apiKey', 0);
        const modelName = this.getNodeParameter('model', 0);
        const temperature = this.getNodeParameter('temperature', 0);
        const model = new google_genai_1.ChatGoogleGenerativeAI({
            apiKey: apiKey,
            model: modelName,
            temperature: temperature,
        });
        return {
            response: model,
        };
    }
}
exports.GoogleGeminiDynamic = GoogleGeminiDynamic;