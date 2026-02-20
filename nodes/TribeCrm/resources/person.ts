import type { INodeProperties } from 'n8n-workflow';
import { getODataOptions } from './common';

export const personOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['person'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a person',
				description: 'Create a new person in Tribe CRM',
				routing: { request: { method: 'POST', url: '/Relation_Person' } },
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a person',
				description: 'Delete a person by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: "=/Relation_Person({{$parameter['personId']}})",
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many persons',
				description: 'Retrieve a list of persons',
				routing: {
					request: { method: 'GET', url: '/Relation_Person' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'value' } }],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a person',
				description: 'Update an existing person by ID',
				routing: { request: { method: 'POST', url: '/Relation_Person' } },
			},
		],
		default: 'getAll',
	},
];

export const personFields: INodeProperties[] = [
	// ── Get Many ────────────────────────────────────────────────────────────────
	getODataOptions('person', ['getAll']),

	// ── Create ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['person'], operation: ['create'] } },
		description: 'Last name of the person',
		routing: { send: { type: 'body', property: 'LastName' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['person'], operation: ['create'] } },
		options: [
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				default: '',
				description: 'Primary email address',
				routing: { send: { type: 'body', property: 'EmailAddress' } },
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'FirstName' } },
			},
			{
				displayName: 'Middle Name',
				name: 'middleName',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'MiddleName' } },
			},
			{
				displayName: 'Mobile Phone Number',
				name: 'mobilePhoneNumber',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'MobilePhoneNumber' } },
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'PhoneNumber' } },
			},
		],
	},

	// ── Update ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['person'], operation: ['update'] } },
		description: 'ID (UUID) of the person to update',
		routing: { send: { type: 'body', property: 'ID' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['person'], operation: ['update'] } },
		options: [
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'EmailAddress' } },
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'FirstName' } },
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'LastName' } },
			},
			{
				displayName: 'Middle Name',
				name: 'middleName',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'MiddleName' } },
			},
			{
				displayName: 'Mobile Phone Number',
				name: 'mobilePhoneNumber',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'MobilePhoneNumber' } },
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'PhoneNumber' } },
			},
		],
	},

	// ── Delete ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['person'], operation: ['delete'] } },
		description: 'ID (UUID) of the person to delete',
	},
];
