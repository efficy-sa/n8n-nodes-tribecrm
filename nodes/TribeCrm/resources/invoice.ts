import type { INodeProperties } from 'n8n-workflow';
import { getODataOptions } from './common';

export const invoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['invoice'] } },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many invoices',
				description: 'Retrieve a list of invoices',
				routing: {
					request: { method: 'GET', url: '/Activity_Invoice' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'value' } }],
					},
				},
			},
			{
				name: 'Update Phase',
				value: 'updatePhase',
				action: 'Update the phase of an invoice',
				description: 'Change the phase (status) of an invoice',
				routing: { request: { method: 'POST', url: '/Activity_Invoice' } },
			},
		],
		default: 'getAll',
	},
];

export const invoiceFields: INodeProperties[] = [
	// ── Get Many ────────────────────────────────────────────────────────────────
	getODataOptions('invoice', ['getAll']),

	// ── Update Phase ────────────────────────────────────────────────────────────
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['invoice'], operation: ['updatePhase'] } },
		description: 'ID (UUID) of the invoice to update',
		routing: { send: { type: 'body', property: 'ID' } },
	},
	{
		displayName: 'Phase ID',
		name: 'phaseId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['invoice'], operation: ['updatePhase'] } },
		description: 'ID (UUID) of the phase to set on the invoice (e.g. Paid, Sent)',
		routing: {
			send: {
				type: 'body',
				property: 'Phase',
				value: '={{ { "ID": $value } }}',
			},
		},
	},
];
