import type { INodeProperties } from 'n8n-workflow';
import { getODataOptions } from './common';

export const employeeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['employee'] } },
		options: [
			{
				name: 'Get Current',
				value: 'getCurrent',
				action: 'Get the current employee',
				description: 'Retrieve the employee that corresponds to the authenticated service account',
				routing: {
					request: {
						method: 'GET',
						url: '/GetCurrentEmployee()',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many employees',
				description: 'Retrieve a list of all employees',
				routing: {
					request: { method: 'GET', url: '/Relationship_Person_Contact_Employee' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'value' } }],
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const employeeFields: INodeProperties[] = [
	// ── Get Many ────────────────────────────────────────────────────────────────
	getODataOptions('employee', ['getAll']),

	// ── Get Current: optional expand ────────────────────────────────────────────
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['employee'], operation: ['getCurrent'] } },
		options: [
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'string',
				default: 'Person',
				description: 'OData $expand (e.g. <code>Person</code>)',
				routing: { send: { type: 'query', property: '$expand' } },
			},
		],
	},
];
