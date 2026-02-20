import type { INodeProperties } from 'n8n-workflow';
import { getODataOptions } from './common';

export const organizationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['organization'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create an organization',
				description: 'Create a new organization in Tribe CRM',
				routing: { request: { method: 'POST', url: '/Relation_Organization' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an organization',
				description: 'Delete an organization by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: "=/Relation_Organization({{$parameter['organizationId']}})",
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many organizations',
				description: 'Retrieve a list of organizations',
				routing: {
					request: { method: 'GET', url: '/Relation_Organization' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'value' } }],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an organization',
				description: 'Update an existing organization by ID',
				routing: { request: { method: 'POST', url: '/Relation_Organization' } },
			},
		],
		default: 'getAll',
	},
];

export const organizationFields: INodeProperties[] = [
	// ── Get Many ────────────────────────────────────────────────────────────────
	getODataOptions('organization', ['getAll']),

	// ── Create ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['organization'], operation: ['create'] } },
		description: 'Name of the organization',
		routing: { send: { type: 'body', property: 'Name' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['organization'], operation: ['create'] } },
		options: [
			{
				displayName: 'Founding Date',
				name: 'foundingDate',
				type: 'dateTime',
				default: '',
				description: 'Date the organization was founded (ISO 8601)',
				routing: { send: { type: 'body', property: 'FoundingDate' } },
			},
			{
				displayName: 'Number of Employees',
				name: 'numberOfEmployees',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'NumberOfEmployees' } },
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'PhoneNumber' } },
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'Website' } },
			},
		],
	},

	// ── Update ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['organization'], operation: ['update'] } },
		description: 'ID (UUID) of the organization to update',
		routing: { send: { type: 'body', property: 'ID' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['organization'], operation: ['update'] } },
		options: [
			{
				displayName: 'Founding Date',
				name: 'foundingDate',
				type: 'dateTime',
				default: '',
				routing: { send: { type: 'body', property: 'FoundingDate' } },
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'Name' } },
			},
			{
				displayName: 'Number of Employees',
				name: 'numberOfEmployees',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'NumberOfEmployees' } },
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'PhoneNumber' } },
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'Website' } },
			},
		],
	},

	// ── Delete ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['organization'], operation: ['delete'] } },
		description: 'ID (UUID) of the organization to delete',
	},
];
