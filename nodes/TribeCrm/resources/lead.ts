import type { INodeProperties } from 'n8n-workflow';
import { getODataOptions } from './common';

const LEAD_ENTITY = '/Relationship_Organization_CommercialRelationship_Lead';

export const leadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['lead'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a lead',
				description: 'Create a new lead relationship',
				routing: { request: { method: 'POST', url: LEAD_ENTITY } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many leads',
				description: 'Retrieve a list of lead relationships',
				routing: {
					request: { method: 'GET', url: LEAD_ENTITY },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'value' } }],
					},
				},
			},
			{
				name: 'Upgrade to Customer',
				value: 'upgradeToCustomer',
				action: 'Upgrade a lead to customer',
				description: 'Convert an existing lead into a customer relationship',
				routing: { request: { method: 'POST', url: LEAD_ENTITY } },
			},
		],
		default: 'getAll',
	},
];

export const leadFields: INodeProperties[] = [
	// ── Get Many ────────────────────────────────────────────────────────────────
	getODataOptions('lead', ['getAll']),

	// ── Create ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Relation ID',
		name: 'relationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['lead'], operation: ['create'] } },
		description: 'ID (UUID) of the top-level Relation to link as a lead',
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
		displayOptions: { show: { resource: ['lead'], operation: ['create'] } },
		description: 'ID (UUID) of the organization to link as a lead',
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
		displayOptions: { show: { resource: ['lead'], operation: ['create'] } },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Display name of the lead relationship',
				routing: { send: { type: 'body', property: 'Name' } },
			},
		],
	},

	// ── Upgrade to Customer ──────────────────────────────────────────────────────
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['lead'], operation: ['upgradeToCustomer'] } },
		description: 'ID (UUID) of the lead relationship to upgrade',
		routing: { send: { type: 'body', property: 'ID' } },
	},
	{
		displayName: 'Upgrade Type',
		name: 'upgradeType',
		type: 'options',
		required: true,
		default: 'Relationship_Organization_CommercialRelationship_Customer',
		displayOptions: { show: { resource: ['lead'], operation: ['upgradeToCustomer'] } },
		description: 'Target relationship type to upgrade the lead to',
		options: [
			{
				name: 'Customer',
				value: 'Relationship_Organization_CommercialRelationship_Customer',
			},
		],
		routing: { send: { type: 'body', property: '_UpgradeType' } },
	},
];
