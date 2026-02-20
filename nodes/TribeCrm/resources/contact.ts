import type { INodeProperties } from 'n8n-workflow';
import { getODataOptions } from './common';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['contact'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a contact',
				description: 'Create a contact person relationship between a person and an organization',
				routing: {
					request: { method: 'POST', url: '/Relationship_Person_Contact_Standard' },
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many contacts',
				description: 'Retrieve a list of contact person relationships',
				routing: {
					request: { method: 'GET', url: '/Relationship_Person_Contact_Standard' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'value' } }],
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const contactFields: INodeProperties[] = [
	// ── Get Many ────────────────────────────────────────────────────────────────
	getODataOptions('contact', ['getAll']),

	// ── Create ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['contact'], operation: ['create'] } },
		description: 'ID (UUID) of the person to link as a contact',
		routing: {
			send: {
				type: 'body',
				property: 'Person',
				value: '={{ { "ID": $value } }}',
			},
		},
	},
	{
		displayName: 'Relation (Organization) ID',
		name: 'relationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['contact'], operation: ['create'] } },
		description: 'ID (UUID) of the organization (Relation) this contact belongs to',
		routing: {
			send: {
				type: 'body',
				property: 'Relation',
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
		displayOptions: { show: { resource: ['contact'], operation: ['create'] } },
		options: [
			{
				displayName: 'Department',
				name: 'department',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'Department' } },
			},
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'EmailAddress' } },
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
];
