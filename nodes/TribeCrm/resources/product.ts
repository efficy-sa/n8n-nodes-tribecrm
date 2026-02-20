import type { INodeProperties } from 'n8n-workflow';
import { getODataOptions } from './common';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['product'] } },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many products',
				description: 'Retrieve a list of products',
				routing: {
					request: { method: 'GET', url: '/Product' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'value' } }],
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const productFields: INodeProperties[] = [
	getODataOptions('product', ['getAll']),
];
