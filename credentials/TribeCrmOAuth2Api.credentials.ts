import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class TribeCrmOAuth2Api implements ICredentialType {
	name = 'tribeCrmOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'Tribe CRM OAuth2 API';

	documentationUrl = 'https://api.tribecrm.nl/swagger';

	icon = {
		light: 'file:../icons/tribecrm.svg',
		dark: 'file:../icons/tribecrm.svg',
	} as const;

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'string',
			default: 'https://auth.tribecrm.nl/oauth2/token',
			required: true,
			description:
				'OAuth2 token endpoint. Use https://auth.tribecrm.nl/oauth2/token for production or https://auth-staging.tribecrm.nl/oauth2/token for staging.',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: 'read write offline',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
		{
			displayName: 'API Base URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://api.tribecrm.nl',
			required: true,
			description:
				'Base URL of your Tribe CRM API instance. Use https://api.tribecrm.nl for production or https://api-staging.tribecrm.nl for staging.',
		},
	];
}
