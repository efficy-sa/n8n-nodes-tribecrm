import type { INodeProperties } from 'n8n-workflow';

export const taskOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['task'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a task',
				description: 'Create a new task in Tribe CRM',
				routing: { request: { method: 'POST', url: '/Activity_Task' } },
			},
		],
		default: 'create',
	},
];

export const taskFields: INodeProperties[] = [
	// ── Create ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['task'], operation: ['create'] } },
		description: 'Subject / title of the task',
		routing: { send: { type: 'body', property: 'Subject' } },
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['task'], operation: ['create'] } },
		description: 'Start date and time of the task (ISO 8601)',
		routing: { send: { type: 'body', property: 'StartDate' } },
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['task'], operation: ['create'] } },
		description: 'End date and time of the task (ISO 8601)',
		routing: { send: { type: 'body', property: 'EndDate' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['task'], operation: ['create'] } },
		options: [
			{
				displayName: 'Assignee ID',
				name: 'assigneeId',
				type: 'string',
				default: '',
				description: 'ID (UUID) of the employee to assign the task to',
				routing: {
					send: {
						type: 'body',
						property: 'Assignee',
						value: '={{ { "ID": $value } }}',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				routing: { send: { type: 'body', property: 'Description' } },
			},
			{
				displayName: 'Relationship ID',
				name: 'relationshipId',
				type: 'string',
				default: '',
				description: 'ID (UUID) of the relationship (customer, lead, etc.) to link the task to',
				routing: {
					send: {
						type: 'body',
						property: 'Relationship',
						value: '={{ { "ID": $value } }}',
					},
				},
			},
		],
	},
];
