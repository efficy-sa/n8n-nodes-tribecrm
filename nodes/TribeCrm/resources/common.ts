import type { INodeProperties } from 'n8n-workflow';

/**
 * Returns a standard OData "Options" collection (filter, select, expand, orderby, top, skip)
 * to be added to getAll operations.
 */
export function getODataOptions(resource: string, operations: string[]): INodeProperties {
	return {
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: [resource], operation: operations } },
		options: [
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'string',
				default: '',
				description:
					'OData $expand to include related entities (e.g. <code>Person($select=FirstName,LastName)</code>)',
				routing: { send: { type: 'query', property: '$expand' } },
			},
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				default: '',
				description:
					"OData $filter expression (e.g. <code>FirstName eq 'John'</code> or <code>CreationDate gt 2024-01-01T00:00:00</code>)",
				routing: { send: { type: 'query', property: '$filter' } },
			},
			{
				displayName: 'Limit',
				name: 'top',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 50,
				description: 'Max number of results to return',
				routing: { send: { type: 'query', property: '$top' } },
			},
			{
				displayName: 'Order By',
				name: 'orderby',
				type: 'string',
				default: '',
				description: 'OData $orderby expression (e.g. <code>LastName asc</code>)',
				routing: { send: { type: 'query', property: '$orderby' } },
			},
			{
				displayName: 'Select Fields',
				name: 'select',
				type: 'string',
				default: '',
				description:
					'Comma-separated list of fields to return (e.g. <code>FirstName,LastName,EmailAddress</code>)',
				routing: { send: { type: 'query', property: '$select' } },
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'number',
				default: 0,
				description: 'Number of results to skip (for pagination)',
				routing: { send: { type: 'query', property: '$skip' } },
			},
		],
	};
}
