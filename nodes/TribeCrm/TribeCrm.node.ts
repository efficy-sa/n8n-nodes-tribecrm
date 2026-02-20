import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

import { appointmentFields, appointmentOperations } from './resources/appointment';
import { contactFields, contactOperations } from './resources/contact';
import { customerFields, customerOperations } from './resources/customer';
import { employeeFields, employeeOperations } from './resources/employee';
import { invoiceFields, invoiceOperations } from './resources/invoice';
import { leadFields, leadOperations } from './resources/lead';
import { organizationFields, organizationOperations } from './resources/organization';
import { personFields, personOperations } from './resources/person';
import { productFields, productOperations } from './resources/product';
import { salesOpportunityFields, salesOpportunityOperations } from './resources/salesOpportunity';
import { taskFields, taskOperations } from './resources/task';
import { webhookFields, webhookOperations } from './resources/webhook';

export class TribeCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tribe CRM',
		name: 'tribeCrm',
		icon: { light: 'file:../../icons/tribecrm.svg', dark: 'file:../../icons/tribecrm.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage persons, organizations, contacts, leads, sales opportunities, tasks, appointments, invoices, and webhooks in Tribe CRM',
		defaults: { name: 'Tribe CRM' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'tribeCrmOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.apiUrl}}/v1/odata',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// ── Resource selector ────────────────────────────────────────────────────
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Appointment', value: 'appointment' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Employee', value: 'employee' },
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Lead', value: 'lead' },
					{ name: 'Organization', value: 'organization' },
					{ name: 'Person', value: 'person' },
					{ name: 'Product', value: 'product' },
					{ name: 'Sales Opportunity', value: 'salesOpportunity' },
					{ name: 'Task', value: 'task' },
					{ name: 'Webhook', value: 'webhook' },
				],
				default: 'person',
			},

			// ── Operations & fields (alphabetical by resource) ───────────────────────
			...appointmentOperations,
			...appointmentFields,

			...contactOperations,
			...contactFields,

			...customerOperations,
			...customerFields,

			...employeeOperations,
			...employeeFields,

			...invoiceOperations,
			...invoiceFields,

			...leadOperations,
			...leadFields,

			...organizationOperations,
			...organizationFields,

			...personOperations,
			...personFields,

			...productOperations,
			...productFields,

			...salesOpportunityOperations,
			...salesOpportunityFields,

			...taskOperations,
			...taskFields,

			...webhookOperations,
			...webhookFields,
		],
	};
}
