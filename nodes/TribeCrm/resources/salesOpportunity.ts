import type { INodeProperties } from 'n8n-workflow';
import { getODataOptions } from './common';

export const salesOpportunityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['salesOpportunity'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a sales opportunity',
				description: 'Create a new sales opportunity',
				routing: { request: { method: 'POST', url: '/Activity_SalesOpportunity' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many sales opportunities',
				description: 'Retrieve a list of sales opportunities',
				routing: {
					request: { method: 'GET', url: '/Activity_SalesOpportunity' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'value' } }],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a sales opportunity',
				description: 'Update an existing sales opportunity by ID',
				routing: { request: { method: 'POST', url: '/Activity_SalesOpportunity' } },
			},
		],
		default: 'getAll',
	},
];

export const salesOpportunityFields: INodeProperties[] = [
	// ── Get Many ────────────────────────────────────────────────────────────────
	getODataOptions('salesOpportunity', ['getAll']),

	// ── Create ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['salesOpportunity'], operation: ['create'] } },
		description: 'Subject / title of the sales opportunity',
		routing: { send: { type: 'body', property: 'Subject' } },
	},
	{
		displayName: 'Relationship ID',
		name: 'relationshipId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['salesOpportunity'], operation: ['create'] } },
		description: 'ID (UUID) of the customer or contact relationship to link this opportunity to',
		routing: {
			send: {
				type: 'body',
				property: 'Relationship',
				value: '={{ { "ID": $value } }}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['salesOpportunity'], operation: ['create'] } },
		options: [
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				typeOptions: { numberPrecision: 2 },
				default: 0,
				description: 'Expected value of the opportunity',
				routing: { send: { type: 'body', property: 'Amount' } },
			},
			{
				displayName: 'Expected Close Date',
				name: 'expectedCloseDate',
				type: 'dateTime',
				default: '',
				routing: { send: { type: 'body', property: 'ExpectedCloseDate' } },
			},
			{
				displayName: 'Phase ID',
				name: 'phaseId',
				type: 'string',
				default: '',
				description: 'ID (UUID) of the pipeline phase',
				routing: {
					send: {
						type: 'body',
						property: 'Phase',
						value: '={{ { "ID": $value } }}',
					},
				},
			},
		],
	},

	// ── Update ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Sales Opportunity ID',
		name: 'salesOpportunityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['salesOpportunity'], operation: ['update'] } },
		description: 'ID (UUID) of the sales opportunity to update',
		routing: { send: { type: 'body', property: 'ID' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['salesOpportunity'], operation: ['update'] } },
		options: [
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				typeOptions: { numberPrecision: 2 },
				default: 0,
				routing: { send: { type: 'body', property: 'Amount' } },
			},
			{
				displayName: 'Expected Close Date',
				name: 'expectedCloseDate',
				type: 'dateTime',
				default: '',
				routing: { send: { type: 'body', property: 'ExpectedCloseDate' } },
			},
			{
				displayName: 'Phase ID',
				name: 'phaseId',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Phase',
						value: '={{ { "ID": $value } }}',
					},
				},
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'Subject' } },
			},
		],
	},
];
