import {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export class GoogleGeminiDynamic implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Google Gemini Dynamic',
		name: 'googleGeminiDynamic',
		icon: 'fa:robot',
		group: ['transform'], // Alterado para evitar erro de tipo
		version: 1,
		description: 'Gemini Chat Model com Chave Dinâmica via Expressão',
		defaults: {
			name: 'Google Gemini Dynamic',
		},
		// Isso aqui é o que faz o AI Agent aceitar o nó
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
				name: 'model', // O LangChain espera 'model'
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

async supplyData(this: any): Promise<any> {
		const apiKey = this.getNodeParameter('apiKey', 0) as string;
		const modelName = this.getNodeParameter('model', 0) as string;
		const temperature = this.getNodeParameter('temperature', 0) as number;

		const model = new ChatGoogleGenerativeAI({
			apiKey: apiKey,
			model: modelName,
			temperature: temperature,
		});

		return {
			response: model,
		};
	}
}