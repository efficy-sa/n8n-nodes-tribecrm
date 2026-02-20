import type { INodeProperties } from 'n8n-workflow';
import { getODataOptions } from './common';

const CUSTOMER_ENTITY = '/Relationship_Organization_CommercialRelationship_Customer';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['customer'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a customer',
				description: 'Create a new customer relationship',
				routing: { request: { method: 'POST', url: CUSTOMER_ENTITY } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many customers',
				description: 'Retrieve a list of customer relationships',
				routing: {
					request: { method: 'GET', url: CUSTOMER_ENTITY },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'value' } }],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a customer',
				description: 'Update an existing customer relationship by ID',
				routing: { request: { method: 'POST', url: CUSTOMER_ENTITY } },
			},
		],
		default: 'getAll',
	},
];

export const customerFields: INodeProperties[] = [
	// ── Get Many ────────────────────────────────────────────────────────────────
	getODataOptions('customer', ['getAll']),

	// ── Create ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Relation ID',
		name: 'relationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['customer'], operation: ['create'] } },
		description: 'ID (UUID) of the top-level Relation to link as customer',
		routing: {
			send: {
				type: 'body',
				property: 'Relation',
				value: '={{ { "ID": $value } }}',
			},
		},
	},
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['customer'], operation: ['create'] } },
		description: 'ID (UUID) of the organization to link as customer',
		routing: {
			send: {
				type: 'body',
				property: 'Organization',
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
		displayOptions: { show: { resource: ['customer'], operation: ['create'] } },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Display name of the customer relationship',
				routing: { send: { type: 'body', property: 'Name' } },
			},
			{
				displayName: 'Payment Term (Days)',
				name: 'paymentTermInDays',
				type: 'number',
				default: 30,
				routing: { send: { type: 'body', property: 'PaymentTermInDays' } },
			},
		],
	},

	// ── Update ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['customer'], operation: ['update'] } },
		description: 'ID (UUID) of the customer relationship to update',
		routing: { send: { type: 'body', property: 'ID' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['customer'], operation: ['update'] } },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'Name' } },
			},
			{
				displayName: 'Payment Term (Days)',
				name: 'paymentTermInDays',
				type: 'number',
				default: 30,
				routing: { send: { type: 'body', property: 'PaymentTermInDays' } },
			},
		],
	},
];
