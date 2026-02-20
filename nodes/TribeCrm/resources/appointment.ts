import type { INodeProperties } from 'n8n-workflow';
import { getODataOptions } from './common';

export const appointmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['appointment'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create an appointment',
				description: 'Create a new appointment in Tribe CRM',
				routing: { request: { method: 'POST', url: '/Activity_Appointment' } },
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many appointments',
				description: 'Retrieve a list of appointments',
				routing: {
					request: { method: 'GET', url: '/Activity_Appointment' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'value' } }],
					},
				},
			},
		],
		default: 'getAll',
	},
];

export const appointmentFields: INodeProperties[] = [
	// ── Get Many ────────────────────────────────────────────────────────────────
	getODataOptions('appointment', ['getAll']),

	// ── Create ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['appointment'], operation: ['create'] } },
		description: 'Start date and time of the appointment (ISO 8601)',
		routing: { send: { type: 'body', property: 'StartDate' } },
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['appointment'], operation: ['create'] } },
		description: 'End date and time of the appointment (ISO 8601)',
		routing: { send: { type: 'body', property: 'EndDate' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['appointment'], operation: ['create'] } },
		options: [
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				description: 'ID (UUID) of the contact person attending the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'Contact',
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
				displayName: 'Owner ID',
				name: 'ownerId',
				type: 'string',
				default: '',
				description: 'ID (UUID) of the employee responsible for the appointment',
				routing: {
					send: {
						type: 'body',
						property: 'Owner',
						value: '={{ { "ID": $value } }}',
					},
				},
			},
			{
				displayName: 'Phase Reference ID',
				name: 'phaseReferenceId',
				type: 'string',
				default: '',
				description: 'ID (UUID) of the phase reference for this appointment',
				routing: {
					send: {
						type: 'body',
						property: 'PhaseReference',
						value: '={{ { "ID": $value } }}',
					},
				},
			},
			{
				displayName: 'Relationship ID',
				name: 'relationshipId',
				type: 'string',
				default: '',
				description: 'ID (UUID) of the relationship (customer, lead, etc.) to link the appointment to',
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
