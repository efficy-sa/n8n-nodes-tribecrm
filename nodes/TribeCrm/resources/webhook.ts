import type { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['webhook'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a webhook',
				description: 'Register a new webhook for a Tribe CRM entity type',
				routing: {
					request: {
						method: 'POST',
						url: "={{$credentials.apiUrl}}/v1/webhooks",
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a webhook',
				description: 'Delete a registered webhook by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: "={{$credentials.apiUrl}}/v1/webhooks/{{$parameter['webhookId']}}",
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many webhooks',
				description: 'Retrieve all registered webhooks',
				routing: {
					request: {
						method: 'GET',
						url: "={{$credentials.apiUrl}}/v1/webhooks",
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const webhookFields: INodeProperties[] = [
	// ── Create ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Entity Type',
		name: 'entityType',
		type: 'options',
		required: true,
		default: 'Relation.Person',
		displayOptions: { show: { resource: ['webhook'], operation: ['create'] } },
		description: 'The Tribe CRM entity type that will trigger the webhook',
		options: [
			{ name: 'Organization', value: 'Relation.Organization' },
			{ name: 'Person', value: 'Relation.Person' },
		],
		routing: { send: { type: 'body', property: 'entityType' } },
	},
	{
		displayName: 'Webhook URL',
		name: 'webhookUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['webhook'], operation: ['create'] } },
		description: 'The HTTPS URL that Tribe CRM will call when the entity event occurs',
		routing: { send: { type: 'body', property: 'webhookUrl' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['webhook'], operation: ['create'] } },
		options: [
			{
				displayName: 'Custom Headers',
				name: 'headers',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				default: {},
				description: 'Additional headers to send with each webhook call',
				options: [
					{
						displayName: 'Header',
						name: 'header',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'headers',
						value: '={{ $value.header }}',
					},
				},
			},
		],
	},

	// ── Delete ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['webhook'], operation: ['delete'] } },
		description: 'ID (UUID) of the webhook to delete',
	},
];
